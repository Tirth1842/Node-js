const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writestream = fs.createWriteStream('./docs/blog4.txt');
// readStream.on('data', (chunk) => {
//     console.log('------new chunk-------')
//     console.log(chunk);
//     writestream.write('\n NEW CHUNK \n');
//     writestream.write(chunk);
// });


// piping

readStream.pipe(writestream);