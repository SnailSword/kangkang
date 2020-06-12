/**
 * 获取项目根目录
 * @return {string} 目录 Path
 */

import os from 'os'
import path from 'path'
import fs from 'fs-extra'

export default function getHome () {
  let dir = path.resolve(process.env[os.platform() === 'win32' ? 'APPDATA' : 'HOME'], '.npm-shovel');
  fs.ensureDirSync(dir)

  return dir;
}
