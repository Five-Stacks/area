import React, { useCallback, useEffect } from "react";
import { Service } from "../types/service";
import { Action } from "../types/action";
import { Reaction } from "../types/reaction";
import { Area } from "../types/area";
import { useQueryClient } from "@tanstack/react-query";
import { getServices } from "../api/service";
import { getActions } from "../api/action";
import { getReactions } from "../api/reaction";
import { createArea, deleteAreaById, getAreas, updateArea } from "../api/area";

export type GlobalData = {
  services: Service[];
  actions: Action[];
  reactions: Reaction[];
  areas: Area[];

  // Loading states
  isLoading: boolean;
  isServicesLoading: boolean;
  isActionsLoading: boolean;
  isReactionsLoading: boolean;
  isAreasLoading: boolean;

  // Error states
  error: string | null;
  servicesError: string | null;
  actionsError: string | null;
  reactionsError: string | null;
  areasError: string | null;

  refreshAll: () => Promise<void>;
  refreshServices: () => Promise<void>;
  refreshActions: () => Promise<void>;
  refreshReactions: () => Promise<void>;
  refreshAreas: () => Promise<void>;

  updateArea: (area: Area) => void;
  deleteArea: (areaId: number) => void;
};

export const GlobalDataContext = React.createContext<GlobalData>({
  services: [],
  actions: [],
  reactions: [],
  areas: [],

  isLoading: false,
  isServicesLoading: false,
  isActionsLoading: false,
  isReactionsLoading: false,
  isAreasLoading: false,

  error: null,
  servicesError: null,
  actionsError: null,
  reactionsError: null,
  areasError: null,

  refreshAll: async () => {},
  refreshServices: async () => {},
  refreshActions: async () => {},
  refreshReactions: async () => {},
  refreshAreas: async () => {},

  updateArea: (area: Area) => {},
  deleteArea: (areaId: number) => {},
});

export type GlobalDataProviderProps = {
  children: React.ReactNode;
};

export const GlobalDataProvider = ({ children }: GlobalDataProviderProps) => {
  const queryClient = useQueryClient();

  // Data states
  const [services, setServices] = React.useState<Service[]>([]);
  const [actions, setActions] = React.useState<Action[]>([]);
  const [reactions, setReactions] = React.useState<Reaction[]>([]);
  const [areas, setAreas] = React.useState<Area[]>([]);

  // Loading states
  const [isServicesLoading, setIsServicesLoading] = React.useState(false);
  const [isActionsLoading, setIsActionsLoading] = React.useState(false);
  const [isReactionsLoading, setIsReactionsLoading] = React.useState(false);
  const [isAreasLoading, setIsAreasLoading] = React.useState(false);

  // Error states
  const [servicesError, setServicesError] = React.useState<string | null>(null);
  const [actionsError, setActionsError] = React.useState<string | null>(null);
  const [reactionsError, setReactionsError] = React.useState<string | null>(
    null,
  );
  const [areasError, setAreasError] = React.useState<string | null>(null);

  // Combined loading state
  const isLoading =
    isServicesLoading ||
    isActionsLoading ||
    isReactionsLoading ||
    isAreasLoading;

  // Combined error state (first non-null error)
  const error = servicesError || actionsError || reactionsError || areasError;

  const loadServices = useCallback(async () => {
    setIsServicesLoading(true);
    setServicesError(null);
    try {
      const servicesData = await queryClient.fetchQuery({
        queryKey: ["services"],
        queryFn: getServices,
      });
      setServices(servicesData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load services";
      setServicesError(errorMessage);
    } finally {
      setIsServicesLoading(false);
    }
  }, [queryClient]);

  const loadActions = useCallback(async () => {
    setIsActionsLoading(true);
    setActionsError(null);
    try {
      const actionsData = await queryClient.fetchQuery({
        queryKey: ["actions"],
        queryFn: getActions,
      });
      setActions(actionsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load actions";
      setActionsError(errorMessage);
    } finally {
      setIsActionsLoading(false);
    }
  }, [queryClient]);

  const loadReactions = useCallback(async () => {
    setIsReactionsLoading(true);
    setReactionsError(null);
    try {
      const reactionsData = await queryClient.fetchQuery({
        queryKey: ["reactions"],
        queryFn: getReactions,
      });
      setReactions(reactionsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load reactions";
      setReactionsError(errorMessage);
    } finally {
      setIsReactionsLoading(false);
    }
  }, [queryClient]);

  const loadAreas = useCallback(async () => {
    setIsAreasLoading(true);
    setAreasError(null);
    try {
      const areasData = await queryClient.fetchQuery({
        queryKey: ["areas"],
        queryFn: getAreas,
      });
      setAreas(areasData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load areas";
      setAreasError(errorMessage);
    } finally {
      setIsAreasLoading(false);
    }
  }, [queryClient]);

  const refreshServices = useCallback(async () => {
    await loadServices();
    setServices((prev) => prev.sort((a, b) => a.id - b.id));
  }, [loadServices]);

  const refreshActions = useCallback(async () => {
    await loadActions();
    setActions((prev) => prev.sort((a, b) => a.id - b.id));
  }, [loadActions]);

  const refreshReactions = useCallback(async () => {
    await loadReactions();
    setReactions((prev) => prev.sort((a, b) => a.id - b.id));
  }, [loadReactions]);

  const refreshAreas = useCallback(async () => {
    await loadAreas();
    setAreas((prev) =>
      prev.sort((a, b) => a.created_at.getTime() - b.created_at.getTime()),
    );
  }, [loadAreas]);

  const refreshAll = useCallback(async () => {
    await Promise.all([
      loadServices(),
      loadActions(),
      loadReactions(),
      loadAreas(),
    ]);
  }, [loadServices, loadActions, loadReactions, loadAreas]);

  // Load all data on mount
  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const updateArea_ = useCallback(
    (area: Area) => {
      // Update locale area states
      setAreas((prev) =>
        prev.map((a) => (a.id === area.id ? { ...a, ...area } : a)),
      );

      // Send update to server
      if (areas.find((s) => s.id === area.id)) {
        updateArea(area);
      } else {
        createArea(area);
      }
    },
    [areas],
  );

  const deleteArea = useCallback((areaId: number) => {
    // Delete the area locally
    setAreas((prev) => prev.filter((area) => area.id !== areaId));

    // Delete the area on the server
    deleteAreaById(areaId);
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{
        services,
        actions,
        reactions,
        areas,

        isLoading,
        isServicesLoading,
        isActionsLoading,
        isReactionsLoading,
        isAreasLoading,

        error,
        servicesError,
        actionsError,
        reactionsError,
        areasError,

        refreshAll,
        refreshServices,
        refreshActions,
        refreshReactions,
        refreshAreas,
        updateArea: updateArea_,
        deleteArea,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
