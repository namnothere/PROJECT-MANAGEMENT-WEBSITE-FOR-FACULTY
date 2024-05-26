import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/major", payload);

export const list = async () => await request.get("/api/major");

export const update = async (id, payload) =>
  await request.put("/api/major/" + id, payload);

export const deleteMajor = async (id) =>
  await request.delete("/api/major/" + id);
