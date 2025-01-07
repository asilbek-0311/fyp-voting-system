"use client";

import React from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import PollRow from "./PollRow";

const Dashboard: React.FC = () => {
  const { address } = useAccount();
  
  const { data: pollIds = [], isLoading: isPollsLoading } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "getPollsByCreator",
    args: [address],
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Polls</h2>
      {isPollsLoading ? (
        <p>Loading polls...</p>
      ) : pollIds?.length > 0 ? (
        <table className="table w-full border bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th>Poll ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pollIds.map((pollId: bigint) => (
              <PollRow key={pollId.toString()} pollId={pollId} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No polls found.</p>
      )}
    </div>
  );
};

export default Dashboard;
