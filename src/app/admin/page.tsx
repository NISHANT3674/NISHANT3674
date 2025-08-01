import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import AdminPage from "./AdminClient";

export default async function AdminWrapper() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // Redirect to login page
  }

  return <AdminPage />;
}
