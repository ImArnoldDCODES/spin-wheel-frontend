"use client";
import React, { useContext } from "react";
import Navbar from "../../../../components/Navbar";
import { TableRow } from "../../../../interface/interface";
import { AuthContext } from "../../../../context/AuthContext";

export default function Index() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be within an AuthProvider");
  }

  const { user } = authContext;
  const tableData: TableRow[] = [
    { name: "$20 Wheel", date: "2024-05-17", number: 1 },
    { name: "Random Stuff", date: "2024-05-16", number: 2 },
    { name: "Twitter Giveaway", date: "2024-05-15", number: 3 },
  ];

  console.log(user)

  return (
    <main className="flex h-screen w-screen border-2 border-[#000]">
      <Navbar />
      <div className="w-[80%] h-[full]">
        <div>
          <h1 className="text-[3rem] m-10">Dashboard</h1>
          <h2>Welcome back, {user?.name}</h2>
        </div>
        <div className="ml-10 flex gap-10">
          <div className="rounded-lg pl-4 w-[12rem] h-[8rem] bg-[#F5F5F5] flex flex-col">
            <h1 className="text-[3rem] font-bold">18</h1>
            <p className="text-[1.5rem] ml-2">Wheels</p>
          </div>
          <div className="rounded-lg w-[12rem] h-[8rem] bg-[#F5F5F5]"></div>
          <div className="rounded-lg w-[12rem] h-[8rem] bg-[#F5F5F5]"></div>
        </div>
        <div className="p-10">
          <h2 className="text-[2rem]">Recents</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderRight: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    borderRight: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Date
                </th>
                <th style={{ padding: "8px", textAlign: "left" }}>Number</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {row.name}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid black",
                      borderBottom: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {row.date}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid black",
                      borderBottom: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {row.number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
