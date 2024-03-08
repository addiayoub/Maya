import React from "react";
import "./MainLoader.css";
const MainLoader = ({ small }) => {
  return (
    <div className={`main-loader ${small ? "small" : ""}`}>
      <div className="modelViewPort">
        <div className="eva">
          <div className="head">
            <div className="eyeChamber">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
          </div>
          <div className="body">
            <div className="hand"></div>
            <div className="hand"></div>
            <div className="scannerThing"></div>
            <div className="scannerOrigin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLoader;
