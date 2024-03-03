import Link from "next/link";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
function Project(props: any) {
  //Parses the date to not show the hours.
  function formatDate(dateString: Date) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    //Get the month, add one since it returns since 0, and add a padding 0 to the left for months smaller than 10.
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Construct the formatted date string
    return `${day}-${month}-${year}`;
  }

  //Handle the deletion of the project.
  function handleDeletion() {
    const result = window.confirm("Are you sure you want to delete this item?");
    if (result) {
      props.handleDeletion(props.project_id);
    }
  }

  return (
    <div className="h-20 p-2 default-border flex items-center justify-between w-200 bg-slate-700 shadow-md shadow-slate-800 bg-opacity-30 hover:scale-105 transition-all">
      <div className="h-full flex flex-col overflow-hidden">
        <div className="text-xs flex justify-center  border-b">
          Project Name
        </div>
        <div className="flex-1 flex-center min-w-40 max-w-40 overflow-x-scroll">
          {props.project_name}
        </div>
      </div>
      <div className="h-full flex flex-col">
        <div className="text-xs flex justify-center  border-b">Status</div>
        <div className="flex-1 flex-center max-w-32 min-w-32">
          {props.project_status}
        </div>
      </div>
      <div className="h-full flex flex-col">
        <div className="text-xs flex justify-center  border-b">Start Date</div>
        <div className="flex-1 flex-center max-w-32 min-w-32">
          {formatDate(props.project_start_date)}
        </div>
      </div>
      <div className="h-full flex flex-col">
        <div className="text-xs flex justify-center  border-b">Deadline</div>
        <div className="flex-1 flex-center max-w-32 min-w-32">
          {formatDate(props.project_deadline)}
        </div>
      </div>
      <Link className="cursor-pointer" href={`/projects/${props.project_id}`}>
        <FaPencil className="text-green-800 text-2xl" />
      </Link>
      <FaRegTrashCan
        className="text-red-800 text-2xl cursor-pointer"
        onClick={() => {
          if (props.project_id) handleDeletion();
        }}
      />
    </div>
  );
}

export default Project;
