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
    // console.log(answers);

    const queryURL = `https://api.github.com/users/${answers.username}`;
    axios.get(queryURL).then(function(response) {
      const info = response.data;
      // console.log(response);
      // console.log(info.public_repos);
      data.repoNum = info.public_repos;
      data.profileIMG = info.avatar_url;
      data.name = info.name;
      data.company = info.company;
      data.color = answers.color;
      data.followersNum = info.followers;
      data.followingNum = info.following;
      data.location = info.location;
      data.blog = info.blog;
      data.profileURL = info.html_url;
      data.location = info.location;
      data.bio = info.bio;
      // console.log(genHTML());
      // console.log(data);
      const queryURLtwo = `https://api.github.com/users/${answers.username}/starred`;
      axios.get(queryURLtwo).then(function(responsetwo) {
        data.stargazersCount = responsetwo.data.length;
        let htmlString = genHTML(data);
        console.log(htmlString);
        fs.writeFile("index.html", htmlString, "utf8", function(err) {
          if (err) console.log(err);
        });
        // console.log(responsetwo);
        // console.log(info2);
      });
    });
  });
}

function init() {
  promptUser();
}
init();
