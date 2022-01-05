import { Router } from 'express'
import module from '../module/module.js'
const rout = Router()

rout.get('/', async (req, res) => {
  try {
    return res.send(await module.read_html('index'))
  } catch (xato) {
    return res.json({ ERROR: xato.message })
  }
})

rout.get('/:name', async (req, res) => {
  try {
    let { name } = req.params
    if (!['admin', 'login', 'register'].includes(name)) {
      throw new Error('Page not found')
    }

    return res.send(await module.read_html(name))
  } catch (xato) {
    return res.json({ ERROR: xato.message })
  }
})

export default rout
