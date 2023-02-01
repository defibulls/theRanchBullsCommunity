import { unstable_getServerSession } from "next-auth";
import "../../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = unstable_getServerSession();
  return (
    <html className="bg-black">
      <head />
      <body>{children}</body>
    </html>
  );
}
