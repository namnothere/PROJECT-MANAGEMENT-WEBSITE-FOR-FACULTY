const { majorModel, userModel, topicModel, periodModel } = require("../models");

const repositories = {
  major: majorModel,
  user: userModel,
  topic: topicModel,
  period: periodModel,
}

class ModelFactory {
  static create(type, data) {
    return repositories[type].create(data);
  }

  static findOne(type, query) {
    return repositories[type].findOne(query);
  }

  static findById(type, id) {
    return repositories[type].findById(id);
  }

  static findByIdAndUpdate(type, id, data) {
    return repositories[type].findByIdAndUpdate(id, data);
  }

  static findOneAndDelete(type, query) {
    return repositories[type].findOneAndDelete(query);
  }
}

module.exports = ModelFactory;
