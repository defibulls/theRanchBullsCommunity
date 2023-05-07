import { getSession } from "next-auth/react";
import { Providers } from "../components/Providers";
import "../styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html className="bg-black">
      <head />
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
