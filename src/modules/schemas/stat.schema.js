import mongoose from 'mongoose';

const statSchema = new mongoose.Schema(
  {
    app: {
      type: String,
      required: true,
      unique: true
    },
    totalProjectGenerated: {
      type: Number,
      default: 0
    },
    projectGeneratedStat: [
      {
        framework: String,
        genCount: Number
      }
    ]
  },
  {
    timestamps: true
  }
);

export const StatModel = mongoose.model('Stat', statSchema);
