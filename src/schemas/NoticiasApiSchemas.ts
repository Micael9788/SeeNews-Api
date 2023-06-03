import mongoose from "mongoose";

const NoticiasApiSchema = new mongoose.Schema(
  {
    
    
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  creator: { type: String, required: true },
  liked: { type: Number, required: true },
  date: { type: String, required: true },
  url: { type: String, required: true },
  share: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, required: false }
  
  
 }
);

NoticiasApiSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 5 }
);

const newsPostSchema = mongoose.model("newss", NoticiasApiSchema);

export default newsPostSchema;
