import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "USER") {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>

      <Footer />
    </>
  );
}
