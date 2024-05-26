const express = require("express");
const router = express.Router();

const {
  create,
  list,
  deletePeriod,
  findByMajor,
} = require("../controllers/period.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/findByMajor/:id").get(asyncMiddelware(findByMajor));
router.route("/:id").delete(asyncMiddelware(deletePeriod));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
