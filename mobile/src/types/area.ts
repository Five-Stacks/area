import { Action } from "./action";
import { Reaction } from "./reaction";
import { Service } from "./service";

export type DataForm = {
  fieldId: number;
  fieldName: string;
  response: string;
};

export type AreaConfig = {
  name: string;
  trigger: {
    reactionChosenId: number;
    service_name: string;
    name: string;
    datas_form: DataForm[];
  };
  actions: {
    service_name: string;
    name: string;
    datas_form: DataForm[];
  };
};

export type Area = {
  id: number;
  user_id: number;
  action_id: number;
  reaction_id: number;
  config: AreaConfig;
  is_active: boolean;
  created_at: Date;
};

/** Same as Area type but with all of it's actions, reaction & services inside */
export type EnrichedArea = Area & {
  action: Action;
  reaction: Reaction;
  actionService: Service;
  reactionService: Service;
};
