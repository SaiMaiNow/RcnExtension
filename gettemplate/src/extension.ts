// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let gettemplate_ui = vscode.commands.registerCommand('gettemplate.getui', () => {
		selectfolder('html', context);
    });

	let gettemplate_project = vscode.commands.registerCommand('gettemplate.getproject', () => {
		selectfolder('lua', context);
	});

	let gettemplate_all = vscode.commands.registerCommand('gettemplate.getall', () => {
		selectfolder('all', context);
	});

	context.subscriptions.push(
        gettemplate_ui,
        gettemplate_project,
        gettemplate_all
    );
}

function selectfolder(type: string, context: vscode.ExtensionContext) {
	// Prompt the user to select a folder where the template will be added
	vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, openLabel: "Select Folder" }).then(uri => {
		if (uri && uri[0]) {
			// Path to the selected folder
			const userFolderPath = uri[0].fsPath;

			// Path folder template Html
			const templateHtmlFolderPath = path.join(context.extensionPath, '..', 'gettemplate', 'src', 'template', type);

			// Copy template files to the selected folder
			copyFolderRecursiveSync(templateHtmlFolderPath, userFolderPath);
			vscode.window.showInformationMessage('Template folders copied successfully');
		}
	});
}

// Function to recursively copy a folder and its contents
function copyFolderRecursiveSync(source: string, target: string) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    const files = fs.readdirSync(source);
    files.forEach(file => {
        const curSource = path.join(source, file);
        const curTarget = path.join(target, file);
        if (fs.lstatSync(curSource).isDirectory()) {
            copyFolderRecursiveSync(curSource, curTarget);
        } else {
            fs.copyFileSync(curSource, curTarget);
        }
    });
}

// This method is called when your extension is deactivated
export function deactivate() {}
