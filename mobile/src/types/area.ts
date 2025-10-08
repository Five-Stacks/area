import { Action } from "./action";
import { Reaction } from "./reaction";
import { Service } from "./service";

export type Area = {
  id: number;
  user_id: number;
  action_id: number;
  reaction_id: number;
  config: Record<string, any>;
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
