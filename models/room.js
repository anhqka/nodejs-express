import mongoose from "mongoose";

const { Schema, model } = mongoose;

const roomSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sender_id: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timeStamp: true }
);

roomSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const room = model("room", roomSchema);

export default room;
