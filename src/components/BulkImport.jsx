import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";

const BulkImport = ({ toggle }) => {
  const [bulkError, setBulkError] = useState("");

  const { checkExistance, user, bulkImport } = FirebaseContext();

  // TODO: FIX CORS
  // const handleBulkImport = async () => {
  //   const res = await fetch("http://192.168.1.40:3000/api/card/66/query/json", {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-Metabase-Session": "6ceb28f1-50e4-4389-a875-8ef85015dc7f",
  //     },
  //   });
  //   console.log(res);
  // };

  const handleBulkImport = async (file) => {
    const fileReader = new FileReader();
    let jsonData;
    fileReader.onloadend = async () => {
      jsonData = JSON.parse(fileReader.result);
      if (await checkExistance(jsonData[0]["At Time"])) {
        setBulkError(
          `Release notes already exist for this day. Bulk Import denied. Please add notes individually.`,
        );
      } else {
        setBulkError("");
        bulkProcess(jsonData);
      }
    };
    if (file != undefined) {
      fileReader.readAsText(file);
    }
  };

  const bulkProcess = async (data) => {
    let ret = {};
    data.forEach((job) => {
      let id = uuidv4();
      let note = {
        authed: user.email,
        name: job.DriverName,
        type: "driver",
        id: id,
        treg: "na",
        company: "XP",
        status: "valid",
        address: job["Dest Postcode"],
        time: job["At Time"].substring(11, 16),
        cars: [
          {
            reg: job["Vehicles → Registration"] || "",
            make: job["Vehicle Manufacturers → Name"] || "",
            model: job["Vehicle Models → Name"] || "",
            colour: job["Vehicle Colours → Name"] || "",
            leftSite: false,
          },
        ],
      };
      ret[id] = note;
    });

    let date = new Date(data[0]["At Time"]).toISOString().substring(0, 10);

    console.log(ret);
    let uploaded = await bulkImport(ret, date);

    toggle();
  };

  return (
    <div style={{ paddingBottom: "10px" }}>
      <p>Bulk Import</p>
      {/* <button onClick={handleBulkImport}>Get from Metabase</button> */}
      <input
        type="file"
        accept=".json,application/json"
        onChange={(e) => handleBulkImport(e.target.files[0])}
      />
      <p style={{ color: "#f00" }}>{bulkError}</p>
    </div>
  );
};

export default BulkImport;
