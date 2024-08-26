import fs from 'fs-extra'
import { execa } from 'execa'
import strip from 'strip-comments'
import c from 'picocolors'

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

const step = (msg) => console.log(c.cyan(msg))

const filename = 'event.js'
const dest = `src/${filename}`

async function main() {
  // 检查是否存在jquery目录
  const fileExists = await fs.pathExists('jquery')

  if (fileExists) {
    step('\nThe jQuery directory already exists, skipping cloning')
  } else {
    step('\nClone the jQuery git repo...')
    await run('git', [
      'clone',
      '--branch',
      '4.0.0-beta.2',
      '--single-branch',
      'https://github.com/jquery/jquery.git',
    ])
  }

  // 判断是否已经安装依赖,没安装就安装依赖
  const fileNodeModulesExists = await fs.pathExists('jquery/node_modules')
  if (fileNodeModulesExists) {
    step('\nJQuery dependency already exists, skip installation')
  } else {
    step('\nInstall jQuery dependencies...')
    await run('npm', ['install'], { cwd: 'jquery' })
  }

  step('\nBuild jQuery...')
  // 构建自己的jquery
  await run(
    'npm',
    [
      'run',
      'build',
      '--',
      '--include=event',
      `--filename="${filename}"`,
      '--esm',
    ],
    { cwd: 'jquery' },
  )

  step(`\nMove jQuery build product to ${dest} directory...`)
  // 移动到src目录
  fs.moveSync(`jquery/dist/${filename}`, dest, {
    overwrite: true,
  })

  step(`\nRemove unnecessary comments...`)
  // 移除注释
  let jsCode = await fs.readFile(dest, 'utf-8')
  jsCode = strip(jsCode)
  await fs.writeFile(dest, jsCode, 'utf-8')
}

main().catch((err) => console.error(err))
