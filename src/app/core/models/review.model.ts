export interface Review {
  id: number;
  job_id: number;

  reviewer_id: number;
  target_id: number;

  rating: number;
  comment?: string;

  created_at?: string;

  reviewer?: {
    id: number;
    name: string;
    username: string;
  };
  job?: {
    id: number;
    title: string;
  };
}
