import React from "react";
import { type Task } from "../types";
import "../App.css";

interface TaskCardProps {
	task: Task;
	onUpdateTaskStatus: (id: string, isDone: boolean) => void;
	onDelete: (id: string) => void;
}

export function TaskCard({
	task,
	onUpdateTaskStatus,
	onDelete,
}: TaskCardProps) {
	// Packages the task ID into the drag event so the column knows what was dropped
	const handleDragStart = (e: React.DragEvent) => {
		e.dataTransfer.setData("taskId", task.id);
	};

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
					// Toggling the checkbox acts exactly like dropping it in the other column
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
				</div>
			</div>

			<button className="delete-btn" onClick={() => onDelete(task.id)}>
				Delete
			</button>
		</div>
	);
}
