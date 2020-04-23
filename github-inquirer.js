/*
  Collect the information needed to create a readme by daisy-chaining
  prompts (and a few API calls).
 */

const
  inquirer = require("inquirer"),
  axios = require("axios");


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
  emailPrompt =  {
    message: "Email not found. Please provide or hit enter to leave blank.",
    name: "email"
  };


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
      repoInfo.avatar_url = data.avatar_url;
      chooseRepos(data.repos_url);
    })  
  });
}


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
      promptRepoQuestions();
    })
  })
}


function promptRepoQuestions() {
  if (!repoInfo.email) {
    repoQuestions.unshift(emailPrompt);
  }

  inquirer.prompt(repoQuestions).then(response => {
    for (let item in response) {
      repoInfo[item] = response[item];
    }

    console.log(repoInfo);
  });
}


module.exports = {
  getRepoInfo: getUserInfo
};
