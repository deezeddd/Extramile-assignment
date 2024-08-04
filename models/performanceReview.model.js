import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';;

const performanceReviewSchema = new mongoose.Schema({
  performanceId: {
    type: Number,
    required: true,
    default: 0,
  },
  employeeId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  feedback: [
    {
      employeeId: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        ref: "Employee",
        required: true
      },
      rating: { type: Number, min: 1, max: 5 },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  reviewers: [
    {
      employeeId: {
        type: Number,
        required: true,
        ref: "Employee",
      },
    },
  ],
});

performanceReviewSchema.plugin(mongooseSequence(mongoose), { inc_field: "performanceId" });

const Performance = mongoose.model("Performance", performanceReviewSchema);
export default Performance;
