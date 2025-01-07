import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import PollRow from "./PollRow";
import VoteResultsModal from "./VoteResultsModal";

const Dashboard: React.FC = () => {
  const { address } = useAccount(); // Get the connected user's address
  const [selectedPollId, setSelectedPollId] = useState<bigint | null>(null);

  // Fetch poll IDs created by the user
  const { data: pollIds, isLoading: isPollsLoading } = useScaffoldReadContract({
    contractName: "Voting", // Contract name defined in hardhat config
    functionName: "getPollsByCreator",
    args: [address], // Pass the user's wallet address
  });

  const handleViewResults = (pollId: bigint) => {
    setSelectedPollId(pollId);
  };

  const handleModalClose = () => {
    setSelectedPollId(null);
  };

  return (
    <div>
      <h2>Your Polls</h2>
      {isPollsLoading ? (
        <p>Loading polls...</p>
      ) : pollIds && pollIds.length > 0 ? (
        <table>
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
              <PollRow
                key={pollId}
                pollId={pollId}
                onViewResults={handleViewResults}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No polls found.</p>
      )}

      {selectedPollId !== null && (
        <VoteResultsModal pollId={selectedPollId} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Dashboard;
