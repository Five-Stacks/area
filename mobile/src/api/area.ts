import Area from "@/src/types/area";
import API_BASE_URL from "./serverAdress";

export async function getAreas(): Promise<Area[]> {
  const res = await fetch(`${API_BASE_URL}/area`);
  if (!res.ok) throw new Error("Failed to fetch areas");
  const json = await res.json();
  return json.data;
}

export async function deleteAreaById(id: number) {
  const res = await fetch(`${API_BASE_URL}/area/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to delete area: ${errText}`);
  }

  return await res.json(); // { success: true, message: "Area deleted successfully" }
}

