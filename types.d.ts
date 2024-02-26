type Project = {
  project_id: number;
  project_name: string | null;
  project_description?: string | null;
  project_status?: string;
};

type Task = {
  task_id: number;
  project_id: number;
  task_name: string;
  task_description?: string | null;
  task_user?: number | null;
  task_status?: "Completed" | "On Hold" | "In Progress" | "Todo" | null;
  task_urgency?: "Critical" | "Urgent" | "Alert" | "Normal" | "Low" | null;
};

type User = {
  user_id: number;
  user_name: string;
};
