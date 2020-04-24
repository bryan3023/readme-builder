/*
  Program entry point.
 */

"use strict;"

const githubInquirer = require("./github-inquirer.js");

function init() {
  githubInquirer.getRepoInfo();
}

init();
