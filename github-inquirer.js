const
  inquirer = require("inquirer"),
  axios = require("axios");

const userInfo = {};

const
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
  }

function getUserInfo() {
  inquirer.prompt([
    {
      message: "What is your GitHub username?",
      name: "username"
    }
  ]).then(({username}) => {
    const url = `https://api.github.com/users/${username}`
    userInfo.username = username;

    axios.get(url).then(({data}) => {
      userInfo.avatar_url = data.avatar_url;
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
      userInfo.repo = repo;
      promptRepoQuestions();
    })
  })
}

function promptRepoQuestions() {
  if (!userInfo.email) {
    repoQuestions.unshift(emailPrompt);
  }

  inquirer.prompt(repoQuestions).then(response => {
    console.log(response);
  });
}

module.exports = {
  getRepoInfo: getUserInfo
};