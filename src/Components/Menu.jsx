import React, { useState } from "react";
import "../App.css";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="burger-menu">
      <button
        className={`burger-icon${open ? " open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Abrir menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`menu-list${open ? " show" : ""}`}>
        <li><a href="/">Pesquisar Música</a></li>
        <li><a href="/lista">Lista Completa</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://wa.me/5511947441728?text=Gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20meu%20evento">Contato</a></li>
      </ul>
    </nav>
  );
};

export default Menu;
