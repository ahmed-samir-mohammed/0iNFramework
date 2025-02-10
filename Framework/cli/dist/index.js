#!/usr/bin/env node
import chalk from 'chalk';
import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
const args = process.argv.slice(2);
if (args.length < 2 || args[0] !== 'create') {
    console.log(chalk.red('❌ Correct usage: zero create <project name>'));
    process.exit(1);
}
const projectName = args[1];
const projectPath = path.join(process.cwd(), projectName);
console.log(chalk.blue(`🚀 Creating project: ${projectName}...`));
const createProjectFolder = (projectPath) => {
    fs.mkdirSync(projectPath);
};
const createPackageJson = (projectPath, projectName) => {
    fs.writeJsonSync(path.join(projectPath, 'package.json'), {
        name: projectName,
        version: '1.0.0',
        scripts: {
            start: 'ts-node src/main.ts',
        },
        dependencies: {
            '0injs-framework': 'latest',
        },
    });
};
const createTsConfigJson = (projectPath) => {
    fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), JSON.stringify({
        compilerOptions: {
            target: 'ES6',
            module: 'ESNext',
            strict: true,
            outDir: './dist',
        },
    }, null, 2));
};
const createSrcFolderAndFiles = (projectPath) => {
    fs.mkdirSync(path.join(projectPath, 'src'));
    fs.writeFileSync(path.join(projectPath, 'src/main.ts'), `import { AppComponent } from "./app.component";\nconst app = new AppComponent();\napp.render();`);
    fs.writeFileSync(path.join(projectPath, 'src/app.component.ts'), `import { Component } from "0injs-framework";\n\nexport class AppComponent extends Component {\n  constructor() {\n    super("#app", "<h1>🎉 Welcome to 0iNJSFramework project!</h1>");\n  }\n}`);
};
const installPackages = (projectPath) => {
    console.log(chalk.yellow('📦 Installing packages...'));
    execSync(`cd ${projectPath} && npm install`, { stdio: 'inherit' });
};
try {
    createProjectFolder(projectPath);
    createPackageJson(projectPath, projectName);
    createTsConfigJson(projectPath);
    createSrcFolderAndFiles(projectPath);
    installPackages(projectPath);
    console.log(chalk.green('✅ Project created successfully!'));
    console.log(chalk.cyan(`👉 Navigate to the folder: cd ${projectName}`));
    console.log(chalk.cyan(`🚀 Then start the project with: npm start`));
}
catch (error) {
    console.error(chalk.red('❌ An error occurred while creating the project:'), error);
}
