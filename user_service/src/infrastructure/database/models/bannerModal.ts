import mongoose, { Schema, Document } from 'mongoose';
import { BannerEntity, BannerStatus } from '../../../domain/entities/BannerEntity';


const BannerSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BannerStatus),
      default: BannerStatus.Scheduled,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Banner = mongoose.model<BannerEntity>('Banner', BannerSchema);

export default Banner;
