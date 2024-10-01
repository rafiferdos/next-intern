"use client";

import { fetchAllPosts } from "@/lib/fetchAllPosts";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/spinner";

enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  INTERNSHIP = "INTERNSHIP",
  CONTRACT = "CONTRACT",
  FREELANCE = "FREELANCE",
}

enum JobStatus {
    ACTIVE = "ACTIVE",
    CLOSED = "CLOSED",
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
  jobId?: number;
  Job?: Job;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}

interface Job {
  id: number;
  position: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  location: string;
  jobType: JobType;
  salary?: number;
  hiringManager: string;
  companyName: string;
  applicationUrl?: string;
  applicants: Applicant[];
  skillsRequired: string[];
  status: JobStatus;
  userId?: number;
  User?: User;
}

// Assuming JobType, JobStatus, Applicant, and User are defined elsewhere in your codebase

const JobsInterns = () => {
  const { data, error, isLoading } = useQuery<Job[]>({
    queryKey: ["jobs-interns"],
    queryFn: fetchAllPosts,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center gap-4">
        <Spinner color="success" />
      </div>
    );
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.map((job: Job) => (
        <div key={job.id}>
          <h2>{job.position}</h2>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default JobsInterns;
