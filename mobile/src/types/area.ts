export type DataForm = {
  fieldId: number;
  fieldName: string;
  response: string;
};

export type action = {
  service_name: string;
  name: string;
  datas_form: DataForm[];
};

export type trigger = {
  reactionChosenId: number;
  service_name: string;
  name: string;
  datas_form: DataForm[];
};

export type AreaConfig = {
  name: string;
  trigger: trigger;
  actions: action[];
};

export type Area = {
  id: number;
  user_id: number;
  action_id: number;
  reaction_ids: number[];
  config: AreaConfig;
  is_active: boolean;
  created_at: Date;
};
