import React, { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface PollRowProps {
  pollId: bigint;
  onViewResults: (pollId: bigint) => void;
}

const PollRow: React.FC<PollRowProps> = ({ pollId, onViewResults }) => {
  const [pollDetails, setPollDetails] = useState<any | null>(null);

  // Fetch poll details using the poll ID
  const { data: poll } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "getPollById",
    args: [pollId],
  });

  useEffect(() => {
    if (poll) {
      const isActive = poll.endTime > Math.floor(Date.now() / 1000); // Check if the poll is active
      setPollDetails({
        id: pollId,
        name: poll.name,
        status: isActive ? "Active" : "Ended",
      });
    }
  }, [poll, pollId]);

  if (!pollDetails) return null;

  return (
    <tr>
      <td>{pollDetails.id}</td>
      <td>{pollDetails.name}</td>
      <td>{pollDetails.status}</td>
      <td>
        <button onClick={() => onViewResults(pollId)}>View Results</button>
      </td>
    </tr>
  );
};

export default PollRow;
