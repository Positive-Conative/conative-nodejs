#!/usr/bin/env node
"use strict";

const path = require("path");
// const fse = require('fs-extra');

const VERSION = require('../package.json').version;

const { Command } = require('commander');
const program = new Command();
const fs = require('fs');
const ejs = require('ejs');

/**
 *  Commander setting area
 */
program
    .requiredOption('-n, --name <name>', 'Input directory name')
    // .option('-a, --compress', 'compress')
    .version(VERSION, '-v, -ver', 'output the current version')
    .usage('conative-nodejs [options] [Path/Filename]')
    .showHelpAfterError()
    .parse();


// Get dir name
const dirName = program.opts().name;
const createDir = require('../lib/createDir');

try{
    /**
     *  If file exists, throw error.
     *  todo : overwrite Y/N
     */
    if(fs.existsSync(dirName)) {
        throw ("File already exists!!");
    }else{
        (async () => {
            // First, Create Directory
            await createDir(dirName);

            const renderOption = { 
                view: true,
            };

            renderOption.projectName = "default";
            // Next, Rendering EJS
            await ejsRender("package", "/package.json", renderOption);
            await ejsRender("env", "/.env");
            await ejsRender("app", "/src/app.js");
            await ejsRender("www", "/src/bin/www");
            await ejsRender("router", "/src/routers/index.js");

            renderOption.testStr = "%= test %";
            await ejsRender("view", "/src/views/index.ejs", renderOption);
            
            renderOption.errorArr = [];
            renderOption.errorArr.push("%= message %");
            renderOption.errorArr.push("%= error.status %");
            renderOption.errorArr.push("%= error.stack %");
            await ejsRender("viewError", "/src/views/error.ejs", renderOption);
        })()
        .then(() => {
            console.log("if you installed pm2, \x1b[31mnpm start\x1b[0m");
            console.log("else you not installed pm2, \x1b[31mnpm run test\x1b[0m\n\n");
            console.log("And, if you want connect DB or change Port,");
            console.log("You check \x1b[31mproject/.env\x1b[0m file.\n\n");
            console.log("And... Thank you for downloading! Happy Programming :)");
        });
    }
} catch(error) {
    console.error("Sorry. An error occurred >> ", error);
}

/**
 * 
 * @param {String} name now file exists ../templates/[filename]
 * @param {String} filePath project file will saved [dir/filename]
 */
async function ejsRender(name, filePath, renderOption = { view: true }) {
    const target = path.join(__dirname,'..','templates',`${name}.ejs`);

    await ejs.renderFile(target, renderOption, "locals", function(err, str) {
        if(err != undefined) {
            throw err;
        }
        fs.writeFileSync(`${dirName}${filePath}`, str, 'utf8');
    });
}