"use client";
import { Toaster } from "react-hot-toast";
import { useEffect, useContext } from "react";
import "../../styles/globals.css";
import Header from "../Header";
import { ContractContext } from "../../context/ContractContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleShow } = useContext(ContractContext);

  useEffect(() => {
    handleShow(true);
  }, []);
  return (
    <html className="bg-black scrollbar-thin text-white scrollbar-thumb-purple-600 scrollbar-thumb-rounded-xl">
      <head />
      <body className="bg-black scrollbar-thin text-white scrollbar-thumb-purple-600 scrollbar-thumb-rounded-xl">
        <Header notLanding={true} />
        {children}
        <Toaster
          toastOptions={{
            style: {
              background: "#9E23A3",
              borderRadius: "25px",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
