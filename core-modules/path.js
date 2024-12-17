const path = require("path");

// ! NO NEED TO EXPORT BECAUSE THIS IS A BUILT IN MODULES. NODEJS KNOWS HOW TO HANDLE THIS. KAILANGAN LANG IS REQUIRE SA ENTRY POINT...

//  -- join segments without resolving to absokute path
const filePath = path.join(path.sep, "content", "subfolder", "test.txt");
console.log("FILE PATH", filePath);

const base = path.basename(filePath);
console.log("FILENAME", base);

// -- similar to process.cwd() which is the working directory
const dirName = path.resolve(__dirname, "content/subfolder/test.txt");
console.log("DIRNAME", dirName);

const dir = path.resolve();
console.log("dir", dir); // or process.cwd() parehong results
