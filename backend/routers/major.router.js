const express = require("express");
const router = express.Router();

const {
  create,
  list,
  update,
  deleteMajor,
  findByMajor,
} = require("../controllers/major.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/:id").delete(asyncMiddelware(deleteMajor));
router.route("/:id").put(asyncMiddelware(update));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
