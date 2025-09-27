import mongoose, { mongo, Schema } from "mongoose";

interface IConversation extends Document {
  participants: Array<mongoose.Types.ObjectId>;
  messages: Array<mongoose.Types.ObjectId>;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
