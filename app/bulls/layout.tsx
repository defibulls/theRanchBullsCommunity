import "../../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-black scrollbar-thin text-white scrollbar-thumb-purple-600 scrollbar-thumb-rounded-xl">
      <head />
      <body className="bg-black scrollbar-thin text-white scrollbar-thumb-purple-600 scrollbar-thumb-rounded-xl">
        {children}
      </body>
    </html>
  );
}
