import React, { useState } from "react";
import "./App.css";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");

  const addAssignment = () => {
    if (!title || !subject || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        title,
        subject,
        dueDate,
        status: "Pending",
      },
    ]);

    setTitle("");
    setSubject("");
    setDueDate("");
  };

  const changeStatus = (id, status) => {
    setAssignments(
      assignments.map((item) =>
        item.id === id ? { ...item, status: status } : item
      )
    );
  };

  const filteredAssignments =
    filter === "All"
      ? assignments
      : assignments.filter((item) => item.subject === filter);

  const submitted = assignments.filter(
    (a) => a.status === "Submitted"
  ).length;
  const pending = assignments.filter(
    (a) => a.status === "Pending"
  ).length;
  const late = assignments.filter(
    (a) => a.status === "Late"
  ).length;

  const subjects = [...new Set(assignments.map((a) => a.subject))];

  return (
    <div className="container">
      <h1>College Assignment Submission Tracker</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addAssignment}>Add Assignment</button>
      </div>

      <div className="dashboard">
        <h2>Dashboard Summary</h2>
        <p>Submitted: {submitted}</p>
        <p>Pending: {pending}</p>
        <p>Late: {late}</p>
      </div>

      <div className="filter">
        <label>Filter by Subject: </label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>

          {subjects.map((sub, index) => (
            <option key={index}>{sub}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredAssignments.length === 0 ? (
            <tr>
              <td colSpan="4">No Assignments</td>
            </tr>
          ) : (
            filteredAssignments.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.subject}</td>
                <td>{item.dueDate}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      changeStatus(item.id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Submitted</option>
                    <option>Late</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;