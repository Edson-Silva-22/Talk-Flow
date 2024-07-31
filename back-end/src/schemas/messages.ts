import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  text: String,
  sendDate: Date,
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema);
export default Message;