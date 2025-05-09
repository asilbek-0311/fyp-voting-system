"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";

const Home: NextPage = () => {

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-6">Poll Management</h1>
          <div className="flex flex-col space-y-4">
            <Link href="/create-poll">
              <button className="btn">Create Poll</button>
            </Link>
            <Link href="/vote-poll">
              <button className="btn">Vote on Poll</button>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
