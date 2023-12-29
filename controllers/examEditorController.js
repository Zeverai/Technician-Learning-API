const Exam = require("../models/examEditorModel");

exports.createNewExam = async (req, res) => {
   console.log("createNewExam called in examEditorController");
   console.log(req.body);

   try {
      // Check if exam with the same name already exists
      const existingExam = await Exam.findOne({ name: req.body.name });
      if (existingExam) {
         return res.status(400).json({
            error: "Exam with this name already exists, please choose another name.",
         });
      }

      // Handle images for each question
      for (let question of req.body.questions) {
         if (question.imageData) {
            const imagePath = await saveQuestionImage(question.imageData);
            question.imagePath = imagePath;
            delete question.imageData; // Remove the image data from the question object
         }
      }

      const exam = new Exam(req.body);
      exam.created_by = req.user;
      await exam.save();
      res.status(201).json({ message: "Exam created successfully.", exam });
   } catch (error) {
      if (error.code === 11000 && error.keyPattern.name) {
         res.status(400).json({ error: "Exam name already exists!" });
         console.log(error.keyPattern.name);
      } else {
         res.status(500).json({ error: error.message });
         console.log(error.message);
      }
   }
};

exports.getExamById = async (req, res) => {
   try {
      const exam = await Exam.findById(req.params.id);
      if (!exam) return res.status(404).json({ message: "Exam not found." });
      res.status(200).json(exam);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

exports.updateExamById = async (req, res) => {
   try {
      const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });
      exam.updated_by = req.user; // Update the user who made changes
      await exam.save();
      res.status(200).json({ message: "Exam updated successfully.", exam });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

exports.getAllExams = async (req, res) => {
   try {
      const exams = await Exam.find({}, "_id name examKey updatedAt");
      res.status(200).json(exams);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

exports.getExamByName = async (req, res) => {
   try {
      console.log("Getting exam by name:\n" + req.params.name);
      const exam = await Exam.findOne({ name: req.params.name });
      console.log(exam);
      if (!exam) return res.status(404).json({ message: "Exam not found." });
      console.log(`Exam found:\nExam: ${exam}`);
      res.status(200).json(exam);
   } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(`Error finding exam by name:\n${error.message}`);
   }
};

exports.deleteExamById = async (req, res) => {
   try {
      await Exam.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Exam deleted successfully." });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
