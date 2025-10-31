import { API_URL } from "./config";
import { Action } from "@/src/types/action";

export async function getActions(): Promise<Action[]> {
  const res = await fetch(`${API_URL}/action`);
  if (!res.ok) throw new Error("Failed to fetch actions");
  const json = await res.json();
  return json.data;
}

export async function getActionById(id: number): Promise<Action> {
  const res = await fetch(`${API_URL}/action/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Action not found");
    throw new Error("Failed to fetch action");
  }
  const json = await res.json();
  return json.data;
}

export async function getActionsByServiceId(
  serviceId: number,
): Promise<Action[]> {
  const res = await fetch(`${API_URL}/action/service/${serviceId}`);
  if (!res.ok) throw new Error("Failed to fetch actions by service ID");
  const json = await res.json();
  return json.data;
}
