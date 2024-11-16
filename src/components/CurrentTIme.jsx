"use client";
import React from 'react'
import { useEffect, useState } from 'react';

function CurrentTIme() {
    const [time, settime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() =>{
        settime(new Date())},1000
    );
    return () => clearInterval(timer);
    }, []);

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = timeFormatter.format(time);
  const formattedDate = dateFormatter.format(time);
    return(

        <div className="container mt-4">
            <div className="text-center">
            <h2 style={{ fontSize: '2em', fontWeight: 'bold' }}>{formattedTime}</h2>
            <p style={{ fontSize: '1.5em' }}>{formattedDate}</p>
            </div>

        </div>
    )
}

export default CurrentTIme