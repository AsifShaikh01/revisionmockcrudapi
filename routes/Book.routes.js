const express = require("express");
const {BookModel} = require("../model/Book.model");
const { auth } = require("../middlewares/Auth.middleware");
const bookRouter = express.Router();


bookRouter.get("/books" , async (req,res)=>{
    const query = req.query;
    try {
        const books = await BookModel.find(query);
        res.send(books);
    } catch (error) {
        res.send(error)
    }
})
bookRouter.get("/books/:id" , async (req,res)=>{
    const {id} = req.params;
    try {
        const book = await BookModel.findById(id);
        res.send(book);
    } catch (error) {
        res.send(error)
    }
})

bookRouter.post("/books" ,auth, async (req,res)=>{
    const payload = req.body;
   try {
    const book = new BookModel(payload);
    await book.save();
    res.send("book has been added successfully!!")
    
   } catch (error) {
      res.send(error)
   }
})

bookRouter.patch("/books/:id" ,auth, async (req,res)=>{
    const ID = req.params.id;
    const payload = req.body;
    try {
        await BookModel.findByIdAndUpdate({_id : ID} , payload);
        res.send("product has been updated successfully!!")
    } catch (error) {
        res.send(error)
    }
})

bookRouter.delete("/books/:id" ,auth, async (req,res)=>{
    const ID = req.params.id;
   
    try {
        await BookModel.findByIdAndDelete({_id : ID});
        res.send("product has been deleted successfully!!")
    } catch (error) {
        res.send(error)
    }
})

module.exports = {
    bookRouter
}