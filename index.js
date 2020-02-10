const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const genHTML = require("./generateHTML");

const questions = [
  {
    type: "input",
    message: "Enter your GitHub username:",
    name: "username"
  },
  {
    type: "list",
    message: "What is your preferred color?",
    name: "color",
    choices: ["green", "blue", "pink", "red"]
  }
];

const data = {};

function promptUser() {
  inquirer.prompt(questions).then(function(answers) {
    console.log(answers);

    const queryURL = `https://api.github.com/users/${answers.username}`;
    axios.get(queryURL).then(function(response) {
      const info = response.data;
      console.log(response);
      console.log(info.public_repos);
      data.public_repos = info.public_repos;
      data.color = answers.color;
      data.followers = info.followers;
      data.following = info.following;
      data.location = info.location;
      data.blog = info.blog;
      data.html = info.html_url;
      data.bio = info.bio;
      console.log(genHTML());
      console.log(data);
      const queryURLtwo = `https://api.github.com/users/${answers.username}/repos`;
      axios.get(queryURLtwo).then(function(responsetwo) {
        // console.log(responsetwo);
      });
    });
  });
}

function writeToFile(fileName, data) {}

function init() {
  promptUser();
}
init();
