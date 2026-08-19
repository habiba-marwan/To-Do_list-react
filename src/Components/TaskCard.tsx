import React from "react";
import { type Task } from "../types";
import "../App.css";
import { APP_TEXT } from "../constants";

interface TaskCardProps {
	task: Task;
	onUpdateTaskStatus: (id: string, isDone: boolean) => void;
	onDelete: (id: string) => void;
	onEdit: (id: string) => void;
}

export function TaskCard({
	task,
	onUpdateTaskStatus,
	onDelete,
	onEdit,
}: TaskCardProps) {
	const { buttons } = APP_TEXT;
	const handleDragStart = (e: React.DragEvent) => {
		e.dataTransfer.setData("taskId", task.id);
	};

	let deadLine = "";
	if (task.deadline) {
		const [y, m, d] = task.deadline.split("-").map(Number);
		deadLine = new Date(y, m - 1, d).toLocaleDateString("en-GB");
	}

	return (
		<div
			className={`task-card ${task.done ? "completed" : ""}`}
			draggable // Enables HTML5 drag and drop
			onDragStart={handleDragStart}
		>
			<div className="task-content">
				<input
					type="checkbox"
					checked={task.done}
					onChange={(e) => onUpdateTaskStatus(task.id, e.target.checked)}
					className="task-checkbox"
				/>
				<div className="task-text">
					<h3
						className={`task-title ${task.done ? "completed-text" : ""}`}
						style={{
							textDecoration: task.done ? "line-through" : "none",
						}}
					>
						{task.title}
					</h3>
					{task.description && (
						<p className={`task-desc ${task.done ? "completed-text" : ""}`}>
							{task.description}
						</p>
					)}
					{task.deadline && (
						<p className={`task-deadline ${task.done ? "completed-text" : ""}`}>
							Due: {deadLine}
						</p>
					)}
				</div>
			</div>

			<button
				className="delete-btn"
				onClick={() => {
					if (window.confirm(`Delete "${task.title}"?`)) onDelete(task.id);
				}}
			>
				{buttons.delete}
			</button>
			<button className="edit-btn" onClick={() => onEdit(task.id)}>
				{buttons.edit}
			</button>
		</div>
	);
}
