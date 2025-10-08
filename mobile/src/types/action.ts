export type Action = {
  id: number;
  service_id: number;
  name: string;
  description: string;
  config: Record<string, any>;
};
