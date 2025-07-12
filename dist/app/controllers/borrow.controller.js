"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoute = express_1.default.Router();
exports.borrowRoute.post('/', async (req, res, next) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await book_model_1.Book.findById(bookId);
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
        ;
        book.copies -= quantity;
        book.available = book.copies > 0;
        await book.save();
        const borrow = await borrow_model_1.Borrow.create({ book: bookId, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowRoute.get('/', async (req, res, next) => {
    const summary = await borrow_model_1.Borrow.aggregate([
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
});
