import { UserPlusIcon } from "lucide-react";
import Link from "next/link";
import Form from "@/components/Form";
import { Divider } from "@nextui-org/divider";

const RegisterPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="z-10 max-w-md w-full overflow-hidden rounded-2xl shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 py-6 text-center sm:px-16">
          <Link href={"/"}>
            <UserPlusIcon className="h-10 w-10" />
          </Link>
          <h3 className="text-xl font-semibold">Register</h3>
          <p className="text-sm">
            Create an account with your email and password
          </p>
        </div>
        <Divider className="my-4" />
        <Form type="register" />
      </div>
    </div>
  );
};
export default RegisterPage;
