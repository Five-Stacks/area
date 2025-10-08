import { useQuery, useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAreas } from "@/src/api/area";
import { getActionById } from "@/src/api/action";
import { getReactionById } from "@/src/api/reaction";
import { getServices } from "@/src/api/service";
import type { EnrichedArea } from "@/src/types/area";
import { Action } from "../types/action";
import { Reaction } from "../types/reaction";

/**
 * This hook fetches all areas & services and then packages them under EnrichedAreas.
 */
export function useEnrichedAreas(): {
  enrichedAreas: EnrichedArea[];
  isLoading: boolean;
  error: Error | null;
} {
  // Base areas
  const {
    data: areas,
    isLoading: isAreasLoading,
    error: areasError,
  } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
  });

  // Fetch all services (used for linking)
  const {
    data: services,
    isLoading: isServicesLoading,
    error: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  // Extract unique actions & reactions ids
  const uniqueActionIds = useMemo(
    () => [...new Set(areas?.map((a) => a.action_id) ?? [])],
    [areas],
  );
  const uniqueReactionIds = useMemo(
    () => [...new Set(areas?.map((a) => a.reaction_id) ?? [])],
    [areas],
  );

  // Fetch actions and reactions
  const actionQueries = useQueries({
    queries: uniqueActionIds.map((id) => ({
      queryKey: ["action", id],
      queryFn: () => getActionById(id),
      enabled: !!areas,
    })),
  });

  const reactionQueries = useQueries({
    queries: uniqueReactionIds.map((id) => ({
      queryKey: ["reaction", id],
      queryFn: () => getReactionById(id),
      enabled: !!areas,
    })),
  });

  // Aggregate all states
  const actionsLoading = actionQueries.some((q) => q.isLoading);
  const reactionsLoading = reactionQueries.some((q) => q.isLoading);
  const actionsError = actionQueries.find((q) => q.error)?.error ?? null;
  const reactionsError = reactionQueries.find((q) => q.error)?.error ?? null;

  // Combine everything into one state
  const isLoading =
    isAreasLoading || isServicesLoading || actionsLoading || reactionsLoading;
  const error = areasError || servicesError || actionsError || reactionsError;

  // Get rid of all actions & reactions wich are malformed
  const actions = actionQueries.map((q) => q.data).filter(Boolean) as Action[];
  const reactions = reactionQueries
    .map((q) => q.data)
    .filter(Boolean) as Reaction[];

  // Combine all data into enriched areas
  const enrichedAreas: EnrichedArea[] = useMemo(() => {
    if (!areas || !services) return [];

    return areas.map((area) => {
      const action = actions.find((a) => a?.id === area.action_id);
      const reaction = reactions.find((r) => r?.id === area.reaction_id);
      const actionService = services.find((s) => s.id === action?.service_id);
      const reactionService = services.find(
        (s) => s.id === reaction?.service_id,
      );

      // Skip if any related info isn't ready yet
      if (!action || !reaction || !actionService || !reactionService) {
        return null;
      }

      return {
        ...area,
        action: action,
        reaction: reaction,
        actionService: actionService,
        reactionService: reactionService,
      };
    });
  }, [areas, actions, reactions, services]);

  return { enrichedAreas, isLoading, error };
}
