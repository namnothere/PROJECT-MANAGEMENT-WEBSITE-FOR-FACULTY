const topicModel = require("../models/topic.model");
const ErrorResponse = require("../helpers/ErrorResponse");

module.exports = {
  create: async (req, res) => {
    try {
      console.log("TEst",req.body)
      const data = await topicModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },
  list: async (req, res) => {
    try {
      let query = {
        ...(req?.query?.teacher && { teacher: req.query.teacher }),
        ...(req?.query?.teacher === "undefined" && {
          teacher: undefined,
        }),
        ...(req?.query?.student && { teacher: req.query.student }),
        ...(req?.query?.student === "undefined" && {
          student: undefined,
        }),
        ...(req?.query?.teacherReview && {
          teacherReview: req.query.teacherReview,
        }),
        ...(req?.query?.teacherReview === "null" && {
          teacherReview: null,
        }),
        ...(req?.query?.major && { major: req.query.major }),
        ...(req?.query?.approveByManagement && {
          approveByManagement: Number(req?.query?.approveByManagement),
        }),
      };
      if (req?.query?.teacher === "notNull") {
        query.teacher = { $ne: null };
      }

      if (req?.query?.student === "notNull") {
        query.student = { $ne: null };
      }
      console.log(query)
      const data = await topicModel
        .find(query)
        .populate("teacher")
        .populate("student")
        .populate("teacherReview");
      console.log(data)
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteTopic: async (req, res) => {
    try {
      const topic = await topicModel.findById(req.params.id).populate("owner");

      if (topic.teacher.toString()) {
        if (topic.owner._id.toString() === topic.teacher.toString()) {
          await topicModel.findOneAndDelete({ _id: req.params.id });
          res.status(201).json("Delete topic successful");
        } else {
          topic.student = undefined;
          topic.teacher = undefined;
          await topic.save();
          res.status(201).json("Delete topic successful");
        }
      } else {
        await topicModel.findOneAndDelete({ _id: req.params.id });
        res.status(201).json("Delete topic successful");
      }
    } catch (error) {
      throw error;
    }
  },

  deleteByManagementTopic: async (req, res) => {
    try {
      await topicModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Delete topic successful");
    } catch (error) {
      throw error;
    }
  },

  findTopicOfStudent: async (req, res) => {
    try {
      let topic = await topicModel
        .findOne({ student: req.params.id })
        .populate("major")
        .populate("student")
        .populate("teacher")
        .populate("teacherReview")
        .select(["-updatedAt", "-createdAt"]);

      return res.status(200).json(topic);
    } catch (error) {
      throw error;
    }
  },

  findTopic: async (req, res) => {
    try {
      let topic = await topicModel
        .findById(req.params.id)
        .populate("major")
        .populate("student")
        .populate("teacher")
        .populate("teacherReview")
        .select(["-updatedAt", "-createdAt"]);
      return res.status(200).json(topic);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await topicModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );

      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },
};
