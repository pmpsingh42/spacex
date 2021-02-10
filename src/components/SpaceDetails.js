import React from "react";
import "./SpaceDetails.scss";

function SpaceDetails({ details }) {
  const {
    flight_number,
    mission_name,
    mission_id,
    launch_year,
    launch_success,
    links,
    rocket,
  } = details;
  const imgSrc = links.mission_patch_small;
  const land_success = rocket.first_stage.cores[0].land_success;

  return (
    <div className="space-details-card">
      <div className="space-card-back" key={flight_number}>
        <div >
          <img
            src={imgSrc}
            alt="mission patch img not available on api"
            className="space-image"
          />
        </div>
        <div className="space-name-flight-number">
          {mission_name} #{flight_number}
        </div>
        <div className="space-detail-label">
          Mission Ids:{" "}
         {mission_id && mission_id.length > 0 ? <ul>
            {" "}
            <li className="space-detail-value">{mission_id}</li>
          </ul> : '-'}
        </div>
        <div className="space-detail-label">
          Launch Year:{" "}
          <span className="space-detail-value">{launch_year}</span>
        </div>
        <div className="space-detail-label">
          Successful Launch:{" "} 
          <span className="space-detail-value">
            {launch_success ? "true" : "false"}
          </span>
        </div>
        <div className="space-detail-label">
          Successful Landing:{" "}
          <span className="space-detail-value">
            {land_success ? "true" : "false"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SpaceDetails;
