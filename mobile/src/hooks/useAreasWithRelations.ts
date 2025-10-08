import { useMemo, useState, useEffect } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getAreas } from "@/src/api/area";
import { getActionById } from "@/src/api/action";
import { getReactionById } from "@/src/api/reaction";
import { getServiceById } from "@/src/api/service";
import Area from "@/src/types/area";
import { SearchModuleValues } from "@/src/components/tabs/dashboard/searchModule";

type UseAreasWithRelationsProps = {
  filters?: SearchModuleValues;
};

/**
 * This hooks is used to fetch & filter areas depending on SearchModuleValues
 * It also gives access to arrays of the childs actions, reactions & services of said area(s)
 */
export function useAreasWithRelations({ filters }: UseAreasWithRelationsProps) {
  const {
    data: areas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
  });

  // Create sets of unique actions/reactions ids to avoid duplicating fetches
  const uniqueActionIds = useMemo(
    () => [...new Set(areas?.map((a) => a.action_id) ?? [])],
    [areas],
  );
  const uniqueReactionIds = useMemo(
    () => [...new Set(areas?.map((a) => a.reaction_id) ?? [])],
    [areas],
  );

  // Fetch them from the api
  const actionQueries = useQueries({
    queries: useMemo(
      () =>
        uniqueActionIds.map((id) => ({
          queryKey: ["action", id],
          queryFn: () => getActionById(id),
          enabled: !!areas,
        })),
      [uniqueActionIds, areas],
    ),
  });

  const reactionQueries = useQueries({
    queries: useMemo(
      () =>
        uniqueReactionIds.map((id) => ({
          queryKey: ["reaction", id],
          queryFn: () => getReactionById(id),
          enabled: !!areas,
        })),
      [uniqueReactionIds, areas],
    ),
  });

  const actions = actionQueries.map((q) => q.data).filter(Boolean);
  const reactions = reactionQueries.map((q) => q.data).filter(Boolean);

  // Create a set of unique services ids referenced in the actions & reactions
  const uniqueServiceIds = useMemo(() => {
    const actionServiceIds = actions
      .map((a) => a?.service_id)
      .filter(Boolean) as number[];
    const reactionServiceIds = reactions
      .map((r) => r?.service_id)
      .filter(Boolean) as number[];
    return [...new Set([...actionServiceIds, ...reactionServiceIds])];
  }, [actions, reactions]);

  // Fetch all previously listed services
  const serviceQueries = useQueries({
    queries: useMemo(
      () =>
        uniqueServiceIds.map((id) => ({
          queryKey: ["service", id],
          queryFn: () => getServiceById(id),
          enabled: uniqueServiceIds.length > 0,
        })),
      [uniqueServiceIds],
    ),
  });

  // Throw away errors & hanging results
  const services = serviceQueries.map((q) => q.data).filter(Boolean);

  const [filteredAreas, setFilteredAreas] = useState<Area[]>(areas ?? []);

  // Update filteredAreas
  useEffect(() => {
    if (!areas) setFilteredAreas([]);

    console.log(filters);
    const updated = areas?.filter((area) => {
      let matches = true;

      if (filters?.query) {
        matches =
          matches && area.id.toString().includes(filters.query.toLowerCase());
      }

      if (filters?.service) {
        // retreive action & reaction linked to the area
        const action = actions.find((a) => a?.id === area.action_id);
        const reaction = reactions.find((r) => r?.id === area.reaction_id);

        // retreive services linked to the found action & reaction
        const actionService = services.find(
          (s) => s?.id === action?.service_id,
        );
        const reactionService = services.find(
          (s) => s?.id === reaction?.service_id,
        );

        matches =
          matches &&
          (actionService?.name === filters.service ||
            reactionService?.name === filters.service);
      }

      if (filters?.status !== undefined) {
        matches =
          matches &&
          (filters.status === undefined || area.is_active === filters.status);
      }

      return matches;
    });

    // Prevent unnecessary state updates
    setFilteredAreas((prev) =>
      JSON.stringify(prev) === JSON.stringify(updated ?? [])
        ? prev
        : (updated ?? []),
    );
  }, [actions, areas, reactions, filters, services]);

  return {
    areas,
    actions,
    reactions,
    services,
    filteredAreas,
    isLoading,
    error,
  };
}
