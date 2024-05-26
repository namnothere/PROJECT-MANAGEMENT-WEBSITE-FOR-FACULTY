const { majorModel, userModel } = require("../models");

class ModelFactory {
  static createModel(type, data) {
    switch (type) {
      case ModelTypes.USER:
        return new userModel(data);
      case "major":
        return new majorModel(data);
      default:
        throw new Error("Invalid model type");
    }
  }
}

module.exports = ModelFactory;
