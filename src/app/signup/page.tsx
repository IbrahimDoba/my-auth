import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import RegisterFrom from "../components/RegisterForm";



export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");


  return <RegisterFrom />;
}
