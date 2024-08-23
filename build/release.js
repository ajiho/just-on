import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import c from "picocolors";
import prompts from "prompts";
import { execa } from "execa";
import semver from "semver";

const { version: currentVersion } = createRequire(import.meta.url)(
  "../package.json"
);
const { inc: _inc, valid } = semver;

const versionIncrements = ["patch", "minor", "major"];

const tags = ["latest", "next"];

const dir = fileURLToPath(new URL(".", import.meta.url));
const inc = (i) => _inc(currentVersion, i);
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: "inherit", ...opts });
const step = (msg) => console.log(c.cyan(msg));

async function main() {
  let targetVersion;

  //准备选项
  const versions = versionIncrements
    .map((i) => `${i} (${inc(i)})`)
    .concat(["custom"]);

  const { release } = await prompts({
    type: "select",
    name: "release",
    message: "Select release type",
    choices: versions,
  });

  if (release === 3) {
    //选择了自定义
    targetVersion = (
      await prompts({
        type: "text",
        name: "version",
        message: "Input custom version",
        initial: currentVersion,
      })
    ).version;
  } else {
    targetVersion = versions[release].match(/\((.*)\)/)[1];
  }

  if (!valid(targetVersion)) {
    //验证是否有效版本号
    throw new Error(`Invalid target version: ${targetVersion}`);
  }

  const { tag } = await prompts({
    type: "select",
    name: "tag",
    message: "Select tag type",
    choices: tags,
  });

  const { yes: tagOk } = await prompts({
    type: "confirm",
    name: "yes",
    message: `Releasing v${targetVersion} on ${tags[tag]}. Confirm?`,
  });

  if (!tagOk) {
    return;
  }

  // 更新版本号
  step("\nUpdating the package version...");
  updatePackage(targetVersion);

  // 提交更改和创建tag
  step("\nCommitting changes...");
  await run("git", ["add", "."]);
  await run("git", ["commit", "-m", `release: v${targetVersion}`]);
  await run("git", ["tag", `v${targetVersion}`]);

  // 推送到远程仓库
  step("\nPushing to GitHub...");
  await run("git", ["push", "origin", `refs/tags/v${targetVersion}`]);
  await run("git", ["push"]);
}

function updatePackage(version) {
  const files = ["package.json", "package-lock.json"];

  files.forEach((file) => {
    const pkgPath = resolve(resolve(dir, ".."), file);
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    pkg.version = version;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  });
}

main().catch((err) => console.error(err));
