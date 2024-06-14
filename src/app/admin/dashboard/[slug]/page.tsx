"use client";

import { useParams } from "next/navigation";

const TableInfo = ({}) => {
  const {slug} = useParams()
  console.log(slug, "thme")
  
  return (
    <div>
      <h1>Hello World</h1>
      {/* {theme && <p>Slug: {theme}</p>} */}
    </div>
  );
};

export default TableInfo;
