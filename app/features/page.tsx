import { Button } from "@nextui-org/button";

export const metadata: Metadata = {
    title: "Next Intern | Features",
    description: 'Features of Next Intern including intern/job search, intern/job application, and more',
  };

const page = () => {
    return (
        <div>
            <h1>Features Page</h1>
            <Button color="secondary" variant="flat">View featues</Button>
        </div>
    );
};

export default page;