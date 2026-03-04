export interface Proposal {
  id: number;
  job_id: number;
  user_id: number;

  price: number;
  cover_letter?: string;
  message?: string;

  status?: 'pending' | 'accepted' | 'rejected';

  bidder?: {
    id: number;
    username: string;
    name?: string;
    rating_avg?: number;
  }
}