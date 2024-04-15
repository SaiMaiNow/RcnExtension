"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let gettemplate_ui = vscode.commands.registerCommand('gettemplate.getui', () => {
        selectfolder('html', context);
    });
    let gettemplate_project = vscode.commands.registerCommand('gettemplate.getproject', () => {
        selectfolder('lua', context);
    });
    let gettemplate_all = vscode.commands.registerCommand('gettemplate.getall', () => {
        selectfolder('all', context);
    });
    context.subscriptions.push(gettemplate_ui, gettemplate_project, gettemplate_all);
}
exports.activate = activate;
function selectfolder(type, context) {
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
function copyFolderRecursiveSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }
    const files = fs.readdirSync(source);
    files.forEach(file => {
        const curSource = path.join(source, file);
        const curTarget = path.join(target, file);
        if (fs.lstatSync(curSource).isDirectory()) {
            copyFolderRecursiveSync(curSource, curTarget);
        }
        else {
            fs.copyFileSync(curSource, curTarget);
        }
    });
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map