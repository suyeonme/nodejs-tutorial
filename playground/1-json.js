const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);

user.name = 'Suyeon';
user.age = 25;

const userData = JSON.stringify(user);
fs.writeFileSync('1-json.json', userData);
