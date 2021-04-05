import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import header from "./css/Button.module.css";

function Displaydata() {
  const [successful_launch_filter, set_successful_launch_filter] = useState();
  const [successful_land_filter, set_successful_land_filter] = useState();
  const [launch_year, set_launch_year] = useState();

  const launch_year_data = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
  ];

  const [spacexdata, set_spacex_data] = useState();

  const fetchdata = async () => {
    let url = `https://api.spacexdata.com/v3/launches?limit=100`;
    if (successful_launch_filter != undefined) {
      url += `&launch_success=${successful_launch_filter}`;
    }
    if (successful_land_filter != undefined) {
      url += `&land_success=${successful_land_filter}`;
    }
    if (launch_year != undefined) {
      url += `&launch_year=${launch_year}`;
    }

    const res = await axios.get(url);
    set_spacex_data(await res.data);
  };

  // inital data fetch

  useEffect(async () => {
    const res = await axios.get(
      "https://api.spacexdata.com/v3/launches?limit=100"
    );
    set_spacex_data(await res.data);
  }, []);

  useEffect(() => {
    fetchdata();
  }, [successful_launch_filter, successful_land_filter, launch_year]);

  return (
    <div className={(header.body, header.row)}>
      <div>
        <h2 className={header.Header}>SpaceX Launch Programs</h2>
      </div>
      <div
        className={header.cols2}
        style={{
          backgroundColor: "white",
          margin: "15px 10px 10px 10px",
          borderRadius: "10px",
        }}
      >
        <h4
          style={{
            fontWeight: "bolder",
            fontFamily: "Arial",
            padding: "5px 0px 0px 5px",
          }}
        >
          Filters
        </h4>
        <h4 style={{ textAlign: "center", color: "#8B8C92", marginTop: -15 }}>
          launch year
        </h4>
        <hr style={{ color: "#8B8C92", width: 100, marginTop: -10 }}></hr>

        <div className={header.filterbutton} style={{ paddingBottom: 10 }}>
          {launch_year_data.map((value, index) => {
            return (
              <div key={index} className={header.filterbuttoncol}>
                <center>
                  <input
                    type="submit"
                    value={value}
                    onClick={() => {
                      set_launch_year(launch_year == value ? undefined : value);
                    }}
                    className={
                      launch_year == value
                        ? header.filterselected
                        : header.filternotselected
                    }
                  ></input>
                </center>
              </div>
            );
          })}
        </div>
        <br></br>
        <h4 style={{ textAlign: "center", color: "#8B8C92" }}>
          Successful Launch
        </h4>
        <hr style={{ color: "#8B8C92", width: 100, marginTop: -15 }}></hr>
        <center>
          <input
            type="submit"
            value="True"
            onClick={() =>
              set_successful_launch_filter(
                successful_launch_filter == true ? undefined : true
              )
            }
            className={
              successful_launch_filter == true
                ? header.filterselected
                : header.filternotselected
            }
            style={{ marginRight: 10 }}
          />
          <input
            type="submit"
            value="False"
            onClick={() =>
              set_successful_launch_filter(
                successful_launch_filter == false ? undefined : false
              )
            }
            className={
              successful_launch_filter == false
                ? header.filterselected
                : header.filternotselected
            }
            style={{ marginLeft: 10 }}
          />
        </center>
        <br></br>
        <h4 style={{ textAlign: "center", color: "#8B8C92", marginTop: -5 }}>
          Successful Land
        </h4>
        <hr style={{ color: "#8B8C92", width: 100, marginTop: -15 }}></hr>
        <center>
          <input
            type="submit"
            value="True"
            onClick={() =>
              set_successful_land_filter(
                successful_land_filter == true ? undefined : true
              )
            }
            className={
              successful_land_filter == true
                ? header.filterselected
                : header.filternotselected
            }
            style={{ marginRight: 10,marginBottom:20}}
          />
          <input
            type="submit"
            value="False"
            onClick={() =>
              set_successful_land_filter(
                successful_land_filter == false ? undefined : false
              )
            }
            className={
              successful_land_filter == false
                ? header.filterselected
                : header.filternotselected
            }
            style={{ marginLeft: 10,marginBottom:20 }}
          />
        </center>
      </div>

      <div className={header.cols9}>
        <center>
          {spacexdata != undefined ? (
            spacexdata.map((value, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    margin: "0px 20px 20px 0px",
                    borderRadius: "10px",
                    fontFamily: "Arial",
                  }}
                  className={header.cols4}
                >
                  <img
                    src={value.links.mission_patch_small}
                    style={{
                      backgroundColor: "#F2F2F2",
                      width: 150,
                      marginTop: 10,
                    }}
                  ></img>
                  <h4 style={{ color: "#4E537C" }}>
                    {value.mission_name} #{index + 1}
                  </h4>
                  <p>
                    Mission Ids:{" "}
                    <span style={{ color: "#8B8C92" }}>
                      {value.mission_id.map((m_id, index) => {
                        return <p key={index}>{m_id}</p>;
                      })}
                    </span>
                  </p>
                  <p>
                    Launch year:{" "}
                    <span style={{ color: "#8B8C92", fontFamily: "Arial" }}>
                      {value.launch_year}
                    </span>
                  </p>
                  <p>
                    Successful Launch:{" "}
                    <span style={{ color: "#8B8C92", fontFamily: "Arial" }}>
                      {value.launch_success==undefined?"null":
                      value.launch_success.toString()}
                    </span>
                  </p>
                  <p>
                    Successful Land:{" "}
                    <span style={{ color: "#8B8C92", fontFamily: "Arial" }}>
                      {value.rocket.first_stage.cores[0].land_success == undefined
                        ? "null"
                        : value.rocket.first_stage.cores[0].land_success.toString()}
                    </span>
                  </p>
                </div>
              );
            })
          ) : (
            <div>
              <center className={header.loader}></center>
            </div>
          )}
        </center>
      </div>
    </div>
  );
}

export default Displaydata;
