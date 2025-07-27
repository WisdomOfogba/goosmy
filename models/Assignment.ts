import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  fullName: String,
  matricNumber: String,
  email: String,
  pdfUrl: String,
  assignmentId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", AssignmentSchema);
