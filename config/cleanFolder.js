const fs = require('fs');

const folderToClean = './dist';

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = `${path}/${file}`;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
}

console.log('Cleaning working tree...');

deleteFolderRecursive(folderToClean);

console.log('Successfully cleaned working tree!');
