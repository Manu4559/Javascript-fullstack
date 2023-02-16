import express from 'express'
import morgan from 'morgan'
import multer from 'multer'
import cors from 'cors'
import path,{ dirname } from "path"
import { fileURLToPath } from "url"
import router from './routes/books.js'
import './database.js'
import config from './config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Initrializaciones
const app = express()

// Settings
app.set('port', config.port)

// Middlewares
app.use(morgan('dev'))
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({ storage }).single('image'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/books', router)

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})

