import mongoose from "mongoose";

export const ValidateId = (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    return false;
  }
  return true;
};
