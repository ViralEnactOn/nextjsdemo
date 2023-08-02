import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/config";

function allusersdata() {
  const [dataResponse, setDataResponse] = useState([]);
  useEffect(() => {
    async function getPageData() {
      await axios(API_URL + "getuserdata")
        .then((result) => {
          if (result.status === 200) {
            console.log(result.data.data);
            setDataResponse(result.data.data);
          }
        })
        .catch((err) => {
          console.error({ err });
        });
    }
    getPageData();
    return () => {};
  }, []);

  return (
    <div>
      <div className="flex justify-center h-screen">
        <table className="self-center">
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
            </tr>
          </thead>
          <tbody>
            {dataResponse.length !== 0 &&
              dataResponse.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.age}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default allusersdata;
