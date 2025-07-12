import { model, Schema } from "mongoose";


const genre = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"] as const;


const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, enum: genre, required: true },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: {
    type: Number,
    required: true,
    min: [0, "Copies must be a positive number"],
    },
  available: {type: Boolean, default: true}
},
    { timestamps: true }
);


bookSchema.methods.checkAvailability = function () {
    this.available = this.copies > 0
};

bookSchema.pre('save', function (next) {
    this.available = this.copies > 0;
    next()
})

export const Book = model('Book', bookSchema);
