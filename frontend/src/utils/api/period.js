import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/period", payload);

export const list = async () => await request.get("/api/period");

export const deletePeriod = async (id) =>
  await request.delete("/api/period/" + id);

export const findPeriodByMajor = async (id) =>
  await request.get("/api/period/findByMajor/" + id);
