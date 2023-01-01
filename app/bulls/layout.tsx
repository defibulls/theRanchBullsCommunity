"use client";

import "../../styles/globals.css";
import Header from "../Header";
import { motion } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-black scrollbar-thin scrollbar-thumb-purple-600 scrollbar-thumb-rounded-xl">
      <head />
      <body className="">
        <motion.div
          variants={{
            hidden: {
              y: -800,
            },
            show: {
              y: 0,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 20,
              },
            },
            bye: {
              y: -800,
            },
          }}
        >
          <Header />
        </motion.div>
        {children}
      </body>
    </html>
  );
}
