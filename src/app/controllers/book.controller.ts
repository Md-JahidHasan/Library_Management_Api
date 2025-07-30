import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";


export const  bookRoute = express.Router()

bookRoute.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
    const query: any = {}


    if (filter) query.genre = filter;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));
    
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books
    });
  } catch (error) {
    next(error)
  }
})


bookRoute.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
  try {

    const book = await Book.findById(req.params.bookId)
    if (!book) return res.status(404).json({ success: false, message: 'Book note found' })
    
    res.json({
      success: true, 
      message: "Book retrived successfully",
      data: book
    })
  } catch (error) {
    next(error)
  }
})


bookRoute.put('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    
    res.json({
      success: true, 
      message: 'Book updated successfully',
      data: book
    })
  } catch (error) {
    next(error)
  }
})

bookRoute.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);

    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null
    });
  } catch (error) {
    next(error)
  }
})