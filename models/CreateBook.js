const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createBookSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref : "Book"
    },

    author:{
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
})

const CreateBook = mongoose.model("CreateBook", createBookSchema);

module.exports = CreateBook;