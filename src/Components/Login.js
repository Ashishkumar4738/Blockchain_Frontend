import React, { useContext, useEffect } from "react";
import blockchainContext from "../context/blockchainContext";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { connectToMetamask, isConnected, votingStatus } =
    useContext(blockchainContext);
  const navigate = useNavigate();

  useEffect(()=>{

  },[connectToMetamask]);

  const connect = async () => {
    props.handleAlert("Connecting to MetaMask wallet", "warning");
    await connectToMetamask();
    props.handleAlert("Connected to MetaMask wallet", "success");
    console.log("login ", isConnected);
    console.log("voting Status",votingStatus)
    if (votingStatus) {
      props.handleAlert("Voting is Live", "warning");
      navigate("/vote");
    }
    navigate("/");
  };

  // Render a button to initiate connection
  return (
    <>
      <div className=" flex flex-col relative w-full h-screen z-10 bg-primary  justify-center items-center gap-2">
        <img src="./images/bg.webp" alt="" className="absolute -z-10 w-screen h-screen opacity-50  " />
        <h1 className="font-bold text-4xl mb-8 drop-shadow-lg shadow-black  ">
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
