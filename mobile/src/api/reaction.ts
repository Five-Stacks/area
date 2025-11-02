import { API_URL } from "./config";
import { Reaction } from "../types/reaction";

export async function getReactions(): Promise<Reaction[]> {
  const res = await fetch(`${API_URL}/reaction`);
  if (!res.ok) throw new Error("Failed to fetch reaction");
  const json = await res.json();
  return json.data;
}

export async function getReactionById(id: number): Promise<Reaction> {
  const res = await fetch(`${API_URL}/reaction/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Action not found");
    throw new Error("Failed to fetch reaction");
  }
  const json = await res.json();
  return json.data;
}

export async function getReactionByServiceId(
  serviceId: number,
): Promise<Reaction[]> {
  const res = await fetch(`${API_URL}/reaction/service/${serviceId}`);
  if (!res.ok) throw new Error("Failed to fetch reaction by service ID");
  const json = await res.json();
  return json.data;
}
