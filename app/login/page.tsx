import { LockKeyholeIcon } from "lucide-react";
import Link from "next/link";
import Form from "@/components/Form";
import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

const LoginPage = () => {
	return (
		<div className="flex h-screen justify-center items-center">
			<Card className="z-10 max-w-md w-full overflow-hidden rounded-2xl shadow-xl">
				<div className="flex flex-col items-center justify-center space-y-3 py-6 text-center sm:px-16">
					<Link href={"/"}>
						<LockKeyholeIcon className="h-10 w-10" />
					</Link>
					<h3 className="text-xl font-semibold">Login</h3>
					<p className="text-sm">
						Sign in with your email and password
					</p>
				</div>
				<Divider className="my-4" />
				<Form type="login" />
			</Card>
		</div>
	);
};
export default LoginPage;