const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { formatWithOptions } = require("util");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let team = [];
var id = 0;
var currentPosition;
var addAnother = {
  type: "list",
  message: "Would you like to add another team member?",
  choices: ["Yes", "No"],
  name: "again",
};

// initial prompts
const entryPrompts = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter team member's name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Enter team member's email: ",
        name: "email",
      },
      {
        type: "list",
        message: "Enter team member position type: ",
        choices: ["Manager", "Engineer", "Intern"],
        name: "position",
      },
    ])
    .then((answers) => {
      id++;
      currentPosition = answers.position;
      team.push({
        id: id,
        name: answers.name,
        position: answers.position,
        attr: "",
      });
      positionPrompts();
    });
};

// prompts based on position
const positionPrompts = () => {
  switch (currentPosition) {
    case "Manager":
      inquirer
        .prompt([
          {
            name: "number",
            type: "input",
            message: "Office #: ",
          },
          addAnother,
        ])
        .then((answers) => {
          teamAttr(answers.number);
          promptAnother(answers);
        });
      break;

    case "Engineer":
      inquirer
        .prompt([
          {
            name: "github",
            type: "input",
            message: "Github username: ",
          },
          addAnother,
        ])
        .then((answers) => {
          teamAttr(answers.github);
          promptAnother(answers);
        });
      break;
    case "Intern":
      inquirer
        .prompt([
          {
            name: "school",
            type: "input",
            message: "School: ",
          },
          addAnother,
        ])
        .then((answers) => {
          teamAttr(answers.school);
          promptAnother(answers);
        });
      break;
    default:
      positionPrompts();
  }
};

// add team member attribute to team object
const teamAttr = (attr) => {
  team.forEach((tm) => {
    if (tm.id === id) {
      tm.attr = attr;
    }
  });
};

// prompt for another team member
const promptAnother = (answers) => {
  //   console.log(team);
  if (answers.again === "Yes") {
    entryPrompts();
  } else {
    // console.log(team);
    let employeeObjs = [];
    team.forEach((tm, index) => {
      switch (tm.position) {
        case "Manager":
          let newMan = new Manager(tm.name, tm.id, tm.position, tm.attr);
          employeeObjs.push(newMan);
          break;
        case "Engineer":
          console.log(tm);
          let newEng = new Engineer(tm.name, tm.id, tm.position, tm.attr);
          employeeObjs.push(newEng);
          break;
        case "Intern":
          let newInt = new Intern(tm.name, tm.id, tm.position, tm.attr);
          employeeObjs.push(newInt);
          break;
        default:
          null;
      }
    });
    const html = render(employeeObjs);
    renderHtml(html);
  }
};

const renderHtml = (html) => {
  //   console.log(OUTPUT_DIR);
  fs.access(OUTPUT_DIR, function (error) {
    if (error) {
      console.log("Directory does not exist.");
      console.log("Creating Directory...");
      fs.mkdir(OUTPUT_DIR, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`${OUTPUT_DIR} successfully created.`);
          writeHtml(html);
        }
      });
    } else {
      writeHtml(html);
    }
  });
};

const writeHtml = (html) => {
  fs.writeFile(outputPath, html, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("team.html successfully written");
    }
  });
};

// call entry point for application prompts
entryPrompts();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
