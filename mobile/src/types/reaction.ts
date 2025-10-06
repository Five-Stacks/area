type Reaction = {
  id: number;
  service_id: number;
  name: string;
  description: string;
  config: Record<string, any>;
};

export default Reaction;
