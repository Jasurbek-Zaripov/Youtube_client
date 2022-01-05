import { join } from 'path'
import { readFile } from 'fs/promises'

class Module {
  async read_html(name) {
    let path = join(process.cwd(), 'src', 'html', name + '.html')
    return await readFile(path, 'utf-8')
  }
}
export default new Module()
