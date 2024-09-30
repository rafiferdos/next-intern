"use client"

import { fetchAllJobs } from "@/lib/fetchAllPosts";
import { useQuery } from "@tanstack/react-query";
import {Spinner} from "@nextui-org/spinner";

interface Job {
    id: string;
    title: string;
    description: string;
}

const JobsInterns = () => {
    const {data, error, isLoading} = useQuery<Job[]>({
        queryKey: ["jobs-interns"],
        queryFn: fetchAllJobs,
    })

    if (isLoading) return <div className="flex items-center justify-center gap-4"><Spinner color="success" /></div>
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {
                data?.map((job: Job) => (
                    <div key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default JobsInterns;