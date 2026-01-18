import mongoose from "mongoose"

const ClientSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // ⭐ VERY IMPORTANT
    },

    name: String,
    company: String,
    email: String,
    phone: String,
    age: Number,
    skills: [String],
    github: String,
    linkedin: String,
    salary: Number,
    experience: Number,
    rating: Number,
    projectsCount: Number,
    status: String,
  },
  { timestamps: true }
)

export default mongoose.models.Client ||
  mongoose.model("Client", ClientSchema)
