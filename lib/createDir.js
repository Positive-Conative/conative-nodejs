"use strict";
const fs = require('fs');

/**
 *  @param {String} dirName Input Directory Path/name
 *  Ex) [project_name] or [/etc/your/path/project_name]
 */

module.exports = async (dirName) => {
    try{
        fs.mkdirSync(`${dirName}`);
        fs.mkdirSync(`${dirName}/src`);
        fs.mkdirSync(`${dirName}/src/bin`);
        fs.mkdirSync(`${dirName}/src/controllers`);
        fs.mkdirSync(`${dirName}/src/models`);
        fs.mkdirSync(`${dirName}/src/routers`);
        fs.mkdirSync(`${dirName}/src/views`);
    } catch(e) {
        new Error(e);
    }
}
