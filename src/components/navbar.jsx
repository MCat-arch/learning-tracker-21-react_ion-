'use client';
import "./style/nav.css"
import React from "react";

export default function Navbar({ setActivePage }) {
    return (
      <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
         <span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="container-fluid">
            <a className="navbar-brand" href="#">21 React_ion</a>
          </div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setActivePage('Dashboard')}>Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setActivePage('Notes')}>Notes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setActivePage('Sources')}>Sources</a>
              </li>
            </ul>
          </div>
      </nav>
      </>
    );
  }
  