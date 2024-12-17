// ! NO NEED TO EXPORT BECAUSE THIS IS A BUILT IN MODULES. NODEJS KNOWS HOW TO HANDLE THIS. KAILANGAN LANG IS REQUIRE SA ENTRY POINT...

const path = require("path");
const fs = require("fs");

const basePath = path.resolve();
console.log("basePath", basePath);

const first = path.join(basePath, "./content/first.txt");
const second = path.join(basePath, "./content/second.txt");

// USING CALLBACK
fs.readFile(first, (err, firstData) => {
  if (err) {
    throw new Error("First Exception handling...");
  }
  console.log("DATA READ", firstData.toString("utf-8"));

  fs.readFile(second, "utf-8", (err, secondData) => {
    if (err) {
      throw new Error("Second Exception handling...");
    }
    console.log("DATA READ", secondData.toString("utf-8"));

    fs.writeFile(
      path.join(basePath, "./content/result-async.txt"),
      `Here are the results: \n\n ${firstData} \n ${secondData} `,
      {
        flag: "a",
      },
      (err) => {
        if (err) throw new Error("Error writing to the result file...");
        console.log("Content written to result-async.txt");
      }
    );
  });
});

// *its working.. : YOU CAN SEE THE LOGS IN TERMINAL READING THE TEXT FILE INSIDE THE  CONTENT FOLDER...  and also you can see that there is result-sync.txt file added which contains the results of the first and second text. notie that there is 'a' flag which means appended.

// USING ASYNC-AWAIT
const fsPromise = require("fs").promises;
(async function processFiles() {
  try {
    // read first file
    const firstResult = await fsPromise.readFile(first, "utf-8");
    console.log("ASYNC First file content:", firstResult);
    // read second file
    const secondResult = await fsPromise.readFile(second, "utf-8");
    console.log("ASYNC Second file content:", secondResult);
    // write both files
    fsPromise.writeFile(
      path.join(basePath, "./content/result-async.txt"),
      `HERE ARE THE RESULTS: \n \n ${firstResult} \n ${secondResult}`,
      { flag: "a" }
    );
    console.log("Content written to result-async.txt");
  } catch (error) {
    console.error("Error", error);
  }
})();
