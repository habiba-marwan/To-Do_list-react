import React, { useState, useEffect } from "react";

import { TaskCol } from "./Components/TaskCol";
import { NavBar } from "./Components/NavBar";
import { AddTask } from "./Components/AddTask";
import { type Task } from "./types";
import "./App.css";

// to get the current date
function todayLocalISO() {
	const d = new Date();
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	{
		console.log(`${y}-${m}-${day}`);
	}
	return `${y}-${m}-${day}`;
}

function parseTasks(raw: string): Task[] | null {
	try {
		const data = JSON.parse(raw);
		if (!Array.isArray(data)) return null;
		const valid = data.every(
			(t) => t && typeof t.id === "string" && typeof t.title === "string",
		);
		return valid ? data : null;
	} catch {
		return null;
	}
}
export default function App() {
	const [tasks, setTasks] = useState<Task[]>(() => {
		const savedTasks = localStorage.getItem("tasks");

		if (savedTasks) {
			const validatedTasks = parseTasks(savedTasks);

			if (validatedTasks) {
				return validatedTasks;
			} else {
				localStorage.removeItem("tasks");
			}
		}

		return [];
	});
	const [isOpen, setIsOpen] = useState(false); // for the add task window
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [taskToEdit, setTaskToEdit] = useState<Task | null>();
	const [filterDate, setFilterDate] = useState<string>("");
	const [sortMethod, setSortMethod] = useState<
		"none" | "alphabetical" | "dueDate"
	>("none");

	useEffect(() => {
		try {
			localStorage.setItem("tasks", JSON.stringify(tasks));
		} catch (error) {
			console.error(error);
		}
	}, [tasks]);

	function updateTaskStatus(id: string, isDone: boolean) {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, done: isDone } : task,
			),
		);
	}
	function handleEditTask(id: string) {
		setIsEdit(true);
		setIsOpen(true);
		const target = tasks.find((task) => task.id === id);
		setTaskToEdit(target);
	}
	function handleDeleteTask(id: string) {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	}
	const visibleTasks = [...tasks]
		.filter((t) => !filterDate || t.deadline === filterDate)
		.sort((a, b) => {
			if (sortMethod === "alphabetical") {
				return a.title.localeCompare(b.title);
			}

			if (sortMethod === "dueDate") {
				const timeA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
				const timeB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
				return timeA - timeB;
			}

			return 0; // If sortMethod is "none", return 0 to keep original order
		});

	const handleSaveForm = (formData: {
		title: string;
		description: string;
		deadline: string;
	}) => {
		if (isEdit && taskToEdit) {
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === taskToEdit.id
						? { ...task, ...formData } // Overwrite title, desc, and deadline
						: task,
				),
			);
		} else {
			const newTask: Task = {
				id: crypto.randomUUID(),
				title: formData.title,
				description: formData.description,
				created_at: todayLocalISO(),
				deadline: formData.deadline,
				done: false,
			};
			setTasks((prevTasks) => [...prevTasks, newTask]);
		}

		// close and reset the window after saving
		setIsOpen(false);
		setIsEdit(false);
		setTaskToEdit(null);
	};
	const todoTasks = visibleTasks.filter((task) => !task.done);
	const doneTasks = visibleTasks.filter((task) => task.done);

	return (
		<div className={`page-wrapper ${isDarkMode ? "dark-theme" : ""}`}>
			<NavBar
				onAddTask={() => {
					setIsEdit(false);
					setIsOpen(true);
				}}
				onSort={setSortMethod}
				isDarkMode={isDarkMode}
				onToggleTheme={() => setIsDarkMode(!isDarkMode)}
				onFilterDate={setFilterDate}
			/>
			<div className="board-container">
				<TaskCol
					title="To Do"
					isDoneColumn={false}
					tasks={todoTasks}
					onUpdateTaskStatus={updateTaskStatus}
					onDelete={handleDeleteTask}
					onEdit={handleEditTask}
				/>

				<TaskCol
					title="Done"
					isDoneColumn={true}
					tasks={doneTasks}
					onUpdateTaskStatus={updateTaskStatus}
					onDelete={handleDeleteTask}
					onEdit={handleEditTask}
				/>
			</div>
			{isOpen && (
				<AddTask
					// the key prop forces react to fetch the component again not use the same one from memory
					key={taskToEdit ? taskToEdit.id : "new-task"}
					isOpen={isOpen}
					onClose={() => {
						setIsOpen(false);
						setIsEdit(false);
						setTaskToEdit(null);
					}}
					onAdd={handleSaveForm}
					isEdit={isEdit}
					initialData={taskToEdit}
				/>
			)}
		</div>
	);
}
