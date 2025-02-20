if (app.documents.length > 0) {
    var doc = app.activeDocument;

    // Step 1: Get the selected export folder
    var exportFolder = Folder.selectDialog("Select a folder to save the exported files");
    if (!exportFolder) {
        alert("Export folder not selected. Script stopped.");
        exit();
    }

    // Step 2: Create a custom dialog for export settings
    var dialog = new Window("dialog", "Export Settings");
    dialog.orientation = "column";

    // Add a dropdown for PDF export presets
    var presetGroup = dialog.add("group");
    presetGroup.add("statictext", undefined, "PDF Preset:");
    var presetDropdown = presetGroup.add("dropdownlist", undefined, getPDFPresetNames());
    presetDropdown.selection = 0; // Select the first preset by default

    // Add buttons for OK and Cancel
    var buttonGroup = dialog.add("group");
    buttonGroup.add("button", undefined, "OK");
    buttonGroup.add("button", undefined, "Cancel");

    // Show the dialog and wait for user input
    var result = dialog.show();
    if (result !== 1) {
        alert("Export canceled. Script stopped.");
        exit();
    }

    // Get the selected preset
    var selectedPresetName = presetDropdown.selection.text;
    var selectedPreset = app.pdfExportPresets.itemByName(selectedPresetName);
    if (!selectedPreset.isValid) {
        alert("Invalid preset selected. Script stopped.");
        exit();
    }

    // Step 3: Get alternate layout names and their starting page offsets
    var sections = doc.sections.everyItem().getElements();
    var alternateLayouts = {};

    for (var n = 0; n < sections.length; n++) {
        var layoutName = sections[n].alternateLayout;
        if (layoutName && layoutName !== "") {
            alternateLayouts[sections[n].pageStart.documentOffset] = layoutName.replace(/\s+/g, "_");
        }
    }

    // Step 4: Loop through each page in the document and export
    for (var i = 0; i < doc.pages.length; i++) {
        var page = doc.pages[i];

        // Determine the alternate layout name for the current page
        var layoutName = "default";
        var pageOffset = page.documentOffset;
        for (var offset in alternateLayouts) {
            if (pageOffset >= offset) {
                layoutName = alternateLayouts[offset];
            }
        }

        // Get the page name or label as reflected in the Pages window
        var pageName = page.name || page.appliedSection.prefix + page.appliedSection.startPageNumber;

        // Construct the export file name using the alternate layout name and page name
        var exportFileName = layoutName + "_" + pageName + ".pdf";
        var pdfFile = File(exportFolder + "/" + exportFileName);

        // Temporarily duplicate the page for single-page export
        var tempDoc = app.documents.add();
        if (page.appliedMaster) {
            var masterName = page.appliedMaster.name;
            var masterSpread = doc.masterSpreads.itemByName(masterName);
            if (masterSpread.isValid) {
                masterSpread.duplicate(LocationOptions.AT_END, tempDoc);
                tempDoc.pages[0].appliedMaster = tempDoc.masterSpreads[0];
            }
        }

        // Duplicate the page into the temporary document
        page.duplicate(LocationOptions.AT_END, tempDoc.pages[0]);
        tempDoc.pages[0].remove();

        // Set the view magnification to 100%
        tempDoc.layoutWindows[0].zoomPercentage = 100;

        // Export the temporary document using the selected preset
        tempDoc.exportFile(ExportFormat.PDF_TYPE, pdfFile, false, selectedPreset);
        tempDoc.close(SaveOptions.NO);
    }

    // Step 5: Notify the user that the export process is complete
    alert("Export completed successfully! All files have been saved to:\n" + exportFolder.fsName);
} else {
    alert("No document is open.");
}

// Helper function to get PDF preset names
function getPDFPresetNames() {
    var presets = app.pdfExportPresets;
    var presetNames = [];
    for (var i = 0; i < presets.length; i++) {
        presetNames.push(presets[i].name);
    }
    return presetNames;
}