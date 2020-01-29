import React from "react";

const Loading = props => {
  return (
      <section className="loading">
        <div className="loading-header">
          <img
            className="loading-logo"
            src={require("../../../assets/images/loading_logo.png")}
            alt="logo"
          />
      
        </div>
      </section>
  );
};

export default Loading;