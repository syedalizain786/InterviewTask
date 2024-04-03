import React from "react";
import { useNavigate } from "react-router-dom";

function navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div
      style={{
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "auto",
        margin: "10px 30px",
      }}
    >
      <img id="logo" src="/ccriptLogo.png" />
      <img
        id="logo"
        style={{ cursor: "pointer" }}
        src="/singout.png"
        onClick={logout}
      />
    </div>
  );
}

export default navbar;
