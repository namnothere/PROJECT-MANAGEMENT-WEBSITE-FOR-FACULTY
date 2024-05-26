const ErrorResponse = require("../helpers/ErrorResponse");
const ModelFactory = require("../factory/model.factory");

module.exports = {
  create: async (req, res) => {
    try {
      let { ...body } = req.body;
      let major = await ModelFactory.findOne("major", {
        name: body.name,
      });
      if (major) {
        throw new ErrorResponse(404, "majors already exist");
      }
      const data = await ModelFactory.create("major", body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  list: async (req, res) => {
    try {
      let major = await ModelFactory
        .find("major", {})
        .select(["-updatedAt", "-createdAt"])
        .sort({ createdAt: -1 });
      return res.status(200).json(major);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const major = await ModelFactory.findByIdAndUpdate("major",
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );
      res.status(201).json(major);
    } catch (error) {
      throw error;
    }
  },
  deleteMajor: async (req, res) => {
    try {
      await ModelFactory.findOneAndDelete("major", { _id: req.params.id });
      res.status(201).json("Delete major successful");
    } catch (error) {
      throw error;
    }
  },
};
