import * as glob from "glob";
import * as core from "@actions/core";

import * as child from "child_process";

const { spawnSync } = child;

type CompileError = {
  projectPath: string;
  stdout: string | null;
  stderr: string | null;
};

(async function start() {
  const projects = await getProjects();
  const compileErrors = runTypescriptCheck(projects);
  logErrors(compileErrors);
})();

function getProjects(): Promise<string[]> {
  return new Promise((res, _) => {
    glob("../**/tsconfig.json", {}, function (err, files) {
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
      console.table(projects);

      res(projects);
    });
  });
}

function runTypescriptCheck(projectPaths: string[]) {
  try {
    const compileErrors: CompileError[] = [];

    projectPaths.forEach((projectPath) => {
      console.log("------------------------");
      console.log(`Compile checking '${projectPath}'`);

      const spawnSyncOptions = {
        cwd: projectPath,
      };

      spawnSync("yarn", ["install"], spawnSyncOptions);

      const res = spawnSync(
        "node_modules/.bin/tsc",
        ["--noEmit", "--pretty"],
        spawnSyncOptions
      );

      const { status, stdout, stderr } = res;
      if (status !== 0) {
        compileErrors.push({
          projectPath,
          stdout: stdout?.toString(),
          stderr: stderr?.toString(),
        });
      }
    });

    return compileErrors;
  } catch (err) {
    core.setFailed("ERROR: Failed to run childProcess");
    throw new Error(err);
  }
}

function logErrors(compileErrors: CompileError[]) {
  if (compileErrors.length) {
    console.log("------------------------");
    core.setFailed(
      `ERROR: Failed to compile ${compileErrors.length} project${
        compileErrors.length > 1 ? `s` : ""
      }`
    );

    compileErrors.forEach((c) => {
      console.log("------------------------");
      if (c.stdout) {
        core.info(`\u001b[Project '${c.projectPath}' failed to compile]`);
        core.setFailed(c.stdout);
      }
      if (c.stderr) {
        core.setFailed(c.stderr);
      }
    });
    process.exit();
  }
}
