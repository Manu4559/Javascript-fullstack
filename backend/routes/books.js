import { Router } from 'express'
import Book from '../models/book.js'
import  fs  from 'fs-extra'
import path from 'path'

const router = Router()

router.get('/', async (req, res) => {
    const books = await Book.find()
    res.json(books)
})

router.post('/', async(req, res) =>{
    const {title, author, isbn} = req.body
    const imagePath = '/uploads/' + req.file.filename
    const newBook = new Book({title, author, isbn, imagePath})
    await newBook.save()
    res.json({message: 'Book saved'})
})

router.delete('/:id', async(req, res)=>{
    const book = await Book.findByIdAndDelete(req.params.id)
    fs.unlink(path.resolve('./backend/public' + book.imagePath))
    res.json({message:'Book deleted'})
})
export default router