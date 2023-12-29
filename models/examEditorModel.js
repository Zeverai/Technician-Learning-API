const mongoose = require("mongoose");

const shortAnswerSchema = new mongoose.Schema({
   type: { type: String, default: "short-answer" },
   img: String,
   body: String,
   input: { userResponse: String },
   answer: { expectedResponse: String },
});

const examSchema = new mongoose.Schema(
   {
      examKey: { type: String },
      name: { type: String, unique: true, required: true },
      description: String,
      tier: Number,
      questions: [mongoose.Schema.Types.Mixed],
      created_at: { type: Date, default: Date.now },
      updated_at: Date,
      created_by: { first_name: String, last_name: String },
      updated_by: { first_name: String, last_name: String },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
