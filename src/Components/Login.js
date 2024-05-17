import React, { useContext, useEffect, useState } from "react";
import blockchainContext from "../context/blockchainContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Login = (props) => {
  const { connectToMetamask, votingStatus,getCurrentStatus, error,votingEndTime } =
    useContext(blockchainContext);
  const navigate = useNavigate();

  const [waiting,setWaiting] = useState(false);
  useEffect(()=>{
    votingEndTime();
  },[connectToMetamask]);

  useEffect(() => {
    getCurrentStatus();
    if (error) {
      props.handleAlert(error, "error");
    }
  }, []);

  const connect = async () => {
    props.handleAlert("Connecting to MetaMask wallet", "warning");
    setWaiting(true);
    await connectToMetamask().then(()=>{
      getCurrentStatus();
    });
    setWaiting(false);
    if(error){
      props.handleAlert(error,"error");
      
      navigate("/login");
    }else{
      props.handleAlert("Connected to MetaMask wallet", "success");
    }

    if ( votingStatus) {
      props.handleAlert("Voting is Live", "warning");
      navigate("/vote");
    }else{
      console.log("voting status in lging", votingStatus)
      navigate("/");
    }
  };

  // Render a button to initiate connection
  return (
    <>
    {waiting && <Loader /> }
      <div className=" flex flex-col relative w-full h-screen z-10 bg-primary  justify-center items-center gap-2">
        <img src="./images/bg.webp" alt="" className="absolute -z-10 w-screen h-screen opacity-50  " />
        <h1 className="font-bold text-4xl mb-8 drop-shadow-lg shadow-black text-center ">
          Welcome to Blockchain Based Voting System
        </h1>
      <div className="z-50 relative" >
        <button
          onClick={connect}
          className="z-50  border-solid border-2 px-5 py-2 rounded-2xl font-bold bg-blue-500 shadow-2xl drop-shadow-2xl shadow-black text-white text-xl  "
        >
          Login MetaMask
        </button>
        </div>
      </div>
    </>
  );
};

export default Login;
