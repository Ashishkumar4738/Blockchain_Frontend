import React, { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blockchainContext from "../context/blockchainContext";
import Loader from "./Loader";

const AddCandidate = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("0");
  const [partyName, setPartyName] = useState("");
  const [electionType, setElectionType] = useState("");
  const [waiting,setWaiting] = useState(false);
  const navigate = useNavigate();

  const context = useContext(blockchainContext);
  const { addCandidate,error } = context;

  useEffect(()=>{

  },[addCandidate]);
  const handleAddCandidate = async (e) => {
    e.preventDefault();
    if (!name || !gender || !age || !partyName || !electionType) {
      props.handleAlert("All fields are required","warning");
      
      return;
    }
    setWaiting(true);
    try {
      
      await addCandidate(name, gender, parseInt(age), partyName, electionType);
      if(error){
        props.handleAlert(error,"error");

      }
      // Clear form fields after successful submission
      setName("");
      setGender("");
      setAge("");
      setPartyName("");
      setElectionType("");
      props.handleAlert("Candidate added successfully","success");
      navigate("/"); // Redirect to candidates page after successful addition
    } catch (error) {
      props.handleAlert(error,"error");
      console.error("Failed to add candidate");
    }
    setWaiting(false);
  };

  return (
    <>
    {waiting && <Loader /> }
      <div className="bg-primary w-screen h-screen  ">
        <div className="text-4xl font-bold text-center py-6 shadow-2xl">Add Candidate</div>
        <form className="flex flex-col bg-red-100/20 rounded-3xl shadow-inner drop-shadow-2xl backdrop-blur-3xl py-6 mt-10 w-[50%] justify-center items-center gap-4 text-2xl m-auto border-2" onSubmit={handleAddCandidate}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent ml-10 border-b-2 border-black rotated-input"
            />
          </div>
          <div>
            <label htmlFor="gender" >Gender:</label>
            <input
              id="gender"
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="bg-transparent ml-10 border-b-2 border-black rotated-input"
            />
          </div>
          <div className="flex">
            <label htmlFor="age">Age:</label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="bg-transparent ml-10 border-b-2 border-black rotated-input"
            />
          </div>
          <div>
            <label htmlFor="partyName">Party Name:</label>
            <input
              id="partyName"
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              className="bg-transparent ml-10 border-b-2 border-black rotated-input"
            />
          </div>
          <div>
            <label htmlFor="electionType">Election Type:</label>
            <input
              id="electionType"
              type="text"
              value={electionType}
              onChange={(e) => setElectionType(e.target.value)}
              className="bg-transparent ml-10 border-b-2 border-black rotated-input"
            />
          </div>
          
          <button type="submit" className="font-semibold px-6 py-3 bg-primaryDark/80 border-4 mt-6 drop-shadow-2xl  " >Add Candidate</button>
        </form>
      </div>
    </>
  );
};

export default AddCandidate;
