import axios from 'axios';
import { useState, useEffect } from 'react';

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [target, setTarget] = useState(0)
  const fetchProgress =  async()=>{
    try{
    const response = await axios.get("/api/dashboard");
      const attendance = response.data.filter((entry) => entry.isAttended).length;
      const finishDay = 21;
      const percent = (attendance/finishDay)*100;
      setTarget(Math.round(percent));
    }catch(error){
      console.error("Error fetching progress data:", error);
    }

  }

  useEffect(()=>{
    fetchProgress();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < target ? prev + 1 : target));
    }, 100);

    return () => clearInterval(interval);
  }, [progress, target]);

  return (
    <div>
      <div>Progress: {progress}%</div>
      <div style={{ width: '100%', backgroundColor: '#ccc', height: '20px' }}>
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: 'green',
            height: '100%'
          }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
