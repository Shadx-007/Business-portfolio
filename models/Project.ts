import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    client: String,
    status: String,
    progress: Number,
    deadline: String,
  },
  { timestamps: true }
)

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema)
