import { unstable_getServerSession } from "next-auth";
import "../styles/globals.css";
import Providers from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = unstable_getServerSession();
  return (
    <html className="bg-black">
      <head />
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
