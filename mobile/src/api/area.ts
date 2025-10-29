import { API_URL } from "./config";
import { Area } from "@/src/types/area";

export async function getAreas(): Promise<Area[]> {
  const res = await fetch(`${API_URL}/area`);
  if (!res.ok) throw new Error("Failed to fetch areas");
  const json = await res.json();
  return json.data;
}

export async function updateArea(area: Area) {
  const res = await fetch(`${API_URL}/area/${area.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(area),
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error("Area not found");
    throw new Error("Failed to update area");
  }
  const json = await res.json();
  return json.data;
}

export async function deleteAreaById(id: number) {
  const res = await fetch(`${API_URL}/area/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to delete area: ${errText}`);
  }

  return await res.json();
}
