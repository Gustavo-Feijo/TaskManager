type Project = {
  project_id?: number | null;
  project_name: string;
  project_description: string;
  project_status: string;
  project_start_date: string;
  project_deadline: string;
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
