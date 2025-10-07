import Area from "@/src/types/area";
import API_BASE_URL from "./serverAdress";

export async function getAreas(): Promise<Area[]> {
  const res = await fetch(`${API_BASE_URL}/area`);
  if (!res.ok) throw new Error("Failed to fetch areas");
  const json = await res.json();
  return json.data;
}
