import Performance from "../models/performanceReview.model.js";

const addFeedback = async (performanceId, employeeId, comment, rating, name) => {
  try {
    const performanceReview = await Performance.findOne({ performanceId });
    if(performanceReview && (performanceReview.reviewers.find((reviewer) => reviewer.employeeId == employeeId))){
            performanceReview.feedback.push({
              employeeId,
              comment,
              rating,
              name,
            });
            await performanceReview.save();
            return performanceReview;
    }
    else{
        console.error("Performance Review does not exist || Could not add feedback to performance review");
    }

    } 
    catch (error) {
        console.error(
         "Could not add feedback to performance review: " + error.message
        );
    }
};

//Reviewer Logic
const addReviewer = async (performanceId, employeeId) => {
    try{
        const performanceReview = await Performance.findOne({ performanceId });
        if(performanceReview){
            const reviewerExists = performanceReview.reviewers.find(reviewer => reviewer.employeeId == employeeId);
            if (reviewerExists == null) {
              performanceReview.reviewers.push({ employeeId });
              await performanceReview.save();
            } else {
              console.error(
                `Reviewer ${employeeId} already added to performance review ${performanceId}`
              );
            }
            return performanceReview;
        }
        else{
            console.error("Performance Review does not exist || Could not add reviewer to performance review");
        }
    }
    catch(error){
        console.error(
          "Could not add reviewer to performance review: " + error.message
        );
    }

};

const deleteReviewer = async (performanceId, employeeId) => {
    try{
        const performanceReview = await Performance.findOne({ performanceId });
        performanceReview.reviewers = performanceReview.reviewers.filter(
        (reviewer) => reviewer.employeeId != employeeId
        );
        console.log(performanceReview.reviewers);
        await performanceReview.save();
        return performanceReview;
    }
    catch(error){
        console.error(
          "Could not delete reviewer to performance review: " + error.message
        );
    }

};


export { addFeedback, addReviewer, deleteReviewer };
