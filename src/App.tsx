import React, { useState } from "react";
import { TaskCol } from "./Components/TaskCol";
import { type Task } from "./types";
import "./App.css";

const initialTasks: Task[] = [
	{
		id: "1",
		title: "task 1",
		description: "test task",
		created_at: Date(),
		deadline: Date(),
		done: false,
	},
	{
		id: "2",
		title: "task 2",
		description: "another test task",
		created_at: Date(),
		deadline: Date(),
		done: true,
	},
];

export default function App() {
	const [tasks, setTasks] = useState<Task[]>(initialTasks);

	// Updates the task's done status based on dragging or clicking the checkbox
	function updateTaskStatus(id: string, isDone: boolean) {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, done: isDone } : task,
			),
		);
	}

	function deleteTask(id: string) {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	}

	// Automatically split tasks into two arrays based on their current status
	const todoTasks = tasks.filter((task) => !task.done);
	const doneTasks = tasks.filter((task) => task.done);

	return (
		<div className="page-wrapper">
			<div className="board-container">
				<TaskCol
					title="To Do"
					isDoneColumn={false}
					tasks={todoTasks}
					onUpdateTaskStatus={updateTaskStatus}
					onDelete={deleteTask}
				/>
				<TaskCol
					title="Done"
					isDoneColumn={true}
					tasks={doneTasks}
					onUpdateTaskStatus={updateTaskStatus}
					onDelete={deleteTask}
				/>
			</div>
		</div>
	);
}
