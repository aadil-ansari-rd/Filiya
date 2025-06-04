const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamps");
const User = require('./User');
let Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    item : {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Success', 'Failed'] },
    transactionId: { type: String, default: '' },
    transactionDate: Date,
    createdAt: Date,
    updatedAt: Date,
})
TransactionSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Transaction', TransactionSchema)