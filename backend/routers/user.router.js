const express = require("express");
const router = express.Router();

const {
  login,
  create,
  list,
  deleteUser,
  findUser,
  update,
  getListTeacher,
  listTeacherReview,
} = require("../controllers/user.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/login").post(asyncMiddelware(login));
router.route("/getListTeacher").get(asyncMiddelware(getListTeacher));
router
  .route("/listTeacherReview/:id")
  .get(asyncMiddelware(listTeacherReview));
router.route("/:id").put(asyncMiddelware(update));
router.route("/:id").delete(asyncMiddelware(deleteUser));
router.route("/:id").get(asyncMiddelware(findUser));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
