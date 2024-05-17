import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import blockchainContext from "../context/blockchainContext";
import Loader from "./Loader";
const VoteCasting = (props) => {
  const [waiting,setWaiting] = useState(false);

  const context = useContext(blockchainContext);
  const {
    candidateList,
    getAllCandidates,
    castVote,
    time,
    error,
    aadharDetails,
  } = context;
  const navigate = useNavigate();
  useEffect(() => {
    setWaiting(true);
    getAllCandidates();
    setWaiting(false);
  }, []);

  
  const updateError=()=>{
    console.log(error);
  }
  useEffect(() => {}, [castVote,updateError]);

  const performVote = async (index) => {
    // console.log("aadhar no.",,"index",)
    props.handleAlert("Your voting is validating in Blockchain", "warning");
    setWaiting(true);
    await castVote(aadharDetails.uniqueNumber, index + 1);
    setWaiting(false);
    props.handleAlert("Your vote recorded successfully","success");
    
    if (error) {
      props.handleAlert(error, "error");
      navigate("/");
    } else {
      navigate("/vote");
    }
  };

  return (

    <>
    {waiting && <Loader />}
    <div className="w-screen h-screen bg-primary">
      <h1 className="text-center text-4xl font-bold py-3 shadow-2xl">
        Candidates List
      </h1>

      <div className=" flex px-40 mt-10 gap-16 flex-wrap justify-center text-center m-auto w-full ">
        {candidateList &&
          candidateList.map((candidate, index) => (
            <div
              key={index}
              className="bg-primaryDark shadow-2xl shadow-black rounded-xl relative px-6 py-3 font-semibold text-2xl cursor-pointer select-none "
              onClick={() => {
                performVote(index);
              }}
            >
              <p>Name: {candidate[0]}</p>
              <p>Gender: {candidate[1]}</p>
              <p>Age: {candidate[2].toString()}</p>
              <p>Party Name: {candidate[3]}</p>
              <p>Election Type: {candidate[4]}</p>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default VoteCasting;
