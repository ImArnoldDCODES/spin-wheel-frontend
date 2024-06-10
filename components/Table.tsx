'use client'
import React, { useState } from 'react'
import { TableProps } from '@/interface/interface';

const Table: React.FC<TableProps> = ({ headings, data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const nbPerPage = 5;
  const lastIndex = currentPage * nbPerPage;
  const startIndex = lastIndex - nbPerPage;
  const numberOfPages = Math.ceil(data.length / nbPerPage);
  const records = data.slice(startIndex, lastIndex);

  return (
    <div>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            {headings.map((h, i) => (
              <th key={i} className="bg-gray-200 capitalize py-2 text-start">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i} className={`${i % 2 !== 0 && 'bg-gray-200'} text-syart capitalize cursor-pointer`}>
              <td>{d.title}</td>
              <td>{d.date}</td>
              <td>{d.winners.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex flex-row items-center pt-5">
        <div className="flex flex-row items-center gap-4">
          <span className="cursor-pointer font-semibold" onClick={prevPage}>prev</span>
          <div className="flex flex-row items-center">
            <span>{currentPage}</span>
            <span>/</span>
            <span>{numberOfPages}</span>
          </div>
          <span className="cursor-pointer font-semibold" onClick={nextPage}>next</span>
        </div>
      </div>
    </div>
  );

  function nextPage() {
    if (currentPage !== numberOfPages) {
      setCurrentPage(prev => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(prev => prev - 1);
    }
  }
};

export default Table;
