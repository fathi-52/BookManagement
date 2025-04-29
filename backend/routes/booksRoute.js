import express from "express"
import { Book } from "../models/bookModel.js";
const router = express.Router();


router.post('/', async(request, response) => {
    try {
        if(
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear 
        ){
            return response.status(400).send({
                message: `Send all required field`
            })
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }
const book = await Book.create(newBook)
return response.status(201).send(book)

    } catch (error) {
        console.log(error.message);

        
        
    }
})

router.get("/", async (request, response) => {
    try {
        const books = await Book.find({})
        return response.status(200).json({
            count:books.length,
            data:books
        })
        
    } catch (error) {
        console.error(error.message);
        
        
    }
})

router.get("/:id", async (request, response) => {
    try {

        const {id} = request.params
        const book = await Book.findById(id)
        return response.status(200).json(book)
        
    } catch (error) {
        console.error(error.message);
        
        
    }
})
router.put("/:id", async (request, response) => {
    try {
        if(
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear 
        ){
            return response.status(400).send({
                message: `Send all required field`
            })
        }

        const {id} = request.params
        const result = await Book.findByIdAndUpdate(id, request.body)
        if(!result){
            return response.status(404).json({message:'Book Not found'});
        }

        return response.status(200).json({message:'Book updated sucessfully'})
        
    } catch (error) {
        console.error(error.message);
        
        
    }
})
router.delete("/:id", async (request, response) => {
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(400).json({message : "Book Not Found"});
        }
        response.status(200).send({message:"Book deleted SuccessFully"})
        
    } catch (error) {
        console.error({message:error.message});
        
    }
})


export default router;