#!/usr/bin/env node
"use strict";

const { Command } = require('commander');
const program = new Command();
const path = require("path");
const fs = require('fs');
const ejs = require('ejs');
const VERSION = require('../package.json').version;

// Commander setting area
program
    .usage('conative-nodejs [options] -n [Path/Dirname]')
    .requiredOption('-n, --name <name>', 'Input path/directory name')
    .option('-s, --strict', 'use strict mode')
    .version(VERSION, '-v, -ver', 'output the current version')
    .showHelpAfterError()
    .parse();

// Get dir name
const dirName = program.opts().name;
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

            // Next, Rendering EJS
            // Config area.
            await ejsRender("package", "/package.json", {projectName: "default"});
            await ejsRender("env", "/.env");
            await ejsRender("gitIgnore", "/.gitignore");
            await ejsRender("dbConnect", "/src/config/dbConnection.js");
            
            
            // Base area.
            await ejsRender("app", "/src/app.js");
            await ejsRender("www", "/src/bin/www");
            

            // Router area.
            await ejsRender("router", "/src/routers/index.js");
            await ejsRender("routerTest", "/src/routers/test.js");


            // Controller & Service & Model area.
            await ejsRender("controller", "/src/controllers/indexController.js");
            await ejsRender("service", "/src/services/indexService.js");
            await ejsRender("model", "/src/models/testDAO.js");


            // View area.
            await ejsRender("view", "/src/views/index.ejs", {testStr: "%= test %"});
            await ejsRender("viewError", "/src/views/error.ejs", {
                errorArr: [
                    "%= message %",
                    "%= error.status %",
                    "%= error.stack %"
                ]
            });
        })()
        .then(() => {
            console.log("Project start : \x1b[31mnpm run start\x1b[0m");
            console.log("Check your browser! - \x1b[31mlocalhost:8080\x1b[0m\n\n");
            console.log("And, if you want connect DB or change Port,");
            console.log("You check \x1b[31mproject/.env\x1b[0m file.\n\n");
            console.log("And... Thank you for downloading! Happy Programming :)");
        });
    }
} catch(error) {
    console.error("Sorry. An error occurred >> ", error);
}

/**
 * @param {String} name now file exists ../templates/[filename]
 * @param {String} filePath project file will saved [dir/filename]
 */
async function ejsRender(name, filePath, renderOption = {}) {
    
    // default setting
    renderOption.view = true;
    renderOption.strict = program.opts().strict;


    const target = path.join(__dirname,'..','lib',`${name}.ejs`);

    await ejs.renderFile(target, renderOption, "locals", function(err, str) {
        if(err != undefined) {
            throw err;
        }
        fs.writeFileSync(`${dirName}${filePath}`, str, 'utf8');
    });
}

/**
 * @param {String} dirName Root of the file to be created
 * Making Directory
 */
async function createDir(dirName) {
    fs.mkdirSync(`${dirName}`);
    fs.mkdirSync(`${dirName}/src`);
    fs.mkdirSync(`${dirName}/src/bin`);
    fs.mkdirSync(`${dirName}/src/config`);
    fs.mkdirSync(`${dirName}/src/controllers`);
    fs.mkdirSync(`${dirName}/src/services`);
    fs.mkdirSync(`${dirName}/src/models`);
    fs.mkdirSync(`${dirName}/src/routers`);
    fs.mkdirSync(`${dirName}/src/views`);
}