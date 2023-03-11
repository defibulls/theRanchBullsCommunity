import { getServerSession } from "next-auth";
import { Providers } from "../../../components/Providers";
import "../../../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getServerSession();

  return (
    <html className="bg-black">
      <head />
      <body>{children}</body>
    </html>
  );
}
