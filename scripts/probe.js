const retire = require('retire');
const fs = require('fs');
const path = require('path');


const folderPath = '../'; // Specify the folder path you want to check
const result = retire.scanUri(folderPath);

// Convert the vulnerabilities object to JSON
const json = JSON.stringify(result, null, 2);

// Save the JSON to a file
fs.writeFileSync('retire-report.json', json);

console.log('Retire.js report saved to retire-report.json');
