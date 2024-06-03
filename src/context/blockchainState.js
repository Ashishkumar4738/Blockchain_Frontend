import React, { useState, useEffect } from "react";
import blockchainContext from "./blockchainContext";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../Constants/constant";
import Alert from "../Components/Alert";

function BlockchainState(props) {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(false);
  const [candidateList, setCandidateList] = useState(null);
  const [candidateByIndex, setCandidateByIndex] = useState(null);
  const [time, setTime] = useState(0);
  const [voter, setVoter] = useState([]);
  const [aadharDetails, setAadharDetails] = useState(null);
  const [error, setError] = useState(""); // State to hold error messages
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    
    getCurrentStatus().then(()=>{
      votingEndTime();
    });

  },[provider]); // Run only when provider changes



  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setProvider(provider);
        getCurrentStatus();
        setAccount(accounts[0]);
        setIsConnected(true);
        console.log("MetaMask connected:", accounts[0]);
      } catch (error) {
        setError(error.error.message,"error");
        // props.handleAlert("MetaMask not present in your browser","error");
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      setError("Metamask not present in your browser","error");
      console.error("Metamask not present in your browser");
    }
  }

  async function getCurrentStatus() {
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const status = await contractInstance.votingStarted();
      setVotingStatus(status);
      return status;
    } catch (error) {
      setError(error.error.message);
      console.error("Error fetching current status:", error);
    }
  }

  async function addCandidate(name, gender, age, partyName, electionType) {
    try {
      console.log("Adding candidate...");
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const txn = await contractInstance.addCandidate(
        name,
        gender,
        age,
        partyName,
        electionType
      );
      await txn.wait();
      console.log("Candidate added successfully");
    } catch (error) {
      setError(error.error.message);
      console.error("Error adding candidate:", error);
    }
  }

  async function getCandidateByIndex(index) {
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const candidate = await contractInstance.candidate(index);
      setCandidateByIndex(candidate);
    } catch (error) {
      setError(error.error.message);
      console.error("Error fetching current status:", error);
    }
  }

  async function getAllCandidates() {
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const candidateList = await contractInstance.getAllCandidates();
      setCandidateList(candidateList);
    } catch (error) {
      setError(error.error.message);
      console.error("error in getallcandidate", error);
    }
  }

  async function votingEndTime() {
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const time = await contractInstance.votingEndTime();
      setTime(parseInt(time._hex));
      updateCountdown(parseInt(time._hex));
      console.log("time from blockchian ",parseInt(time._hex))
      
    } catch (error) {
      setError(error.error.message);
      console.error("Error fetching current status:", error);
    }
  }

  function updateCountdown(endTime) {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = endTime - now;
    if (timeLeft <= 0) {
      setRemainingTime(0);
    } else {
      setRemainingTime(timeLeft);
    }
    console.log("timeleft in seconds remaining time ", timeLeft)
  }

  async function verifyVoter(adharCard) {
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const voter = await contractInstance.voters(adharCard);
      setVoter(voter);
      console.log("voter in verify voter",voter);
      return voter;
    } catch (error) {
      setError(error.message)
      console.error("Error fetching current voter status:", error);
    }
  }

  async function deleteCandidate(index) {
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const deletedCandidate = await contractInstance.deleteCandidate(index);
      await deletedCandidate.wait();
      console.log(deletedCandidate);
      console.log("candidate Deleted Successfully");
    } catch (error) {
      setError(error.error.message)
      console.error("Error fetching current voter status:", error);
    }
  }

  async function startVoting(time) {
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const txn = await contractInstance.startVoting(time);
      await txn.wait();
      setVotingStatus(true);
      console.log("voting has started");
    } catch (error) {
      setError(error.error.message)
      console.error("Error fetching current voter status:", error);
    }
  }

  async function update(){
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      await contractInstance.updateVotingStatus();
      
      
      
    } catch (error) {
      setError(error.error.message)
      console.error("Error fetching current voter status:", error);
    }
  }

  async function castVote(adharNum, candidateId) {
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const txn = await contractInstance.vote(adharNum, candidateId);
      await txn.wait();

      console.log("Vote successfylly casted");
    } catch (error) {
      setError(error.error.message);
      console.log("this is error pringint form eror",error.error.message);
      console.error("Error fetching current voter status:", error);
    }
  }

  return (
    <blockchainContext.Provider
      value={{
        provider,
        account,
        isConnected,
        votingStatus,
        candidateList,
        candidateByIndex,
        time,
        voter,
        aadharDetails,
        error,
        remainingTime,
        setProvider,
        setAccount,
        setIsConnected,
        connectToMetamask,
        getCurrentStatus,
        addCandidate,
        getAllCandidates,
        getCandidateByIndex,
        votingEndTime,
        verifyVoter,
        deleteCandidate,
        startVoting,
        castVote,
        setAadharDetails,
        updateCountdown,
        update,
      }}
    >
      
      {props.children}
    </blockchainContext.Provider>
  );
}

export default BlockchainState;
