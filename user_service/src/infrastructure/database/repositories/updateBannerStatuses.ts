import Banner from "../models/bannerModal";

export const updateBannerStatuses = async () => {
  const now = new Date();
  console.log("hey I am here")

  try { 

    await Banner.updateMany(
        {
          $expr: {
            $and: [
              { $lte: [{ $toDate: "$startDate" }, now] },
              { $gte: [{ $toDate: "$endDate" }, now] },
            ],
          },
          status: { $ne: "Active" },
        },
        { $set: { status: "Active" } }
      );

      await Banner.updateMany(
        {
          $expr: {
            $and: [
              { $lt: [{ $toDate: "$endDate" }, now] }, // Convert endDate to Date and compare
              { $ne: ["$status", "Expired"] }, // Ensure status is not already Expired
            ],
          },
        },
        { $set: { status: "Expired" } }
      );
      
      await Banner.updateMany(
        {
          $expr: {
            $and: [
              { $gt: [{ $toDate: "$startDate" }, now] }, // Convert startDate to Date and compare
              { $ne: ["$status", "Scheduled"] }, // Ensure status is not already Scheduled
            ],
          },
        },
        { $set: { status: "Scheduled" } }
      );
      
        return true;

  } catch (error: any) {
    throw new Error(error?.message);
  }
};
