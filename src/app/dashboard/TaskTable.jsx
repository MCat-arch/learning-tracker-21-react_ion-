import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskTable() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [progressData, setProgressData] = useState([]);

  // Fetch progress data from backend
  const fetchProgress = async () => {
    try {
      const response = await axios.get("/api/dashboard");
      setProgressData(response.data);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };
    // Helper to format date in Jakarta timezone
    const formatDateInJakarta = (date) => {
      return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Jakarta",
      }).format(date);
    };

  // Generate tasks for the current week
  const generateTasksForWeek = (offset) => {
    const today = new Date();
    today.setMinutes(today.getMinutes() + today.getTimezoneOffset());
    const jakartaTime = new Date(today.getTime() + 7 * 60 * 60 * 1000);
    const firstDayOfWeek = new Date(
      jakartaTime.setDate(jakartaTime.getDate() - ((jakartaTime.getDay() + 6) % 7) + offset * 7)
    );
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      const formattedDate = formatDateInJakarta(date);

      return {
        date: formattedDate,
        isComplete: progressData.some((entry) => entry.date === formattedDate && entry.isAttended),
      };
    });
  };

  // Update tasks when `weekOffset` or `progressData` changes
  useEffect(() => {
    setTasks(generateTasksForWeek(weekOffset));
  }, [weekOffset, progressData]);

  // Mark today's lesson as complete
  const markTodayComplete = async () => {
    const today = formatDateInJakarta(new Date());

    try {
      await axios.post("/api/dashboard", {
        date: today,
        isAttended: true,
      });

      // Refresh progress data
      fetchProgress();
    } catch (error) {
      console.error("Error marking today's lesson as complete:", error);
    }
  };

  // Fetch progress data on initial load
  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div className="mt-3">
      <button onClick={() => setWeekOffset((prev) => prev - 1)} className="btn btn-secondary">
        Previous Week
      </button>
      <button onClick={() => setWeekOffset((prev) => prev + 1)} className="btn btn-secondary mx-2">
        Next Week
      </button>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className={task.isComplete ? "table-success" : ""}>
              <td>{task.date}</td>
              <td>{task.isComplete ? "Completed" : "Incomplete"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={markTodayComplete} className="btn btn-primary">
        I've Finished Today’s Lesson
      </button>
    </div>
  );
}

export default TaskTable;
