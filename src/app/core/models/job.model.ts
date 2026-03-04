import { JobCategory } from "../enums/job-category.enum";
import { JobStatus } from "../enums/job-status.enum";

export interface Job {
  id: number;
  title: string;
  description: string;
  budget: number;
  category: JobCategory;
  status: JobStatus;
  owner_id?: number;
  freelancer_id?: number;

  owner?: {
    id: number;
    username: string;
    name?: string;
    rating_avg?: number;
  }

  freelancer?: {
    id: number;
    username: string;
    name?: string;
    rating_avg?: number;
  }
}