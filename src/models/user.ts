import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  discord_id: { type: String, required: true, ref: "messages" },
  username: { type: String, required: true },
  discriminator: { type: String, required: true },
  wl_wallet_address: { type: String, required: false },
  og_wallet_address: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  whitelist: { type: Boolean, default: false },
  og: { type: Boolean, default: false },
});

const User = mongoose.model<mongoose.Document>("users", userSchema);

export default User;
