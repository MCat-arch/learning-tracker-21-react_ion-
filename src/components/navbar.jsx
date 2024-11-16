'use client';
import "./style/nav.css"
import React from "react";

export default function Navbar({ setActivePage }) {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex" href="#">21 React_ion</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
         <span class="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarNav">
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
        </div>
      </nav>
    );
  }
  