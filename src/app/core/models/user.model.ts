export interface User {
  id: number;
  name: string;
  username: string;
  email?: string;
  bio?: string;
  skills: string[];
  rating_avg?: number;
  completed_jobs?: number;
  //asd
}