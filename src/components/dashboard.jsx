'use client';

import react, { useEffect, useState } from "react";
import ProgressBar from './progressBar';
import CurrentTIme from "./CurrentTIme";
import TaskTable from "./TaskTable";




const DashboardMain = () =>{

    return(

        <div className="container mt-4">
           <h4 style={{color: "grey", fontSize:"16px", marginLeft:"20px"}}>I LOVE REACT</h4>
            <div className="dashboard-content">
            <CurrentTIme />
            <ProgressBar />
            <TaskTable />
           
            </div>
        </div>
    )
}

export default DashboardMain;