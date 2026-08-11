import React from "react";
import { type Task } from "../types";

interface TaskCardProps {
	task: Task;
	// onToggleComplete: (id: string) => void;
	// onDelete: (id: string) => void;
}

export function TaskCard({ task }: TaskCardProps) {
	return (
		<div
			className={`task-card ${task.done ? "completed" : ""}`}
			style={styles.card}
		>
			<div style={styles.content}>
				<input
					type="checkbox"
					checked={task.done}
					// onChange={() => onToggleComplete(task.id)}
					style={styles.checkbox}
				/>
				<div>
					<h3
						style={{
							textDecoration: task.done ? "line-through" : "none",
							margin: 0,
						}}
					>
						{task.title}
					</h3>
					{task.description && (
						<p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
							{task.description}
						</p>
					)}
				</div>
			</div>
			{/* onClick={() => onDelete(task.id)} */}
			<button style={styles.deleteBtn}>Delete</button>
		</div>
	);
}

// Basic inline styles just to give you a clean starting point (you can replace these with CSS/Tailwind later)
const styles = {
	card: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "12px 16px",
		border: "1px solid #e0e0e0",
		borderRadius: "8px",
		marginBottom: "10px",
		backgroundColor: "#fff",
	},
	content: {
		display: "flex",
		alignItems: "center",
		gap: "12px",
	},
	checkbox: {
		width: "18px",
		height: "18px",
		cursor: "pointer",
	},
	deleteBtn: {
		backgroundColor: "#ff4d4f",
		color: "white",
		border: "none",
		borderRadius: "4px",
		padding: "6px 12px",
		cursor: "pointer",
	},
};

// export default TaskCard;
