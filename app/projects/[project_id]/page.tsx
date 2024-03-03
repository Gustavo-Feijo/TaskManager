"use client";

import React, { useEffect, useState } from "react";

interface ProjectProps {
  params: {
    project_id: number;
  };
}
function Project({ params }: ProjectProps) {
  const [project, setProject] = useState<Project>();
  const [tasks, setTasks] = useState<Task>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/projects/get?project_id=${params.project_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProject(data.result[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    //Fetch the data and then enable the next reload.
    fetchData();
  }, [params.project_id]);

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

  return (
    <div className="w-3/4">
      <div className="default-border min-h-160 min-w-full w-full flex">
        <div className="w-56 border-r-2 border-zinc-900">
          <div className="w-full h-20 border-b-2 flex-center flex-col">
            {project ? (
              <div className="w-full flex-1">
                <div className="flex justify-between items-center h-1/2">
                  <div className="flex-1 flex-center">
                    {project.project_name}:
                  </div>
                  <div className="flex-1 flex-center">
                    {project.project_status}
                  </div>
                </div>
                <div className="flex justify-between items-center h-1/2">
                  <div className="flex-1 flex-center text-green-200">
                    {formatDate(project.project_start_date)}
                  </div>
                  <div className="flex-1 flex-center text-red-200">
                    {formatDate(project.project_deadline)}
                  </div>
                </div>
                {tasks ? <div></div> : <>LOADING</>}
              </div>
            ) : (
              <>LOADING</>
            )}
          </div>
        </div>
        {params.project_id}
      </div>
    </div>
  );
}

export default Project;
