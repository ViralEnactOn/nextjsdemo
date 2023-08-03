import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import Link from "next/link";

function allusersdata() {
  const [dataResponse, setDataResponse] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const numberRegex = /^\d+$/;

  // Fetch all data
  async function handleFetchData() {
    await axios(API_URL + "getuserdata")
      .then((result) => {
        if (result.status === 200) {
          setDataResponse(result.data.data);
        }
      })
      .catch((err) => {
        console.error({ err });
      });
  }

  useEffect(() => {
    handleFetchData();
    return () => {};
  }, []);

  // Delete record
  const handleDeleteRecord = async (id) => {
    await axios
      .post(API_URL + "deleteuserdata", { id: id })
      .then(async (result) => {
        if (result.status === 200) {
          await handleFetchData();
        }
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  // Reset
  const handleReset = () => {
    setSelectedRow(null);
    setAgeError("");
    setNameError("");
  };

  // Update record
  const handleUpdateRecord = async (id) => {
    dataResponse.map(async (item) => {
      if (item.id === id) {
        if (numberRegex.test(item.age) === true) {
          setAgeError("");
          await axios
            .post(API_URL + "updateuserdata", {
              id: id,
              name: item.name,
              age: item.age,
            })
            .then(async (result) => {
              if (result.status === 200) {
                setSelectedRow(null);
                await handleFetchData();
              }
            })
            .catch((err) => {
              console.error({ err });
            });
        } else {
          setAgeError("Enter numbers only.");
        }
      }
    });
  };

  return (
    <>
      <div className="flex  justify-center mt-10">
        <Link className="bg-cyan-300 p-2 rounded-lg" href="/">
          Add new record
        </Link>
      </div>
      <div className="flex justify-center mt-10">
        <table className="self-center border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <td className="p-2 w-60  text-center">Name</td>
              <td className="p-2  w-60 text-center">Age</td>
              <td className="p-2  w-60 text-center">Edit</td>
              <td className="p-2  w-60 text-center">Delete</td>
            </tr>
          </thead>
          <tbody>
            {dataResponse.length !== 0 &&
              dataResponse.map((data, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border border-gray-400 text-center"
                  >
                    <td className="p-2 h-20 self-center">
                      {selectedRow === index ? (
                        <input
                          type="text"
                          className="rounded-lg p-3 bg-gray-300"
                          value={data.name}
                          onChange={(e) =>
                            setDataResponse((prevData) => {
                              const newData = [...prevData];
                              newData[index].name = e.target.value;
                              return newData;
                            })
                          }
                        />
                      ) : (
                        data.name
                      )}
                    </td>
                    <td className="p-2 h-20 self-center">
                      {selectedRow === index ? (
                        <input
                          type="text"
                          pattern="^[0-9]*$"
                          className="rounded-lg p-3 bg-gray-300"
                          value={data.age}
                          onChange={(e) =>
                            setDataResponse((prevData) => {
                              const newData = [...prevData];
                              newData[index].age = e.target.value;
                              return newData;
                            })
                          }
                        />
                      ) : (
                        data.age
                      )}
                      {ageError && selectedRow === index && (
                        <div className="text-red-700">{ageError}</div>
                      )}
                    </td>
                    <td className="p-2 ">
                      {selectedRow === index ? (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleUpdateRecord(data.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-8"
                            onClick={() => {
                              setSelectedRow(null);
                              handleFetchData();
                              handleReset();
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => setSelectedRow(index)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td className="p-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteRecord(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default allusersdata;
