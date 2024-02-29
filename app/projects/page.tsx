"use client";

import React, { useState, useEffect } from "react";
import Project from "../components/Project";

function ProjectPage() {
  //Use State that contains the projects.
  const [projects, setProjects] = useState<Project[]>([]);
  //Use state that defines if the reload is required.
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/projects/get");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProjects(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    //Fetch the data and then enable the next reload.
    fetchData();
    setReload(false);
  }, [reload]);

  //Method to be passed to the projects in order to call it's own deletion.
  function handleProjectDeletion(project_id: number) {
    fetch(`/api/projects/delete?project_id=${project_id}`, {
      method: "DELETE",
    });
    setReload(true);
  }

  return (
    <div className="default-border p-20">
      {projects.map((project) => {
        return (
          <Project
            key={project.project_id}
            {...project}
            handleDeletion={handleProjectDeletion}
          />
        );
      })}
    </div>
  );
}

export default ProjectPage;
