/*
  Collect the information needed to create a readme by daisy-chaining
  prompts (and a few API calls).
 */

"use strict;"

const
  inquirer = require("inquirer"),
  axios = require("axios")
  readmeWriter = require("./readme-writer.js");


const
  repoInfo = {},
  repoQuestions = [
    {
      message: "Please provide a brief description of this project.",
      name: "description"
    },
    {
      type: "list",
      message: "What type of license does this project have?",
      name: "license",
      choices: [
        "MIT",
        "GPLv2",
        "GPLv3",
        "BSD",
        "ISC",
        "(to be determined)"
      ]
    },
    {
      message: "What is the command to install dependencies?",
      name: "install"
    },
    {
      message: "What is the command to run tests on the project?",
      name: "test"
    },
    {
      message: "What should the user know to use this project?",
      name: "usage"
    },
    {
      message: "How can people contribute to this project?",
      name: "contributions"
    }
  ],
  emailPrompt = {
    message: "Email not found. Please provide or hit enter to leave blank.",
    name: "email"
  };


/*
  First link in the chain. Get the user's GitHub info.
 */
function getUserInfo() {
  inquirer.prompt([
    {
      message: "What is your GitHub username?",
      name: "username"
    }
  ]).then(({username}) => {
    const url = `https://api.github.com/users/${username}`

    axios.get(url).then(({data}) => {
      repoInfo.ownerName = username;
      repoInfo.profileUrl = data.html_url;
      repoInfo.avatarUrl = data.avatar_url;
      chooseRepos(data.repos_url);
    })  
  });
}


/*
  Second link in the chain. Ask which of their repos the user wants a
  README for.
 */
function chooseRepos(repos_url) {
  axios.get(repos_url).then(({data}) => {
    const choices = data.map(item => item.name)

    inquirer.prompt([
      {
        type: "list",
        message: "Which repo would you like to create a readme for?",
        name: "repo",
        choices: choices
      }
    ]).then(({repo}) => {
      repoInfo.name = repo;
      repoInfo.repoUrl = data.filter(item => item.name === repo)[0].html_url;
      promptRepoQuestions();
    })
  })
}


/*
  Third link in the chain. Ask the user a sequence of questions for the
  README. Also ask for email if it wasn't publicly available.

  When done, pass the results to the ReadmeWriter.
 */
function promptRepoQuestions() {
  if (!repoInfo.email) {
    repoQuestions.unshift(emailPrompt);
  }

  inquirer.prompt(repoQuestions).then(response => {
    for (let item in response) {
      repoInfo[item] = response[item];
    }
    readmeWriter.write(repoInfo);
  });
}


module.exports = {
  getRepoInfo: getUserInfo
};
