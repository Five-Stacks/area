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
  }[];
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
