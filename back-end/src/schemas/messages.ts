import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  file: String,
  sendDate: Date,
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema);
export default Message;