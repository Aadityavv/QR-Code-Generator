/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr  from "qr-image"
import fs from 'fs';
// var qr = require('qr-image');

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'input',
        message:"Type in your URL",
        name: "URL",
    },
    {
        type:"input",
        name:"Website_Name",
        message:"Enter the website name"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url= answers.URL;
    const websiteName = answers.Website_Name; 
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(`${websiteName}.png`));  
    console.log(`QR code generated and saved to ${websiteName}.png`);
})

  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
