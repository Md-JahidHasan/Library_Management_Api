import express, { NextFunction, Request, Response } from "express";
import { bookRoute } from "./book.controller";
import { Book } from "../models/book.model";
import { error } from "console";



export const borrowRoute = express.Router();


borrowRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await Book.findById(bookId);

        if (!book || book.copies < quantity) {
            res.status(400).json({
              message: "Validation failed",
              success: false,
              error: {
                name: "ValidationError",
                message: "Insufficient copies or invalid book ID",
              },
            });
        }
    } catch (error) {
        next(error)
    }
})