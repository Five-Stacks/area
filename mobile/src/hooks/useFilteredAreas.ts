import { useMemo, useState } from "react";
import { useEnrichedAreas } from "./useEnrichedAreas";
import type { SearchModuleValues } from "@/src/components/tabs/dashboard/searchModule";
import type { EnrichedArea } from "@/src/types/area";

export function useFilteredAreas(): {
  filteredAreas: EnrichedArea[];
  setFilters: React.Dispatch<
    React.SetStateAction<SearchModuleValues | undefined>
  >;
  isLoading: boolean;
  error: Error | null;
} {
  const { enrichedAreas, isLoading, error } = useEnrichedAreas();
  const [filters, setFilters] = useState<SearchModuleValues>();

  const filteredAreas = useMemo(() => {
    if (!filters) return enrichedAreas;

    return enrichedAreas.filter((area) => {
      let matches = true;

      if (filters.query) {
        matches =
          matches && area.id.toString().includes(filters.query.toLowerCase());
      }

      if (filters.service) {
        matches =
          matches &&
          (area.actionService.name === filters.service ||
            area.reactionService.name === filters.service);
      }

      if (filters.status !== undefined) {
        matches = matches && area.is_active === filters.status;
      }

      return matches;
    });
  }, [enrichedAreas, filters]);

  return { filteredAreas, setFilters, isLoading, error };
}
