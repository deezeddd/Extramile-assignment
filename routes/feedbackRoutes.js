import express from "express";
import {
  addFeedback, addReviewer, deleteReviewer} from "../controller/feedbackController.js";
const router = express.Router();


//Add Feedback
router.post("/add", async (req, res) => {
  const { performanceId, employeeId, comment, rating, name } = req.body;
  try {
    console.log(req.body);
    const feedback = await addFeedback(performanceId, employeeId, comment, rating, name);
    console.log(feedback);
    if (feedback) {
      res.status(200).json(feedback);
    }
  } catch (error) {
      res.status(400).send("Error while adding feedback");
  }
});

//Add/delete Reviewer
router.route("/reviewer")
.post(async (req, res) => {
  const { performanceId, employeeId } = req.query;
  try {
    const performanceReview = await addReviewer(performanceId, employeeId);
    if (performanceReview) {
      res.status(200).json(performanceReview);
    }
  } catch (error) {
      res.status(400).send("Error while adding reviewer to PR");

  }
}).delete( async (req, res) => {
  const { performanceId, employeeId } = req.body;
  try {
    const performanceReview = await deleteReviewer(performanceId, employeeId);
    if (performanceReview) {
      res.status(200).json(performanceReview);
    } 
  } catch (error) {
      res.status(400).send("Error while Deleting reviewer");
  }
});

export default router;