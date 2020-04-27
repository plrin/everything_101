// http://www.mocky.io/v2/5e974cf03000007900b6ddaf

const https = require('https');
const fs = require('fs');

https.get('https://jsonplaceholder.typicode.com/posts/1', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  console.log('**************');

  res.on('data', (d) => {
    // process.stdout.write(d);

    writeDataToFile(d);
  });

}).on('error', (e) => {
  console.error(e);
});

const writeDataToFile = (data) => {
    fs.writeFile('request-data.txt', data + ' lol', { flag: 'w' }, function (err) {
        if (err) throw err;
        console.log('');
        console.log("It's saved!");
    });
};