const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    task_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["All", "Work", "Personal"],
      default: "Work",
    },
    due_date: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "High",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("task", TaskSchema);
