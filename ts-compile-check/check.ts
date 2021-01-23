import * as glob from "glob";

const childProcess = require("child_process");

async function start() {
  const projects = await getProjects();
  await runTypescriptCheck(projects);
}

function getProjects(): Promise<string[]> {
  return new Promise((res, rej) => {
    glob("../**/*/tsconfig.json", {}, function (err, files) {
      if (err) {
        throw new Error("Failed search for tsconfig.json files");
      }

      const projects = files
        .filter(
          (f) => !(f.includes("node_modules") || f.includes("ts-compile-check"))
        )
        .map((path) => path.replace("/tsconfig.json", ""));

      console.log("------------");
      console.log("Projects found with a tsconfig.json file");
      console.log(projects);

      res(projects);
    });
  });
}

async function runTypescriptCheck(projectPaths: string[]) {
  try {
    const compileErrors = [];
    let currentPath = "";

    const res = childProcess.spawnSync("ls", {
      cwd: projectPaths[0],
    });

    console.log(res.stdout.toString());
    return;

    projectPaths.forEach((path) => {
      console.log("------------");
      console.log(`Compile checking '${path}'`);
      currentPath = path;
      const res = childProcess.spawnSync(
        "node_modules/.bin/tsc",
        ["--noEmit"],
        {
          cwd: path,
        }
      );
      if (res.status !== 0) {
        console.log(res);

        compileErrors.push({
          path,
          response: res,
        });
      }
    });

    console.log("------------");
    console.log("compileErrors ", compileErrors);
  } catch (err) {
    console.log("Failed to run childProcess!");
    throw new Error(err);
  }
}

start();
