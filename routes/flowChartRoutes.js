const express = require("express");
const router = express.Router();

const {
   createFlowChart,
   getFlowChart,
   updateFlowChart,
} = require("../controllers/flowChartController");

router.route("/").post(createFlowChart);

router.route("/:id").get(getFlowChart).put(updateFlowChart);

module.exports = router;
