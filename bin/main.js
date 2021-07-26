#!/usr/bin/env node
"use strict";

const path = require("path");
const fse = require('fs-extra');

const { Command } = require('commander');
const program = new Command();
const packageJson = require('../package.json');

program
    .requiredOption('-n, --name <name>', 'Input directory name')
    // .option('-a, --compress', 'compress')
    .version(packageJson.version, '-v, --vers', 'output the current version')
    .usage('conative-nodejs [options] [Path/Filename]')
    .showHelpAfterError()
    .parse();

    const dirName = program.opts().name;
    const templatePath = path.join(__dirname,'..','lib');

try{
    fse.copy(templatePath, `${dirName}`)
       .then(() =>  console.log('Thank you for downloading! Happy Programming :)'))
       .catch(err => console.error(err));
} catch(e) {
    console.error(":( Error >> ", e);
}