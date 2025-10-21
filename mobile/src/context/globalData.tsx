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

  refreshAll: () => Promise<void>;
  refreshServices: () => Promise<void>;
  refreshActions: () => Promise<void>;
  refreshReactions: () => Promise<void>;
  refreshAreas: () => Promise<void>;

  updateArea: (area: Area) => void;

  deleteArea?: (areaId: number) => void;
};

const GlobalDataContext = React.createContext<GlobalData>({
  services: [],
  actions: [],
  reactions: [],
  areas: [],

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

  const [services, setServices] = React.useState<Service[]>([]);
  const [actions, setActions] = React.useState<Action[]>([]);
  const [reactions, setReactions] = React.useState<Reaction[]>([]);
  const [areas, setAreas] = React.useState<Area[]>([]);

  const loadServices = useCallback(async () => {
    const servicesData = await queryClient.fetchQuery({
      queryKey: ["services"],
      queryFn: getServices,
    });

    setServices(servicesData);
  }, [queryClient]);

  const loadActions = useCallback(async () => {
    const actionsData = await queryClient.fetchQuery({
      queryKey: ["actions"],
      queryFn: getActions,
    });

    setActions(actionsData);
  }, [queryClient]);

  const loadReactions = useCallback(async () => {
    const reactionsData = await queryClient.fetchQuery({
      queryKey: ["reactions"],
      queryFn: getReactions,
    });

    setReactions(reactionsData);
  }, [queryClient]);

  const loadAreas = useCallback(async () => {
    const areasData = await queryClient.fetchQuery({
      queryKey: ["areas"],
      queryFn: getAreas,
    });

    setAreas(areasData);
  }, [queryClient]);

  const refreshServices = async () => {
    await loadServices();
  };

  const refreshActions = async () => {
    await loadActions();
  };

  const refreshReactions = async () => {
    await loadReactions();
  };

  const refreshAreas = async () => {
    await loadAreas();
  };

  const refreshAll = async () => {
    await Promise.all([
      loadServices(),
      loadActions(),
      loadReactions(),
      loadAreas(),
    ]);
  };

  // Load all data on mount
  useEffect(() => {
    loadServices();
    loadActions();
    loadReactions();
    loadAreas();
  }, [loadServices, loadActions, loadReactions, loadAreas]);

  const updateArea_ = (area: Area) => {
    if (areas.find((s) => s.id === area.id)) {
      updateArea(area);
      refreshAreas();
    } else {
      createArea(area);
      refreshAreas();
    }
  };

  const deleteArea = (areaId: number) => {
    deleteAreaById(areaId);
    refreshAreas();
  };

  return (
    <GlobalDataContext.Provider
      value={{
        services,
        actions,
        reactions,
        areas,
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
