const fs = require("fs-extra");
const path = require("path");

(async () => {
  try {
    const srcDir = path.resolve(__dirname, "..", "src");
    const buildDir = path.resolve(__dirname, "..", "build");

    // Copy everything from src to build
    await fs.copy(srcDir, buildDir);

    const newFilePackagePath = path.resolve(buildDir, "package.json");
    const pathPackageJson = path.resolve(__dirname, "..", "package.json");

    const packageJson = await fs.readFile(pathPackageJson, "utf8");

    const jsonData = JSON.parse(packageJson);
    delete jsonData.devDependencies;
    delete jsonData.scripts.build;
    delete jsonData.scripts.dev;

    await fs.writeFile(newFilePackagePath, JSON.stringify(jsonData, null, 2));

    const pathEnv = path.resolve(__dirname, "..", ".env");
    const pathEnvNew = path.resolve(buildDir, ".env");

    await fs.copy(pathEnv, pathEnvNew, { overwrite: true });

    console.log("Copied files from src to build");
  } catch (error) {
    console.log(error);
  }
})();
