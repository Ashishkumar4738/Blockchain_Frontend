import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import blockchainContext from "../context/blockchainContext";
import { DeleteIcon } from "./Icons";
import Loader from "./Loader";
const Candidate = (props) => {
  const context = useContext(blockchainContext);
  const [waiting, setWaiting] = useState(false);
  const { candidateList, getAllCandidates, deleteCandidate } = context;

  useEffect(() => {
    setWaiting(true);
    getAllCandidates();
    setWaiting(false);
    props.handleAlert("Cadidates data fetched from blockchain Successfully","success");
  }, []);

    

  const deleteCan = (index) => {
    deleteCandidate(index);
  };

  return (
    <>
    {waiting && <Loader /> }
    <div className="w-screen h-screen bg-primary">
      <h1 className="text-center text-4xl font-bold pt-6 pb-2 border-blue-50 shadow-2xl mb-6 ">Candidates Details</h1>
      <div className=" flex relative px-40 gap-16 flex-wrap justify-center ">
        <p className="absolute right-16 -top-5 " >Total No. of candidates <span className="text-green-500 font-bold pl-2 text-lg " > {candidateList && candidateList.length} </span> </p>
        {candidateList &&
          candidateList.map((candidate, index) => (
            <div key={index} className="bg-primaryDark/20 drop-shadow-3xl  rounded-xl relative px-6 pr-20 py-3 font-semibold text-2xl shadow-white shadow-2xl  " >
              <p>Name: {candidate[0]}</p>
              <p>Gender: {candidate[1]}</p>
              <p>Age: {candidate[2].toString()}</p>
              <p>Party Name: {candidate[3]}</p>
              <p>Election Type: {candidate[4]}</p>
              {/* Add buttons or links for actions like getByIndex and deleteCan */}
              <button onClick={() => deleteCan(index)} className="drop-shadow-xl shadow-white absolute right-0 top-0 border-transparent float-right " > <p className="absolute text-xs top-10 hover:visible hidden  " >Delete this Candidate</p> <DeleteIcon /> </button>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default Candidate;
