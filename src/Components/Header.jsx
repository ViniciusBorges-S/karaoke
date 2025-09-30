
import React from "react";
import "../App.css";
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container" >
        <div className="d-flex">
          <img src="/logo.png" alt="Logo" className="header-logo" />
          <h1 className="header-title">Z-Music</h1>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
