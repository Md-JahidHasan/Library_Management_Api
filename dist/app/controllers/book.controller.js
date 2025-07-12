"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoute = express_1.default.Router();
exports.bookRoute.post("/create-book", async (req, res, next) => {
    try {
        const book = await book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.bookRoute.get('/', async (req, res, next) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = await book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        next(error);
    }
});
exports.bookRoute.get('/:bookId', async (req, res, next) => {
    try {
        const book = await book_model_1.Book.findById(req.params.bookId);
        if (!book)
            return res.status(404).json({ success: false, message: 'Book note found' });
        res.json({
            success: true,
            message: "Book retrived successfully",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
});
exports.bookRoute.put('/:bookId', async (req, res, next) => {
    try {
        const book = await book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        if (!book)
            return res.status(404).json({ success: false, message: "Book not found" });
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: book
        });
    }
    catch (error) {
        next(error);
    }
});
exports.bookRoute.delete('/:bookId', async (req, res, next) => {
    try {
        await book_model_1.Book.findByIdAndDelete(req.params.bookId);
        res.json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
