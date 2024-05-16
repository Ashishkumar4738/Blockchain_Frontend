import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Aadhar = (props) => {
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    address: "",
    profile: null,
    fingerprint: null,
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

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, profile: file });

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFingerprintImage = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, fingerprint: file });

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFingerprintPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      props.handleAlert("Aadhar card created successfully","success");
      console.log(response.data);
      navigate("/");
    } catch (error) {
        props.handleAlert(error.message,"error");
      console.error("Error submitting user data: ", error.message);
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-primary flex  items-center">
        {profilePreview && (
          <div className="w-[30%] ml-3">
            <h1 className="text-center font-semibold text-2xl underline underline-offset-4  " >Profile Preview</h1>
            <img
              
              src={profilePreview}
              alt="Profile Preview"
            />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="border-2 border-transparent px-5 py-1 m-auto shadow-2xl  backdrop-blur-3xl rounded-3xl "
        >
          <div className="flex flex-col gap-2">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="border-b-2 border-black text-center  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="border-b-2 border-black text-center  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              
              value={userData.address}
              onChange={handleChange}
              className="border-b-2 border-black text-center"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Date of Birth:</label>
            <input
              type="text"
              name="dob"
              value={userData.dob}
              onChange={handleChange}
              className="border-b-2 border-black text-center  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNo"
              value={userData.mobileNo}
              onChange={handleChange}
              className="border-b-2 border-black text-center  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Email:</label>
            <input
              type="email"
              name="emailId"
              value={userData.emailId}
              onChange={handleChange}
              className="border-b-2 border-black text-center  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Nationality:</label>
            <input
              type="text"
              name="nationality"
              value={userData.nationality}
              onChange={handleChange}
              className="border-b-2 border-black text-center  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Occupation:</label>
            <input
              type="text"
              name="occupation"
              value={userData.occupation}
              onChange={handleChange}
              className="border-b-2 border-black text-center  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Education:</label>
            <input
              type="text"
              name="education"
              value={userData.education}
              onChange={handleChange}
              className="border-b-2 border-black text-center  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Marital Status:</label>
            <input
              type="text"
              name="maritalStatus"
              value={userData.maritalStatus}
              onChange={handleChange}
              className="border-b-2 border-black text-center  "
            />
          </div>
          {/* Add profile and fingerprint image input fields */}
          <div className="flex  justify-between mb-1" >
            <label  >Profile Image:</label>
            <input type="file" accept="image/*" onChange={handleProfileImage} className="" />
          </div>
          <div className="flex  justify-between" >
            <label  >Fingerprint Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFingerprintImage} className=""
            />
          </div>
          <div className="w-full flex justify-center mt-2 " >
          <button className=" w-[50%] font-bold  " type="submit">Submit</button>
          </div>
        </form>
        {fingerprintPreview && (
          <div className="w-[30%] mr-3">
            {" "}
            <h1 className="text-center font-semibold text-2xl underline underline-offset-4  ">Fingerprint Preview</h1>
            <img
              
              src={fingerprintPreview}
              alt="Fingerprint Preview"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Aadhar;
