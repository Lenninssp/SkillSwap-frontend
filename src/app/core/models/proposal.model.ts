export interface Proposal {
  id: string;
  job_id: string;
  freelancer_id: string;

  price: number;
  cover_letter?: string;
  message?: string;

  status?: 'pending' | 'accepted' | 'rejected';

  bidder?: {
    id: string;
    username: string;
    name?: string;
    rating_avg?: number;
  }
}