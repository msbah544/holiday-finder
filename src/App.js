import React from "react";
import "./App.css";
import Form from "./Form";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [formInfo, setFormInfo] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (formInfo.countryCode && formInfo.year) {
      setIsPending(true);
      fetch(
        "http://localhost:8000/data" /*+
          formInfo.year +
          "/" +
          formInfo.countryCode*/
      )
        .then((response) => {
          if (response.ok != true) {
            setIsPending(false);
            throw Error("Resource not found!");
          } else console.log(response);
          return response.json();
        })
        .then((results) => {
          setData(results);
          setIsPending(false);
          setError(false);
          console.log(results);
        })
        .catch((err) => {
          setData(false);
          setIsPending(false);
          setError(err.message);
        });
    }
  };

  useEffect(() => setTimeout(fetchData, 1000), [formInfo]);
  return (
    <div className="container">
      <div className="form-component">
        <h1 className="header">Holiday Finder</h1>
        <Form
          setFormInfo={setFormInfo}
          setIsPending={setIsPending}
          setData={setData}
        />
      </div>
      <div className="data">
        <div className="text">
          <h1>Country code: {formInfo.countryCode}</h1>
          <h1>Year: {formInfo.year}</h1>
        </div>
        <div className="table-section">
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {data && (
            <table className="table">
              <thead>
                <tr>
                  <th>Holiday</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((info) => (
                  <tr key={Math.random() * 1000}>
                    <td>{info.name}</td>
                    <td>{info.types}</td>
                    <td>{info.date}</td>
                  </tr>
                ))}
                {/*<tr>
              <td>Gambia</td>
              <td>12/12/2022</td>
            </tr>
            <tr>
              <td>Gambia</td>
              <td>12/12/2022</td>
            </tr>
            <tr>
              <td>Gambia</td>
              <td>12/12/2022</td>
            </tr>*/}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
