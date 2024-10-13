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
  appliedAt: Date;
  postID: number;
  post: Post;
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

interface Post {
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

const JobsInterns = () => {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ["jobs-interns"],
    queryFn: fetchAllPosts,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center gap-4 h-96">
        <Spinner color="success" />
      </div>
    );

  if (error instanceof Error) return <p>Error: {error.message}</p>;
    console.log(data);
  return (
    <div>
      {data?.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.position}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default JobsInterns;
