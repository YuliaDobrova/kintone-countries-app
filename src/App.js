import { useState } from "react";
import LoadingSpinner from "./components/spinner.js";
import CountryPicker from "./components/countryPicker.js";
import StatePicker from "./components/statePicker.js";
import CityPicker from "./components/cityPicker.js";
import getRecords from "./requests/getRecords.js";
import postRecord from "./requests/postRecord.js";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [records, setRecords] = useState([]);

  const submit = async () => {
    setLoading(true);
    let location = {
      country: selectedCountry.name,
      state: selectedState.name,
      city: selectedCity.name,
    };
    console.log(selectedCountry);
    if (selectedCountry === "") {
      alert("At least pick a country...");
    } else {
      let response = await postRecord(location);
      console.log(response);
    }
    setLoading(false);
  };

  const get = async () => {
    setLoading(true);
    let response = await getRecords();
    let locationArray = [];
    response.records.forEach((record, index) => {
      locationArray.push(
        <li key={index}>
          {record.country.value}, {record.state.value}, {record.city.value}
        </li>
      );
    });
    setRecords(locationArray);
    setLoading(false);
  };

  return (
    <div className="main">
      <h2 className="mainHeader">Kintone Database App</h2>
      {loading ? (
        <div className="loadingDiv">
          <LoadingSpinner />
        </div>
      ) : null}
      <button
        className="getBtn"
        onClick={get}
        disabled={loading ? true : false}
      >
        GET Countries
      </button>
      {records?.length > 0 && (
        <div className="countriesListWrapper">
          <ul className="countriesList">{records}</ul>
        </div>
      )}

      <div className="selectWrapper">
        <p className="addCountryText">Add new country</p>
        <p className="pickCountryText">Pick a Country</p>
        <CountryPicker
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <p className="pickCountryText">Then Pick a State</p>
        <StatePicker
          selectedCountry={selectedCountry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
        <p className="pickCountryText">Lastly, Pick a City</p>
        <CityPicker
          selectedState={selectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
      <button
        className="getBtn"
        style={{ marginBottom: "30px" }}
        onClick={submit}
        disabled={loading ? true : false}
      >
        Submit!
      </button>
    </div>
  );
}

export default App;
