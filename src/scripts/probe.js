const retire = require('retire');
const fs = require('fs');

const result = retire.scanTree('../../');
const vulnerabilities = retire.analyzeDependencies(result);

// Convert the vulnerabilities object to JSON
const json = JSON.stringify(vulnerabilities, null, 2);

// Save the JSON to a file
fs.writeFileSync('probe/retire-report.json', json);

console.log('Retire.js report saved to retire-report.json');
