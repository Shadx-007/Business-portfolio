import mongoose, { Schema, models } from "mongoose"

const ClientSchema = new Schema(
  {
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

export default models.Client || mongoose.model("Client", ClientSchema)
