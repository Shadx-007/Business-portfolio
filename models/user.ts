import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    company: { type: String, default: "" },
    avatar: { type: String, default: "" },

    notifications: {
      email: { type: Boolean, default: true },
      project: { type: Boolean, default: true },
      invoice: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false },
    },

    appearance: {
      darkMode: { type: Boolean, default: true },
      compact: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
