import mongoose, { Schema, models } from "mongoose"

const ProjectSchema = new Schema(
  {
    name: String,
    client: String,
    status: String,
    progress: Number,
    deadline: String,
  },
  { timestamps: true }
)

export default models.Project || mongoose.model("Project", ProjectSchema)
