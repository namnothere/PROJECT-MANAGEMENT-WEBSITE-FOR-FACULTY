import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/topic", payload);

export const list = async (query) =>
  await request.get("api/topic/list?" + new URLSearchParams(query).toString());

export const deleteTopic = async (id) =>
  await request.delete("/api/topic/" + id);

export const deleteTopicByManagement = async (id) =>
  await request.delete("/api/topic/deleteByManagement/" + id);

export const findTopic = async (id) => await request.get("/api/topic/" + id);

export const findTopicOfStudent = async (id) =>
  await request.get("/api/topic/topicOfStudent/" + id);

export const update = async (id, payload) =>
  await request.put("/api/topic/" + id, payload);
