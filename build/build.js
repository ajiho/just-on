import fs from 'fs-extra'
import { execa } from 'execa'
import strip from 'strip-comments'
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

const filename = 'event.js'
const dest = `src/${filename}`

async function main() {
  // 检查是否存在jquery目录
  const fileExists = await fs.pathExists('jquery')

  if (fileExists) {
    console.log('The jQuery directory already exists')
  } else {
    // 克隆jquery仓库
    await run('git', ['clone', 'https://github.com/jquery/jquery.git'])
  }

  // 判断是否已经安装依赖,没安装就安装依赖
  const fileNodeModulesExists = await fs.pathExists('jquery/node_modules')
  if (fileNodeModulesExists) {
    console.log('Dependency already installed')
  } else {
    await run('npm', ['install'], { cwd: 'jquery' })
  }

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

  // 移动到src目录
  fs.moveSync(`jquery/dist/${filename}`, dest, {
    overwrite: true,
  })

  // 移除注释
  let jsCode = await fs.readFile(dest, 'utf-8')
  jsCode = strip(jsCode)
  await fs.writeFile(dest, jsCode, 'utf-8')
}

main().catch((err) => console.error(err))
