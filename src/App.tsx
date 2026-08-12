import React, { useState, useEffect } from "react";

import { TaskCol } from "./Components/TaskCol";
import { NavBar } from "./Components/NavBar";
import { AddTask } from "./Components/AddTask";
import { type Task } from "./types";
import "./App.css";

// so it matches the <input type="date"> format (YYYY-MM-DD)
const date = new Date().toISOString().split("T")[0];

const initialTasks: Task[] = [
	{
		id: "1",
		title: "task 1",
		description: "test task",
		created_at: date,
		deadline: date,
		done: false,
	},
	{
		id: "2",
		title: "task 2",
		description: "another test task",
		created_at: date,
		deadline: date,
		done: true,
	},
	{
		id: "3",
		title: "task 3",
		description: "another test task",
		created_at: date,
		deadline: date,
		done: true,
	},
	{
		id: "4",
		title: "task 4",
		description: "another test task",
		created_at: date,
		deadline: date,
		done: true,
	},
	{
		id: "5",
		title: "task 5",
		description: "another test task",
		created_at: date,
		deadline: date,
		done: false,
	},
];

export default function App() {
	const [tasks, setTasks] = useState<Task[]>(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			try {
				return JSON.parse(savedTasks);
			} catch (e) {
				console.error(e);
			}
		}
		return initialTasks;
	});
	const [isOpen, setIsOpen] = useState(false); // for the add task window
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [taskToEdit, setTaskToEdit] = useState<Task | null>();
	const [filterDate, setFilterDate] = useState<string>("");

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
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

	function handleSortTasks(method: "alphabetical" | "dueDate") {
		if (method === "alphabetical") {
			setTasks([...tasks].sort((a, b) => a.title.localeCompare(b.title)));
		} else {
			setTasks(
				[...tasks].sort((a, b) => {
					const timeA = new Date(a.deadline).getTime();
					const timeB = new Date(b.deadline).getTime();
					return timeA - timeB;
				}),
			);
		}
	}

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
				id: Math.random().toString(36).substring(2, 9),
				title: formData.title,
				description: formData.description,
				created_at: date,
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
	const filteredTasks = tasks.filter((task) => {
		if (!filterDate) return true; //  show all tasks
		return task.deadline === filterDate; //  show tasks matching this date
	});
	const todoTasks = filteredTasks.filter((task) => !task.done);
	const doneTasks = filteredTasks.filter((task) => task.done);

	return (
		<div className={`page-wrapper ${isDarkMode ? "dark-theme" : ""}`}>
			<NavBar
				onAddTask={() => {
					setIsEdit(false);
					setIsOpen(true);
				}}
				onSort={handleSortTasks}
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
