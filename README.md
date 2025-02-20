# Export PDFs as InDesign Alternate Layout Names
## Overview
When working with InDesign documents that use alternate layouts, exporting individual pages as separate PDFs can be a tedious and error-prone process. This script automates the task by exporting each page as a separate PDF, using the page number and alternate layout name to generate filenames. It also allows the user to select a PDF export preset and folder, ensuring a streamlined and customizable export process.

The script avoids preprocessing the document (e.g., downloading images) until the export process begins, making it faster and more user-friendly. It also provides a clean and intuitive custom dialog for selecting export settings.

## Features
- **Exports individual pages as separate PDFs**: Each page is exported as a single-page PDF.

- **Generates filenames based on page number and alternate layout name**: Filenames follow the format `LayoutName_PageNumber.pdf`. 

- **Preset export settings dialog**: Allows the user to select a PDF export preset from a dropdown list. 

- **No preprocessing until export begins**: Images are only downloaded when the temporary document is created for each page.

- **User-friendly workflow**: The user selects the export folder and settings upfront, then the script runs without interruptions.

## How to Use
1. Open the InDesign document you want to export.

2. Run the script in InDesign by navigating to `Window > Utilities > Scripts`. ***See:*** *[How to add script to InDesign](#how-to-add-script-to-indesign-scripts-panel)*

3. Select the folder where you want to save the exported PDFs.

4. Choose a PDF export preset from the custom dialog. ***See:*** *[How to use InDesign Export Presets](https://www.adobe.com/acrobat/hub/how-do-you-set-up-a-pdf-preset-in-indesign.html)*

5. The script will export each page as a separate PDF, using the selected settings and folder.

6. A final alert will notify you when the export process is complete.

### How to add Script to InDesign Scripts Panel

Save the `.jsx` file to your InDesign Scripts Panel folder:

  - **macOS**     `Users/[username]/Library/Preferences/Adobe InDesign/[version]/[language]/Scripts/Scripts Panel`

  - **Windows XP**    `C:\Program Files\Adobe\Adobe InDesign [Year]\Scripts\Community\Scripts Panel`

_**Note**: A quick way to locate the Scripts Panel folder is to right-click (Windows) or Control-click (macOS) a script in the Scripts panel and choose Reveal In Explorer (Windows) or Reveal In Finder (macOS)._

## Requirements
- Adobe InDesign (tested on version 19.5.2).
- A document with pages and alternate layouts.
- Custom export presets, if needed. ***See:*** *[How to create custom InDesign Export Presets](https://www.adobe.com/acrobat/hub/how-do-you-set-up-a-pdf-preset-in-indesign.html#steps-for-creating-your-own-indesign-pdf-presets)*

## Example Output
If the document has 5 pages, with page 1 in LayoutA,  pages 1-2 on LayoutB, and pages a-b on LayoutC, the exported files will be named:

`LayoutA_1.pdf`

`LayoutB_1.pdf`
`LayoutB_2.pdf`

`LayoutC_a.pdf`
`LayoutC_b.pdf`

## Future versions
Working on versions that allow:
- [x] Exporting each page with page numbers
- [ ] Exporting entire alternate layouts as one file
- [ ] More robust export settings 
- [ ] More advanced naming conventions
