import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import blockchainContext from "../context/blockchainContext";
import Loader from "./Loader";

const Result = (props) => {
  const context = useContext(blockchainContext);
  const [waiting, setWaiting] = useState(false);
  const {
    candidateList,
    getAllCandidates,
    update,
    votingStatus,
    remainingTime,
  } = context;

  useEffect(() => {
    stop().then(() => {
      setWaiting(true);
      getAllCandidates().then(() => {
        setWaiting(false);
        props.handleAlert(
          "Candidates data fetched from blockchain Successfully",
          "success"
        );
      });
    });
  }, []);

  async function stop() {
    if (votingStatus && remainingTime <= 0) {
      props.handleAlert(
        "Make this transaction for complete voting session",
        "warning"
      );
      setWaiting(true);
      await update();
      setWaiting(false);
    }
  }

  const getMaxVoteCandidateIndex = () => {
    if (!candidateList || candidateList.length === 0) return -1;
    return candidateList.reduce((maxIndex, candidate, index, candidates) => {
      return candidate[5] > candidates[maxIndex][5] ? index : maxIndex;
    }, 0);
  };

  const maxVoteIndex = getMaxVoteCandidateIndex();

  return (
    <>
      {waiting && <Loader />}
      <div className="w-screen h-screen bg-primary">
        <h1 className="text-center text-4xl font-bold pt-6 pb-2 border-blue-50 shadow-2xl mb-6">
          Result of voting
        </h1>
        <div className="flex relative px-40 gap-16 flex-wrap justify-center">
          <p className="absolute right-16 -top-5">
            Total No. of candidates{" "}
            <span className="text-green-500 font-bold pl-2 text-lg">
              {candidateList && candidateList.length}
            </span>
          </p>
          {candidateList &&
            candidateList.map((candidate, index) => (
              <div
                key={index}
                className={`${
                  index === maxVoteIndex
                    ? "border-4 border-green-500 text-green-500"
                    : "border-transparent"
                } bg-primaryDark/20 drop-shadow-3xl rounded-xl relative px-6 pr-20 py-3 font-semibold text-2xl shadow-white shadow-2xl`}
              >
                <p>Name: {candidate[0]}</p>
                <p>Gender: {candidate[1]}</p>
                <p>Age: {candidate[2].toString()}</p>
                <p>Party Name: {candidate[3]}</p>
                <p>Election Type: {candidate[4]}</p>
                <p>TotalVotes: {candidate[5].toString()}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Result;
