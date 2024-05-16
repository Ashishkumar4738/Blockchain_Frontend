import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blockchainContext from "../context/blockchainContext";

const AadharDetailsPage = (props) => {
  const context = useContext(blockchainContext);
  const { aadharDetails,time, remainingTime, updateCountdown} = context;
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate age and update show state only once when aadharDetails change
    if (aadharDetails) {
      const age = calculateAge(aadharDetails.dob);
      if (age > 18) {
        setShow(true);
        props.handleAlert("Details are all correct. You can Vote", "success");
      } else {
        props.handleAlert("Your age below 18 can't vote", "error");
        setTimeout(() => {
          navigate("/vote");
        }, 5000);
      }
    }
  }, [aadharDetails]);

  useEffect(()=>{
    updateCountdown(time);
  })

  // Function to calculate age and update the show state
  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = currentDate.getMonth() - dobDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const permission = () => {
    navigate("/voteCasting");
  };

  // Function to filter out image fields
  const isImageField = (key) => {
    return key === "profile" || key === "fingerprint";
  };

  return (
    <div className="flex flex-col pt-5 items-center h-screen w-screen bg-primary text-2xl font-semibold">
      <div className="self-top bg-primaryDark px-4 py-2 rounded-full drop-shadow-2xl ">
        Remaining Time :- {remainingTime}
      </div>
      <div className="justify-center w-screen h-screen  flex gap-5 items-center">
        <div className="relative rounded-2xl bg-primaryDark px-20 w-[60%] ">
          <div>
            <p className="text-center font-bold text-4xl py-3 text-white   ">
              Voter Details
            </p>
            {aadharDetails && (
              <div className=" flex flex-col gap-1 pl-32 rounded-2xl px-4 text-white ">
                {Object.entries(aadharDetails).map(([key, value], index) =>
                  isImageField(key) ? (
                    <div key={index}>
                      {key === "profile" && (
                        <img
                          width={"10%"}
                          src={`http://localhost:5000/${value}`}
                          alt={key}
                          className="rounded-lg absolute left-5  -top-10 w-[18%] h-auto shadow-white/40 shadow-xl "
                        />
                      )}
                    </div>
                  ) : (
                    <div key={index}>
                      {key !== "date" && key !== "_id" && key !== "__v" && (
                        <div>
                          <span className="capitalize font-semibold text-2xl px-2  ">
                            {key}:{" "}
                          </span>
                          <span className="">{value}</span>
                        </div>
                      )}
                      {key === "dob" && (
                        <>
                          <span className="capitalize font-semibold text-2xl px-2  ">
                            Age:{" "}
                          </span>
                          <span className="">{calculateAge(value)}</span>
                        </>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div>
            {show && (
              <button
                className="float-right  my-4 border-4 font-bold hover:text-green-500 hover:border-green-500 bg-white px-4 py-2 rounded-full "
                onClick={permission}
              >
                Give Access
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadharDetailsPage;
