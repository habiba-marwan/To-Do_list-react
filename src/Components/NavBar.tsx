import React from "react";
import "../App.css";

interface NavBarProps {
	onAddTask: () => void;
	onSort: (method: "alphabetical" | "dueDate") => void;
	isDarkMode: boolean;
	onToggleTheme: () => void;
	onFilterDate: (date: string) => void;
}

export function NavBar({
	onAddTask,
	onSort,
	isDarkMode,
	onToggleTheme,
	onFilterDate,
}: NavBarProps) {
	return (
		<nav className="navbar">
			<div className="nav-logo">
				<span className="logo-icon">✨</span>
				<h1 className="logo-text">To Do</h1>
			</div>

			<div className="nav-actions">
				<button className="theme-toggle-btn" onClick={onToggleTheme}>
					{isDarkMode ? "☀️" : "🌙"}
				</button>
				<select
					className="sort-select"
					onChange={(e) => onSort(e.target.value as "alphabetical" | "dueDate")}
					defaultValue=""
				>
					<option value="none">Sort (Default)</option>
					<option value="alphabetical">Alphabetically</option>
					<option value="dueDate">By Due Date</option>
				</select>
				<div className="filter-container">
					<input
						type="date"
						className="date-filter-input"
						onChange={(e) => onFilterDate(e.target.value)} // Sends the date string (e.g. "2026-08-12") up to App
						title="Filter by due date"
					/>
				</div>
				<button className="add-task-btn" onClick={onAddTask}>
					+ Add Task
				</button>
			</div>
		</nav>
	);
}
