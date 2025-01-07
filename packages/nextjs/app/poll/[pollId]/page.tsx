"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const PollResults: React.FC = () => {
  const { pollId } = useParams();
  const bigIntPollId = BigInt(Array.isArray(pollId) ? pollId[0] : pollId); // Convert string to bigint
  const [pollDetails, setPollDetails] = useState<any | null>(null);
  const [voteCounts, setVoteCounts] = useState<number[] | null>(null);

  const { data: poll } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "getPollById",
    args: [bigIntPollId],
  });

  const { data: counts } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "getVoteCounts",
    args: [bigIntPollId],
  });

  useEffect(() => {
    if (poll) {
      setPollDetails({
        id: pollId,
        name: poll.name,
        prompt: poll.prompt,
        options: poll.options,
      });
    }

    if (counts) {
      setVoteCounts(counts.map(count => Number(count)));
    }
  }, [poll, counts]);

  if (!pollDetails) {
    return <p>Loading poll details...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold">{pollDetails.name}</h2>
      <p>{pollDetails.prompt}</p>
      <p>Poll ID: {pollDetails.id}</p>

      <h3 className="mt-6 text-2xl font-semibold">Options:</h3>
      <ul>
        {pollDetails.options.map((option: string, index: number) => (
          <li key={index} className="flex justify-between bg-white p-2 shadow rounded mb-2">
            <span>{option}</span>
            <span className="font-bold text-blue-600">
              {voteCounts ? voteCounts[index] : 0} votes
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollResults;
