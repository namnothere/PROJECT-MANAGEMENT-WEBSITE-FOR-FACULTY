const periodModel = require("../models/period.model");
const ErrorResponse = require("../helpers/ErrorResponse");

module.exports = {
  create: async (req, res) => {
    try {
      let period = await periodModel.findOne({
        major: req.body.major,
      });

      if (period) {
        throw new ErrorResponse(404, "Major already have registration time");
      }
      const data = await periodModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },
  list: async (req, res) => {
    try {
      let period = await periodModel
        .find({})
        .select(["-updatedAt", "-createdAt"])
        .populate("major")
        .sort({ createdAt: -1 });
      return res.status(200).json(period);
    } catch (error) {
      throw error;
    }
  },
  deletePeriod: async (req, res) => {
    try {
      await periodModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Delete successful");
    } catch (error) {
      throw error;
    }
  },

  findByMajor: async (req, res) => {
    try {
      let major = await periodModel
        .findOne({ major: req.params.id })
        .select(["-updatedAt", "-createdAt"]);
      return res.status(200).json(major);
    } catch (error) {
      throw error;
    }
  },
};
