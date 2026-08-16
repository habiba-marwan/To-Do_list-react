import React, { useState } from "react";
import "../App.css";
import { type Task } from "../types";

interface AddTaskProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (newTask: {
		title: string;
		description: string;
		deadline: string;
	}) => void;
	isEdit: boolean;
	initialData?: Task | null;
}

export function AddTask({
	isOpen,
	onClose,
	onAdd,
	isEdit,
	initialData,
}: AddTaskProps) {
	const [title, setTitle] = useState(initialData?.title || "");
	const [description, setDescription] = useState(
		initialData?.description || "",
	);
	const [deadline, setDeadline] = useState(initialData?.deadline || "");

	// wait till we click button
	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		// Send the data back up to App.tsx
		onAdd({ title, description, deadline });

		setTitle("");
		setDescription("");
		setDeadline("");

		onClose();
	};

	return (
		<div
			className="modal-overlay"
			onClick={onClose}
			onKeyDown={(e) => e.key === "Escape" && onClose()}
			tabIndex={-1}
		>
			<div
				className="modal-content"
				role="dialog"
				aria-modal="true"
				aria-labelledby="task-modal-title"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="task-modal-title" className="modal-title">
					{isEdit ? "Let's edit your task" : "Let's add a new task"}
				</h2>

				<form onSubmit={handleSubmit} className="add-task-form">
					<div className="input-group">
						<label htmlFor="task-title">Task Title</label>
						<input
							type="text"
							id="task-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="What needs to be done?"
							required
							maxLength={200}
							autoFocus
						/>
					</div>

					<div className="input-group">
						<label htmlFor="task-desc">Description</label>
						<textarea
							id="task-desc"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Add some details (optional)"
							maxLength={2000}
						/>
					</div>

					<div className="input-group">
						<label htmlFor="task-deadline">Deadline</label>
						<input
							id="task-deadline"
							type="date"
							value={deadline}
							onChange={(e) => setDeadline(e.target.value)}
						/>
					</div>

					<div className="modal-actions">
						<button type="button" className="cancel-btn" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="save-task-btn">
							{isEdit ? "Save Changes" : "Save Task"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
