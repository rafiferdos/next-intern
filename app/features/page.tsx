import { Button } from "@nextui-org/button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next Intern | Features",
    description: 'Features of Next Intern including intern/job search, intern/job application, and more',
  };

const page = () => {
    return (
        <div>
            <h1>Features Page</h1>
            <Button color="secondary" variant="shadow">View featues</Button>
        </div>
    );
};

export default page;