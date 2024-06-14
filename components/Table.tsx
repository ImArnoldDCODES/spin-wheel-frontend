"use client";
import React, { useState } from "react";
import { TableProps } from "interface/interface";
import { useRouter } from "next/navigation";

const Table: React.FC<TableProps> = ({ headings, data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const nbPerPage = 5;
  const validData = Array.isArray(data) ? data : [];
  const reversedData = [...validData].reverse();
  const numberOfPages = Math.ceil(reversedData.length / nbPerPage);
  const lastIndex = currentPage * nbPerPage;
  const startIndex = lastIndex - nbPerPage;
  const records = reversedData.slice(startIndex, lastIndex);
  const router = useRouter();

  return (
    <div>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            {headings.map((h, i) => (
              <th key={i} className="bg-gray-200 capitalize py-2 text-start">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((d: any, i: any) => (
            <tr
              key={i}
              className={`${
                i % 2 !== 0 && "bg-gray-200"
              } text-syart capitalize cursor-pointer`}
              onClick={() => router.push(`/admin/dashboard/${startIndex + i}`)}
            >
              {d.title && <td>{d.title}</td>}
              {d.date && <td>{d.date.slice(0, 10)}</td>}
              {d.winners && <td>{d.winners.length}</td>}
              {d.name && <td>{d.name}</td>}
              {d.prize && <td>{d.prize}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex flex-row items-center pt-5">
        <div className="flex flex-row items-center gap-4">
          <span className="cursor-pointer font-semibold" onClick={prevPage}>
            prev
          </span>
          <div className="flex flex-row items-center">
            <span>{currentPage}</span>
            <span>/</span>
            <span>{numberOfPages}</span>
          </div>
          <span className="cursor-pointer font-semibold" onClick={nextPage}>
            next
          </span>
        </div>
      </div>
    </div>
  );

  function nextPage() {
    if (currentPage !== numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }
};

export default Table;
