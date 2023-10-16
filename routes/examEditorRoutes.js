const express = require("express");
const examController = require("../controllers/examEditorController");
const router = express.Router();

router.post("/new-exam", examController.createNewExam);
router.get("/load-exam/:id", examController.getExamById);
router.get("/get-exam-by-name/:name", examController.getExamByName);
router.put("/update-exam/:id", examController.updateExamById);
router.delete("/delete-exam/:id", examController.deleteExamById);
router.get("/all-exams", examController.getAllExams);

module.exports = router;
