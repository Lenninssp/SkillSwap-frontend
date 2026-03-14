import { JobCategory } from "../enums/job-category.enum";
import { JobStatus } from "../enums/job-status.enum";

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: JobStatus;
  owner_id?: string;
  freelancer_id?: string;

  owner?: {
    id: string;
    username: string;
    name?: string;
    rating_avg?: number;
  }

  freelancer?: {
    id: string;
    username: string;
    name?: string;
    rating_avg?: number;
  }

  reviews?: any[];
}
