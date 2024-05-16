import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import blockchainContext from "../context/blockchainContext";
import Loader from "./Loader";
const Vote = (props) => {
  const [adharNo, setAdharNo] = useState(0);
  const [userFingerprint, setUserFingerprint] = useState(null); // State for user's uploaded fingerprint
  const [aadhar, setAadhar] = useState(null); // State for Aadhar details
  const [waiting,setWaiting] = useState(false);
  const navigate = useNavigate();

  const context = useContext(blockchainContext);
  const {
    setAadharDetails,
    verifyVoter,
    voter,
    error,
    time,
    remainingTime,
    updateCountdown,
  } = context;

  useEffect(() => {
    updateCountdown(time);
  }, [time]);

  useEffect(() => {
    if (error) {
      props.handleAlert(error, "error");
    }
  }, [error]);

  const verify = async () => {
    setWaiting(true);
    await verifyVoter(adharNo);
    console.log("voter status", adharNo);
    setWaiting(false);
    if (!voter[0]) {
      matchAdharCard();
    } else {
      props.handleAlert("You have already voted.", "error");
    }
  };

  const handleFingerprintUpload = (event) => {
    setUserFingerprint(event.target.files[0]);
  };

  const matchFingerprints = async () => {
    setWaiting(true);
    try {
      const response = await fetch(
        `http://localhost:8080/${aadhar.fingerprint}`
      );
      const imageBlob = await response.blob();
      const storedFingerprintFile = new File(
        [imageBlob],
        "storedFingerprint.png",
        { type: imageBlob.type }
      );

      const formData = new FormData();
      formData.append("sample_image", userFingerprint);
      formData.append("fingerprint_image", storedFingerprintFile);

      const result = await axios.post(
        "http://localhost:5000/compare_fingerprints",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setWaiting(false);

      console.log("Fingerprint match result:", result.data);
      // Handle the result as needed
      if (result.data.match_score > 75) {
        props.handleAlert("Fingerprint matched successfully.", "success");
        navigate("/aadhar-details");
      } else {
        props.handleAlert("Fingerprint does not match.", "error");
      }
    } catch (error) {
      props.handleAlert(error.message, "error");
      console.error("Error when matching fingerprint", error);
    }
  };

  const matchAdharCard = async () => {
    setWaiting(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/aadhar/voterAdharCard/${adharNo}`
      );
      setAadharDetails(response.data.data);
      setAadhar(response.data.data);
      props.handleAlert("Aadhar Details fetched successfully.", "success");
    } catch (error) {
      props.handleAlert(error.message, "error");
      console.log("Error when fetching Adhar details", error);
    }
    setWaiting(false);
  };

  return (
    <>
      { waiting &&  <Loader /> }
      <div className="flex flex-col pt-20 items-center h-screen w-screen bg-primary text-2xl font-semibold">
        <div className="self-top bg-primaryDark px-4 py-2 rounded-full shadow-2xl">
          Remaining Time :- {remainingTime}
        </div>

        {!aadhar && (
          <>
            <div className="-mt-24 flex items-center justify-center h-screen w-screen">
              <div className="flex flex-col items-center gap-5 rounded-3xl px-6 py-14 shadow-2xl drop-shadow-2xl backdrop-blur-3xl">
                <h1 className="font-bold text-3xl drop-shadow-2xl">
                  Enter Aadhar no.
                </h1>
                <input
                  className="text-center bg-transparent border-b-2 border-black"
                  type="number"
                  name="adharNo"
                  value={adharNo}
                  onChange={(e) => setAdharNo(e.target.value)}
                />
                <button
                  onClick={verify}
                  className="font-bold text-xl hover:border-green-500 shadow-2xl bg-green-100/40 px-4 py-2 hover:text-green-500"
                >
                  Get Aadhar card
                </button>
              </div>
            </div>
          </>
        )}

       

        {aadhar && (
          <>
            <div className="-mt-24 flex items-center justify-center h-screen w-screen">
              <div className="flex flex-col items-center gap-5 rounded-3xl px-6 py-14 shadow-2xl drop-shadow-2xl backdrop-blur-3xl">
                <h1 className="font-bold text-3xl drop-shadow-2xl  ">
                  Now upload your fingerprint
                </h1>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFingerprintUpload}
                  className="font-bold text-xl hover:border-green-500 shadow-2xl bg-green-100/40 px-4 py-2 hover:text-green-500 w-[80%] rounded-full "
                />
                <button
                  onClick={matchFingerprints}
                  className="font-bold text-xl hover:border-green-500 shadow-2xl bg-green-100/40 px-4 py-2 hover:text-green-500"
                >
                  Match Fingerprints
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Vote;
