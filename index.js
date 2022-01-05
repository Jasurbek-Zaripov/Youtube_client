import express from 'express'
import { join } from 'path'
import rout from './src/controller/controller.js'
const app = express()
const PORT = process.env.PORT || 3000
//public file
app.use(express.static(join(process.cwd(), 'src', 'public')))

//router
app.use(rout)

app.listen(PORT, console.log('\nClient: http://localhost:3000\n'))
