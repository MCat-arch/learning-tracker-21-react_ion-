'use client';

import react, { useEffect, useState } from "react";
import ProgressBar from './progressBar';
import CurrentTIme from "./CurrentTIme";
import TaskTable from "./TaskTable";




const DashboardMain = () =>{

    return(

        <div className="container mt-4">
            <h1>Lets GO buddy!</h1>
            <div className="dashboard-content">
            <CurrentTIme />
            <ProgressBar />
            <TaskTable />
           
            </div>
        </div>
    )
}

export default DashboardMain;