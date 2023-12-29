const mongoose = require("mongoose");

const flowChartSchema = new mongoose.Schema({
   docName: {
      type: String,
      required: true,
   },
   nodes: {
      type: Array,
      default: [],
   },
   edges: {
      type: Array,
      default: [],
   },
   gridStyle: {
      type: String,
      default: "dots",
   },
   gridColor: {
      type: String,
      default: "inherit",
   },
   snapToGrid: {
      type: Boolean,
      default: true,
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
});

const FlowChart = mongoose.model("FlowChart", flowChartSchema);

module.exports = FlowChart;
