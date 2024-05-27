const ModelFactory = require("../factory/model.factory");
const ErrorResponse = require("../helpers/ErrorResponse");

module.exports = {
  list: async (req, res) => {
    try {
      let user = await ModelFactory
        .find("user", {})
        .populate("major")
        .select(["-updatedAt", "-createdAt"])
        .sort({ createdAt: -1 });
      return res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  },
  listTeacherReview: async (req, res) => {
    try {
      const data = await ModelFactory
        .find("user", { major: req.params.id, role: 1 })
        .populate("major");
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getListTeacher: async (req, res) => {
    try {
      let user = await ModelFactory
        .find("user", { role: { $in: [1, 2] } })
        .populate("major");
      return res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  },
  findUser: async (req, res) => {
    try {
      let user = await ModelFactory
        .findById("user", req.params.id)
        .populate("major")
        .select(["-updatedAt", "-createdAt"]);
      return res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  },
  login: async (req, res) => {
    try {
      let { ...body } = req.body;
      let user = await ModelFactory
        .findOne("user", {
          username: body.username,
          password: body.password,
        })
        .populate("major")
        .select("-password");

      if (!user) {
        throw new ErrorResponse(404, "Username or password is incorrect");
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  create: async (req, res) => {
    try {
      let { ...body } = req.body;

      let user = await ModelFactory.findOne("user", {
        username: body.username,
        email: body.email,
      });

      if (user) {
        throw new ErrorResponse(404, "Username or email already exists");
      }

      if (req.body.role == 2) {
        const existManagement = await ModelFactory.findOne("user", {
          role: 2,
          major: body.major,
        });

        if (existManagement) {
          throw new ErrorResponse(
            404,
            `${existManagement?.name} is currently the head of this major`
          );
        }
      }

      const data = await ModelFactory.create("user", body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const existManagement = await ModelFactory.findOne("user", {
        role: 2,
        major: req.body.major,
      });

      if (
        existManagement?.username != req.body.username &&
        req?.body?.role == 2
      ) {
        throw new ErrorResponse(
          404,
          `${existManagement?.name} is currently the head of this major`
        );
      }

      await ModelFactory.findByIdAndUpdate("user". req.params.id, {
        ...req.body,
      });

      const user = await ModelFactory
        .findById("user", req.params.id)
        .populate("major")
        .select("-password");
      res.status(201).json(user);
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (req, res) => {
    try {
      await ModelFactory.findOneAndDelete("user", { _id: req.params.id });
      res.status(201).json("Delete user successful");
    } catch (error) {
      throw error;
    }
  },
};
