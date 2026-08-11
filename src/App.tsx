// import { useState } from "react";
// import { type Task } from "./types";
import "./App.css";
import { TaskCard } from "./Components/TaskCard";
import { type Task } from "./types";

function App() {
	// const [count, setCount] = useState(0);
	// const [tasks, setTasks] = useState<Task[]>([]);
	const task: Task = {
		id: "1",
		title: "task 1",
		description: "test task",
		created_at: Date(),
		deadline: Date(),
		done: false,
	};
	return (
		<>
			<TaskCard task={task} />
		</>
	);
}

export default App;
