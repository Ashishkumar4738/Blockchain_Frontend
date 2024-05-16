import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import blockchainContext from "../context/blockchainContext";

import { EthereumIcon } from "./Icons";
import { MetamaskLogo } from "./Icons";
import { QrCode } from "./Icons";
const Home = (props) => {
  const [time1, setTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const context = useContext(blockchainContext);
  const {
    error,
    votingStatus,
    isConnected,
    account,
    setAccount,
    setIsConnected,
    time,
    votingEndTime,
    startVoting,
    getAllCandidates,
    
  } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      props.handleAlert("First Login using MetaMask", "warning");
      navigate("/login");
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountcChanged",
          handleAccountsChanged
        );
      }
    };
  });

  useEffect(()=>{
    getVotingEndTime();
    if(votingStatus){
      props.handleAlert("Voting is Live","warning");
      navigate("/vote");
    }
  });


  useEffect(() => { }, [setShowModal]);

  const handleAccountsChanged = (account) => {
    if (account.length > 0 && account !== account[0]) {
      setAccount(account[0]);
      props.handleAlert("Account change successfully.", "success");
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  };

  const getVotingEndTime = () => {
    votingEndTime();
    console.log("time", time);
  };

  const start = () => {
    setShowModal(true);
    props.handleAlert("You are going to start voting", "warning");
    console.log("set show model true", showModal);

    getAllCandidates();
  };

  const handleStart = async () => {
    // Call the start function with the specified time
    await startVoting(time1 * 60);
    if (error) {
      props.handleAlert(error, "error");
      navigate("/");
    } else {
      props.handleAlert("Voting has started successfully", "success");
    }

    // Close the modal
    setShowModal(false);
    // Reset the time
    setTime(0);
    navigate("/vote");
  };

  return (
    <>
      {showModal && (
        <div className="modal z-50 overflow-hidden absolute left-[25%] top-[20%] rounded-2xl backdrop-blur-md h-1/2  w-1/2 shadow-white shadow-inner ">
          <div className="modal-content flex flex-col w-full h-full justify-center items-center ">
            <div
              className="text-3xl absolute top-10 right-10 font-semibold cursor-pointer "
              onClick={() => {
                setShowModal(false);
              }}
            >
              x
            </div>
            <h1 className="text-xl text-black font-bold  ">
              {" "}
              <span className="text-red-600 text-2xl font-bold  ">
                Warning:-{" "}
              </span>{" "}
              Once start you will not able to modify things.{" "}
            </h1>
            <h2 className="text-xl mt-6 font-semibold ">
              Enter the duration of Voting in Minutes{" "}
            </h2>
            <input
              className="bg-transparent text-center text-xl font-bold mt-3 border-b-4 border-black "
              type="number"
              value={time1}
              onChange={(e) => setTime(parseInt(e.target.value))}
            />
            <button
              onClick={handleStart}
              className="px-4 py-1 font-semibold border-white text-xl mr-3 mt-10 text-white bg-blue-500 hover:border-4 hover:font-bold hover:bg-red-600 transition-colors duration-500  "
            >
              Start
            </button>
          </div>
        </div>
      )}
      <section className="w-screen h-screen bg-primary bg-[#e3cbf3]/20 overflow-hidden absolute -z-20">
        <div className=" bg-[#aab0f8b6] w-[200%] h-[100%] absolute top-[27%] left-[40%] opacity-85 -z-10 blur-3xl rounded-full drop-shadow-2xl " />
      </section>
      <div className=" left-[2%] top-[37%] -z-10 w-44 h-44 absolute bg-spin_colors rounded-full transform rotate-45 shadow-xl" />
      <div className=" left-[40%] top-[37%] z-10 w-32 h-32 absolute bg-spin_colors shadow-[#a2b3f5] rounded-full transform rotate-180  " />
      <div className=" left-[24%] top-[19%] z-10 w-28 h-28 absolute bg-spin_colors shadow-[#a2a6f5] rounded-full transform rotate-90 backdrop-blur-sm   " />
      <div className=" left-[33%] top-[36%] z-10 w-16 h-16 absolute bg-spin_colors shadow-[#a2a3f5] rounded-full transform rotate-45 backdrop-blur-sm   " />
      <div className=" left-[41%] top-[56%] -z-10 w-16 h-16 absolute bg-spin_colors shadow-[#847eff] rounded-full transform rotate-45 backdrop-blur-sm   " />

      <div className="relative flex justify-center items-center px-20 gap-20 w-screen h-screen overflow-hidden  ">
        <div className="flex items-center left w-full h-full pl-14 ">
          <div className=" bg-[#bee1fa]/40   drop-shadow-md  shadow-2xl shadow-[#5d65f5] pt-8 rounded-3xl backdrop-blur-[10px] ">
            <div className="w-[100%]  flex px-8 justify-between">
              <div className="flex justify-start gap-6 items-center">
                <MetamaskLogo />
                <h1 className="font-bold text-3xl  ">MetaMask</h1>
              </div>
              <EthereumIcon className=" flex items-center mt-2  " />
            </div>
            <div className="mt-24 px-8 mb-8">
              <p className="font-semibold text-xl  ">{account}</p>
            </div>
            <div className="flex justify-between items-center py-4 bg-gradient-to-r from-[#0c32f2]  to-[rgb(239, 231, 248)] overflow-hidden rounded-br-3xl rounded-bl-3xl  ">
              <h1 className="font-semibold px-8 text-2xl text-white  ">
                Blockchain Based Application
              </h1>
              <QrCode className="mr-8  " />
            </div>
          </div>
        </div>

        <div className=" right backdrop-blur-2xl h-[80%] shadow-xl  flex flex-col rounded-3xl  items-center justify-center gap-10  w-full  ">
          <p
            className={`self-end ${
              votingStatus ? "text-red-600" : "text-black"
            } font-semibold text-xl `}
          >
            {votingStatus ? "Live" : "Not Live"}
          </p>

          <Link to="/candidates">Candidate</Link>
          <Link to="/vote"> vote </Link>
          <Link to="/voteCasting"> VoteCasting </Link>
          <Link to="/aadhar"> Aadhar </Link>
          <Link to="/addCandidate">Add Candidate</Link>

          <button onClick={start} className="cursor-pointer">
            StartVoting
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
