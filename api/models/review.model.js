import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    tour_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Tour", 
      required: true 
    },
    rating: { 
      type: Number, 
      min: 1, 
      max: 5, 
      required: true 
    },
    comment: { 
      type: String 
    },
    created_at: { 
      type: Date, 
      default: Date.now 
    }
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("Review", reviewSchema);