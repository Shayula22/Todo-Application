import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title };

    setIsPending(true);

    fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      console.log("new task added");
      setIsPending(false);
      setTitle(""); // Clear the input field
      fetchData(); // Fetch updated data
    });
  };

  const fetchData = () => {
    fetch("http://localhost:4000/tasks")
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  const handleDelete = (taskId) => {
     fetch(`http://localhost:4000/tasks/${taskId}`, {
       method: "DELETE",
     }).then(() => {
       console.log("task deleted");
       fetchData(); // Fetch updated data
     });
   };

  return (
    <div className="create">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Task title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!isPending && <button>Add task</button>}
        {isPending && <button disabled>Adding task...</button>}
      </form>

      <div className="list">
        {data.map((task) => (
          <div className="task-preview" key={task.id}>
            <h2>{task.title}</h2>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
