const express = require("express");
const upload = require("../../middleware/image.middleware");
const {
    predict,
    getPredictHistories,
} = require("../../controller/predicts.controller");

const router = express.Router();

router.post("/predict", upload.single("image"), predict);
router.get("/predict/histories", getPredictHistories);

module.exports = router;