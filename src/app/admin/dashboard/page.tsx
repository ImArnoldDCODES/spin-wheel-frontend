"use client";
import CreateModal from "components/CreateModal";
import Navbar from "components/Navbar";
import { TableRow, User } from "interface/interface";
import { useEffect, useState } from "react";
import useaxios from "../../../../axios";

export default function Index() {
  const [profile, setProfile] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tableData: TableRow[] = [
    { name: "$20 Wheel", date: "2024-05-17", number: 1 },
    { name: "Random Stuff", date: "2024-05-16", number: 2 },
    { name: "Twitter Giveaway", date: "2024-05-15", number: 3 },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    useaxios
      .get("/profile", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((data: { data: User}) => setProfile(data.data));
  }, []);

  return (
    <main className="flex h-screen w-screen border-2 border-[#000]">
      <Navbar />
      <div className="w-[80%] h-[full] relative">
        <div className="flex">
        <CreateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        </div>
        <div className="flex items-center justify-between my-5 px-8">
          <h1 className="text-[3rem] text-center">Dashboard</h1>
          <h2 className="text-center">
            Welcome back, <span className="uppercase">{profile?.name}</span>
          </h2>
        </div>
        <div className="ml-10 flex gap-10">
          <div className="rounded-lg pl-4 w-[12rem] h-[8rem] bg-[#F5F5F5] flex flex-col">
            <h1 className="text-[3rem] font-bold">18</h1>
            <p className="text-[1.5rem] ml-2">Wheels</p>
          </div>
          <div
            className="rounded-lg flex w-[12rem] h-[8rem] bg-[#F5F5F5] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <h1 className="m-auto text-[2rem]">Create</h1>
          </div>
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