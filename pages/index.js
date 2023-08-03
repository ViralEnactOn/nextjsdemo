import React, { useState } from "react";
import { API_URL } from "../config/config";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function index() {
  const notify = () => toast.success("User inserted!");
  const numberRegex = /^\d+$/;
  const [disableButton, setDisableButton] = useState(false);
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [details, setDetails] = useState({
    name: {
      id: "name",
      value: "",
    },
    age: {
      id: "age",
      value: "",
    },
  });

  const handleOnChange = (event) => {
    const { id, value } = event.target;

    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: { ...prevDetails[id], value },
    }));
  };

  const handleSubmit = () => {
    if (details.name.value.length === 0) {
      setNameError("Name cannot empty.");
      return;
    } else {
      setNameError("");
    }

    if (details.age.value.length === 0) {
      setAgeError("Age cannot empty.");
      return;
    } else if (numberRegex.test(details.age.value) !== true) {
      setAgeError("Enter numbers empty.");
      return;
    } else {
      setAgeError("");
    }
    setDisableButton(true);
    axios
      .post(API_URL + "insertuserdata", {
        name: details.name.value,
        age: details.age.value,
      })
      .then((res) => {
        if (res.status === 200) {
          notify();
          setDisableButton(false);
          setDetails({
            name: {
              id: "name",
              value: "",
            },
            age: {
              id: "age",
              value: "",
            },
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <main className="min-w-max flex justify-center font-poppins ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container">
        <div className="flex justify-center min-h-screen">
          <div className="flex self-center w-96 h-96 bg-gray-200 justify-center rounded-lg">
            <div className="self-center ">
              <div className="flex justify-center font-bold text-xl">
                Enter User Detail
              </div>
              <div className="mt-10">Name</div>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  className="rounded-lg p-3"
                  placeholder="Enter your name"
                  value={details.name.value}
                  onChange={handleOnChange}
                  disabled={disableButton === true}
                />
                {nameError && <div className="text-red-700">{nameError}</div>}
              </div>
              <div className="mt-5">Age</div>
              <div className="mt-1">
                <input
                  id="age"
                  type="text"
                  className="rounded-lg p-3"
                  placeholder="Enter your age"
                  value={details.age.value}
                  onChange={handleOnChange}
                  disabled={disableButton === true}
                />
                {ageError && <div className="text-red-700">{ageError}</div>}
              </div>
              <div
                className="mt-5 flex justify-center rounded-lg bg-cyan-300 p-2 "
                onClick={() => handleSubmit()}
              >
                <button type="submit" disabled={disableButton === true}>
                  Submit
                </button>
              </div>
              <div className="mt-5 flex justify-center rounded-lg bg-cyan-300 p-2 ">
                <Link href="/allusersdata">Show all data</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default index;
