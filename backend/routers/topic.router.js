const express = require("express");
const router = express.Router();

const {
  create,
  list,
  deleteTopic,
  findTopic,
  update,
  findTopicOfStudent,
  deleteByManagementTopic,
} = require("../controllers/topic.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/list").get(asyncMiddelware(list));
router.route("/topicOfStudent/:id").get(asyncMiddelware(findTopicOfStudent));
router
  .route("/deleteByManagementTopic/:id")
  .delete(asyncMiddelware(deleteByManagementTopic));
router.route("/:id").put(asyncMiddelware(update));
router.route("/:id").get(asyncMiddelware(findTopic));
router.route("/:id").delete(asyncMiddelware(deleteTopic));
router.route("/").post(asyncMiddelware(create));

module.exports = router;
