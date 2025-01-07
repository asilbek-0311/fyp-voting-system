import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface PollRowProps {
  pollId: bigint;
}

const PollRow: React.FC<PollRowProps> = ({ pollId }) => {
  const router = useRouter();
  const [pollDetails, setPollDetails] = useState<any | null>(null);

  const { data: poll } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "getPollById",
    args: [pollId],
  });

  useEffect(() => {
    if (poll) {
      const isActive = poll.endTime > Math.floor(Date.now() / 1000);
      setPollDetails({
        id: pollId.toString(),
        name: poll.name || "Untitled Poll",
        status: isActive ? "Active" : "Ended",
      });
    }
  }, [poll]);

  return (
    <tr>
      <td>{pollDetails?.id}</td>
      <td>{pollDetails?.name}</td>
      <td>{pollDetails?.status}</td>
      <td>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => router.push(`/poll/${pollId.toString()}`)}
        >
          View Results
        </button>
      </td>
    </tr>
  );
};

export default PollRow;
