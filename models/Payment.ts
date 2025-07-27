import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  trx_ref: String,
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);