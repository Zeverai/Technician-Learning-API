const FlowChart = require("../models/FlowChart");

exports.createFlowChart = async (req, res) => {
   try {
      const flowChart = await FlowChart.create(req.body);
      res.status(201).json({ success: true, data: flowChart });
   } catch (error) {
      res.status(400).json({ success: false, message: error.message });
   }
};

exports.getFlowChart = async (req, res) => {
   try {
      const flowChart = await FlowChart.findById(req.params.id);
      if (!flowChart) {
         return res.status(404).json({ success: false, message: "FlowChart not found" });
      }
      res.status(200).json({ success: true, data: flowChart });
   } catch (error) {
      res.status(400).json({ success: false, message: error.message });
   }
};

exports.updateFlowChart = async (req, res) => {
   try {
      const flowChart = await FlowChart.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });
      if (!flowChart) {
         return res.status(404).json({ success: false, message: "FlowChart not found" });
      }
      res.status(200).json({ success: true, data: flowChart });
   } catch (error) {
      res.status(400).json({ success: false, message: error.message });
   }
};
