import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
    creatorId: { type: ObjectId, ref: 'Account', required: true },
    eventId: { type: ObjectId, ref: 'Event', required: true },
    body: { type: String, required: true }
},
    { timestamps: true, toJSON: { virtuals: true } });

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})