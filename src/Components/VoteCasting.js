import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import blockchainContext from "../context/blockchainContext";

const VoteCasting = (props) => {
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
    getAllCandidates();
  }, []);

  
  const updateError=()=>{
    console.log(error);
  }
  useEffect(() => {}, [castVote,updateError]);

  const performVote = async (index) => {
    // console.log("aadhar no.",,"index",)
    props.handleAlert("Your voting is validating in Blockchain", "warning");
    await castVote(aadharDetails.uniqueNumber, index + 1);
    
     updateError();
    if (error) {
      props.handleAlert(error, "error");
      navigate("/");
    } else {
      navigate("/vote");
    }
  };

  return (
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
  );
};

export default VoteCasting;
