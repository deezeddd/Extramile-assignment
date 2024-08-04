import PerformanceReview from "../models/performanceReview.model.js";

// Create PR
const createPerformanceReview = async (performance) => {
  try {
    const newPR = new PerformanceReview(performance);
    const savedReview = await newPR.save();
    return savedReview;
  } catch (error) {
    throw new Error("Could not create Performance Review: " + error.message);
  }
};

// Get PRs by Id
const getPerformanceReviewsById = async (performanceId) => {
  try {
    const performanceReviews = await PerformanceReview.findOne({performanceId});
    return performanceReviews;
  } catch (error) {
    throw new Error("Could not fetch Performance Review: " + error.message);
  }
};

// Get All PRs
const getAllPerformanceReviews = async () => {
  try {
    const performanceReviews = await PerformanceReview.find({employeeId: {$exists: true}}).populate('employeeId');
    const validatedPerformanceReviews = [];
    for(const review of performanceReviews){
      if(review.employeeId){
        validatedPerformanceReviews.push(review);
      }
    }
    return validatedPerformanceReviews;
  } catch (error) {
    throw new Error("Could not fetch Performance Reviews: " + error.message);
  }
};

// Update
const updatePerformanceReview = async (performanceId, updatedData) => {
  try {
    const updatedReview = await PerformanceReview.findOneAndUpdate(
      { performanceId },
      updatedData,
      { new: true }
    );
    return updatedReview;
  } catch (error) {
    throw new Error("Could not update Performance Review: " + error.message);
  }
};

// Delete
const deletePerformanceReview = async (performanceId) => {
  try {
    const performance = await PerformanceReview.findOne({ performanceId });
    if (!performance) {
      return "Performance Review Does not Exist";
    }
    await PerformanceReview.findOneAndDelete({ performanceId });
    return { message: `Performance Review: ${performanceId} deleted successfully`, performance };
  } catch (error) {
    throw new Error("Could not delete Performance Review: " + error.message);
  }
};

export { createPerformanceReview, getAllPerformanceReviews, getPerformanceReviewsById, updatePerformanceReview, deletePerformanceReview };

