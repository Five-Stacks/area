type Area = {
  id: number;
  user_id: number;
  action_id: number;
  reaction_ids: number[];
  config: Record<string, any>;
  is_active: boolean;
  created_at: Date;
};

export default Area;
