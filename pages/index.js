import React, { useState } from "react";

function index() {
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
    } else {
      setAgeError("");
    }
    // setDisableButton(true);
    // axios
    //   .post("https://dummyjson.com/auth/login", {
    //     username: username,
    //     password: password,
    //   })
    //   .then((res) => {
    //     setDisableButton(false);
    //     if (res.status === 200) {
    //       console.log(res.data);
    //       // Calculate token expiration time (60 minutes from now in milliseconds)
    //       const expirationTime = new Date().getTime() + 60 * 60 * 1000;

    //       // Store the authentication token and its expiration time in localStorage
    //       localStorage.setItem("authToken", res.data.token);
    //       localStorage.setItem("authTokenExpiration", expirationTime);
    //       store.dispatch({ type: "UPDATE_USERDETAILS", payload: [res.data] });
    //       navigate("/movie");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //   });
  };

  return (
    <main className="min-w-max flex justify-center font-poppins bg-blue-200">
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
                />
                {nameError && <div className="text-red-700">{nameError}</div>}
              </div>
              <div className="mt-5">Age</div>
              <div className="mt-1">
                <input
                  id="age"
                  type="text"
                  className="rounded-lg p-3"
                  placeholder="Enter password"
                  value={details.age.value}
                  onChange={handleOnChange}
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default index;
