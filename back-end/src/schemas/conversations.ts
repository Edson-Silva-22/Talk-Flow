import mongoose from "mongoose";

export const conversationSchema = new mongoose.Schema({
    firstUsreId: String,
    secondUserId: String,
    lastMessage: String,
    lastMessageDate: Date,
}, {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;