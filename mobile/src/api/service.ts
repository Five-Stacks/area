import API_BASE_URL from "./serverAdress";
import { Service } from "../types/service";

export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_BASE_URL}/service`);
  if (!res.ok) throw new Error("Failed to fetch service");
  const json = await res.json();
  return json.data;
}

export async function getServiceById(id: number): Promise<Service> {
  const res = await fetch(`${API_BASE_URL}/service/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Service not found");
    throw new Error("Failed to fetch service");
  }
  const json = await res.json();
  return json.data;
}
