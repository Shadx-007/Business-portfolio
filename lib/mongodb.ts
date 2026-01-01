import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

export default async function connectToDatabase() {
  console.log("🌍 ENV MONGODB_URI =", MONGODB_URI)

  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is undefined")
  }

  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Mongo already connected")
    return
  }

  try {
    await mongoose.connect(MONGODB_URI)
    console.log("✅ MongoDB connected successfully")
  } catch (error) {
    console.error("🔥 MongoDB connection failed:", error)
    throw error
  }
}
