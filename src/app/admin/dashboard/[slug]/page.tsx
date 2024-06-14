"use client";

import Table from "components/Table";
import { ProfileContext } from "context/ProfileContext";
import { Giveaway, Winner } from "interface/interface";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const TableInfo: React.FC = () => {
  const { slug } = useParams();
  const parsedSlug = Array.isArray(slug) ? slug[0] : slug;
  const headings = ["name", "prize"];
  const [data, setData] = useState<Giveaway | null>(null);

  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("Profile must be within a ProfileProvider");
  }

  useEffect(() => {
    if (parsedSlug) {
      const { profile } = context;
      const index = parseInt(parsedSlug, 10);
      const reversedGiveaways = [...(profile?.giveaways ?? [])].reverse();
      const structured = reversedGiveaways[index] ?? null;
      setData(structured);
    }
  }, [parsedSlug, context]);

  const winners =
    data?.winners.map((winner: Winner) => ({
      name: winner.name,
      prize: winner.prize,
    })) ?? [];

  return (
    <div>
      <div className="p-10">
        <h2 className="text-[2rem]">{data?.title}</h2>
        <Table headings={headings} data={winners} />
      </div>
    </div>
  );
};

export default TableInfo;
