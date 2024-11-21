'use client';
import "./nav.css"
import React from "react";
import Link from "next/link";

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
                <Link className="nav-link" href="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" href="/notes">Notes</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" href="/sourcess">Sources</Link>
              </li>
            </ul>
          </div>
      </nav>
      </>
    );
  }
  