import "../../styles/globals.css";
import Header from "../Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-black scrollbar-thin scrollbar-thumb-purple-600 scrollbar-thumb-rounded-xl">
      <head />
      <body className="">
        <Header />
        {children}
      </body>
    </html>
  );
}
