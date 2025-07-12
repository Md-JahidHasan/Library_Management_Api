import express, { NextFunction, Request, Response } from "express";
import { bookRoute } from "./book.controller";
import { Book } from "../models/book.model";
import { error } from "console";
import { Borrow } from "../models/borrow.model";



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
        };

        book!.copies -=  quantity;
        book!.available = book!.copies > 0

        await book!.save()

        const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
        res.status(201).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrow,
        });

    } catch (error) {
        next(error)
    }
})


borrowRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
    console.log(summary);
    
})