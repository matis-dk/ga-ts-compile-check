import * as glob from "glob";

const spawnSync = require("child_process").spawnSync;
const core = require("@actions/core");

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

    projectPaths.forEach((path) => {
      console.log("------------");
      console.log(`Compile checking '${path}'`);

      const spawnSyncOptions = {
        cwd: path,
      };

      spawnSync("yarn", ["install"], spawnSyncOptions);

      const res = spawnSync(
        "node_modules/.bin/tsc",
        ["--noEmit"],
        spawnSyncOptions
      );

      const { status, stdout, stderr, output } = res;
      if (status !== 0) {
        compileErrors.push({
          path,
          response: {
            status,
            stdout: stdout?.toString(),
            stderr: stderr?.toString(),
            output: output && output.map((o) => o?.toString()),
          },
        });
      }
    });

    if (compileErrors.length) {
      console.log("------------");
      core.setFailed(
        "ERROR: Failed to compile one or more typescript projects"
      );
      console.log(compileErrors);
      process.exit();
    }
  } catch (err) {
    console.log("------------");
    console.log("ERROR: Failed to run childProcess");
    throw new Error(err);
  }
}

start();
