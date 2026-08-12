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
		<div className="modal-overlay">
			<div className="modal-content">
				<h2 className="modal-title">
					{isEdit ? "let's edit your task Task" : "Let's add a new task"}
				</h2>

				<form onSubmit={handleSubmit} className="add-task-form">
					<div className="input-group">
						<label>Task Title</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="What needs to be done?"
							required
						/>
					</div>

					<div className="input-group">
						<label>Description</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Add some details (optional)"
						/>
					</div>

					<div className="input-group">
						<label>Deadline</label>
						<input
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
