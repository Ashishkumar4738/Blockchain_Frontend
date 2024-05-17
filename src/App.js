import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import BlockchainState from "./context/blockchainState";
import AddCandidate from "./Components/AddCandidate";
import Candidate from "./Components/Candidate";
import Vote from "./Components/Vote";
import VoteCasting from "./Components/VoteCasting";
import Aadhar from "./Components/Aadhar";
import AadharDetailsPage from "./Components/AadharDetailsPage";
import Alert from "./Components/Alert";
import Result from "./Components/Result";
function App() {
  const [alert, setAlert] = useState(null);

  const handleAlert = (message, type) => {
    setAlert(() => {
      return {
        message,
        type,
      };
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <>
          <Alert alert={alert} />
      <BlockchainState handleAlert={handleAlert} >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home handleAlert={handleAlert} />} />
            <Route
              path="/login"
              element={<Login handleAlert={handleAlert} />}
            />
            <Route
              path="/addCandidate"
              element={<AddCandidate handleAlert={handleAlert} />}
            />
            <Route
              path="/candidates"
              element={<Candidate handleAlert={handleAlert} />}
            />
            <Route path="/vote" element={<Vote handleAlert={handleAlert} />} />
            <Route
              path="/voteCasting"
              element={<VoteCasting handleAlert={handleAlert} />}
            />
            <Route
              path="/aadhar"
              element={<Aadhar handleAlert={handleAlert} />}
            />
            <Route
              path="/result"
              element={<Result handleAlert={handleAlert} />}
            />
            <Route
              path="/aadhar-details"
              element={<AadharDetailsPage handleAlert={handleAlert} />}
            />
          </Routes>
        </BrowserRouter>
      </BlockchainState>
    </>
  );
}

export default App;
