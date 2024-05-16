import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const Aadhar = (props) => {
  const [waiting, setWaiting] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    address: "",
    dob: "",
    mobileNo: "",
    emailId: "",
    nationality: "",
    occupation: "",
    education: "",
    maritalStatus: "",
  });

  const navigate = useNavigate();

  const [profilePreview, setProfilePreview] = useState(null);
  const [fingerprintPreview, setFingerprintPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImagePreview = (e, setImagePreview) => {
    const file = e.target.files[0];

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    return file;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    try {
      const formData = new FormData();
      for (let key in userData) {
        formData.append(key, userData[key]);
      }

      // Send user data to backend
      const response = await axios.post(
        "http://localhost:5000/aadhar/addAadhar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      props.handleAlert("Aadhar card created successfully", "success");
      console.log(response.data);
      navigate("/");
    } catch (error) {
      props.handleAlert(error.message, "error");
      console.error("Error submitting user data: ", error.message);
    }
    setWaiting(false);
  };

  return (
    <>
      {waiting && <Loader />}
      <div className="w-screen h-screen bg-primary flex items-center">
        
        {profilePreview && (
          <div className="w-1/3 ml-3 flex flex-col  justify-center items-center gap-6 ">
            <h1 className="text-center font-semibold text-2xl underline underline-offset-4  ">
              Profile Preview
            </h1>
            <img src={profilePreview} alt="Profile Preview"  className=" w-[50%] h-[50%]" />
          </div>
        )}
          
        <form
          onSubmit={handleSubmit}
          className="border-2 border-transparent px-5 py-1 m-auto shadow-2xl backdrop-blur-3xl rounded-3xl"
        >
          <div className="flex flex-col gap-4">
            <label className="text-xl font-semibold underline underline-offset-2 ">Personal Information:</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="border-b-2 border-black text-center"
                />
              </div>
              <div>
                <label>Gender:</label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="border-b-2 border-black text-center bg-transparent "
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="border-b-2 border-black text-center"
              />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className="border-b-2 border-black text-center"
              />
            </div>
            <div>
              <label>Mobile Number:</label>
              <input
                type="tel"
                name="mobileNo"
                value={userData.mobileNo}
                onChange={handleChange}
                className="border-b-2 border-black text-center"
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="emailId"
                value={userData.emailId}
                onChange={handleChange}
                className="border-b-2 border-black text-center"
              />
            </div>
            <div>
              <label>Nationality:</label>
              <input
                type="text"
                name="nationality"
                value={userData.nationality}
                onChange={handleChange}
                className="border-b-2 border-black text-center"
              />
            </div>
            <div>
              <label>Occupation:</label>
              <input
                type="text"
                name="occupation"
                value={userData.occupation}
                onChange={handleChange}
                className="border-b-2 border-black text-center"
              />
            </div>
            <div>
              <label>Education:</label>
              <input
                type="text"
                name="education"
                value={userData.education}
                onChange={handleChange}
                className="border-b-2 border-black text-center"
              />
            </div>
            <div>
              <label>Marital Status:</label>
              <select
                name="maritalStatus"
                value={userData.maritalStatus}
                onChange={handleChange}
                className="border-b-2 border-black text-center bg-transparent "
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-between mt-4">
            <label>Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImagePreview(e, setProfilePreview)}
              className="customfile"
            />
          </div>

          {/* Fingerprint Image */}
          <div className="flex justify-between mt-4">
            <label>Fingerprint Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImagePreview(e, setFingerprintPreview)}
              className="customfile"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center mt-8">
            <button className="w-1/2 py-2 bg-primaryDark text-black text-bold text-lg border-4 font-semibold rounded-2xl shadow-md hover:bg-blue-500 transition duration-300">
              Submit
            </button>
          </div>
        </form>

        {/* Fingerprint Image Preview */}
        {fingerprintPreview && (
          <div className="w-1/3 mr-3 flex flex-col items-center justify-center gap-6 ">
            <h1 className="text-center font-semibold text-2xl underline underline-offset-4">
              Fingerprint Preview
            </h1>
            <img src={fingerprintPreview} alt="Fingerprint Preview"  className="w-[50%] h-[50%] " />
          </div>
        )}
      </div>
    </>
  );
};

export default Aadhar;
