import React, { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface VoteResultsModalProps {
  pollId: bigint;
  onClose: () => void;
}

const VoteResultsModal: React.FC<VoteResultsModalProps> = ({ pollId, onClose }) => {
  const [voteCounts, setVoteCounts] = useState<bigint[] | null>(null);

  // Fetch vote counts using the poll ID
  const { data: counts } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "getVoteCounts",
    args: [pollId],
  });

  useEffect(() => {
    if (counts) {
      setVoteCounts([...counts]);
    }
  }, [counts]);

  return (
    <div className="modal">
      <h3>Results for Poll {pollId}</h3>
      {voteCounts ? (
        <ul>
          {voteCounts.map((count, index) => (
            <li key={index}>
              Option {index + 1}: {count} votes
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading results...</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default VoteResultsModal;
