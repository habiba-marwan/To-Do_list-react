import React from "react";
import { TaskCard } from "./TaskCard";
import { type Task } from "../types";
import "../App.css";

interface TaskColProps {
	title: string;
	isDoneColumn: boolean;
	tasks: Task[];
	onUpdateTaskStatus: (id: string, isDone: boolean) => void;
	onDelete: (id: string) => void;
}

export function TaskCol({
	title,
	isDoneColumn,
	tasks,
	onUpdateTaskStatus,
	onDelete,
}: TaskColProps) {
	// Allows the column to act as a drop target
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	// When a task is dropped, grab its ID and update its status to match this column
	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const taskId = e.dataTransfer.getData("taskId");
		if (taskId) {
			onUpdateTaskStatus(taskId, isDoneColumn);
		}
	};

	return (
		<div
			className="task-column"
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<h2 className="task-column-title">{title}</h2>

			<div className="task-list">
				{tasks.length === 0 ? (
					<p className="empty-state">No tasks here.</p>
				) : (
					tasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							onUpdateTaskStatus={onUpdateTaskStatus}
							onDelete={onDelete}
						/>
					))
				)}
			</div>
		</div>
	);
}
