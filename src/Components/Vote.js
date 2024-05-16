import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import blockchainContext from "../context/blockchainContext";
const Vote = (props) => {
  const [adharNo, setAdharNo] = useState(0);
  const navigate = useNavigate();
  const context = useContext(blockchainContext);
  const { setAadharDetails, verifyVoter, voter, error,time, remainingTime, updateCountdown } =
    context;

    console.log(remainingTime)

  useEffect(()=>{
    updateCountdown(time);
  });

  useEffect(() => {
    if (error) {
      props.handleAlert(error, "error");
    }
  }, [verifyVoter]);

  const verify = async () => {
    await verifyVoter(adharNo);

    console.log("voter status", adharNo);
    if (!voter[0]) {
      matchAdharCard();
    } else {
      props.hendleAlert("You have already voted.", "error");
    }
  };

  async function matchAdharCard() {
    try {
      const response = await axios.get(
        `http://localhost:5000/aadhar/voterAdharCard/${adharNo}`
      );
      // Navigate to AadharDetailsPage when data is fetched successfully
      console.log("aadhar card");
      setAadharDetails(response.data.data);
      props.handleAlert("Aadhar Details fetched successfully.", "success");

      navigate("/aadhar-details");
    } catch (error) {
      props.handleAlert(error.message, "error");
      console.log("Error when fetching Adhar details", error);
    }
  }

  return (
    <>
      <div className="flex flex-col pt-20 items-center h-screen w-screen bg-primary text-2xl font-semibold">
        <div className="self-top bg-primaryDark px-4 py-2 rounded-full shadow-2xl ">
          Remaining Time :- {remainingTime}
        </div>
        <div
          className="-mt-24 flex items-center justify-center
         h-screen w-screen"
        >
          <div
            className="flex flex-col items-center gap-5 rounded-3xl px-6 py-14 shadow-2xl drop-shadow-2xl backdrop-blur-3xl
           "
          >
            <h1 className=" font-bold text-3xl drop-shadow-2xl">
              {" "}
              Enter Aadhar no.
            </h1>
            <input
              className="text-center bg-transparent border-b-2 border-black "
              type="number"
              name="adharNo"
              value={adharNo}
              onChange={(e) => {
                setAdharNo(e.target.value);
              }}
            />
            <button
              onClick={verify}
              className="font-bold text-xl hover:border-green-500 shadow-2xl bg-green-100/40 px-4 py-2 hover:text-green-500   "
            >
              Get Aadhar card
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vote;
