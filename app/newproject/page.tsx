"use client";
import { useState } from "react";

function Page() {
  const [postData, setPostData] = useState<Project>({
    project_name: "",
    project_description: "",
    project_status: "Todo",
    project_start_date: "",
    project_deadline: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function validateForm() {
    let formErrors: { [key: string]: string } = {};
    let key: keyof Project;
    for (key in postData) {
      if (!postData[key]) {
        formErrors[key];
      }
    }
    if (!postData.project_name) {
      formErrors.project_name = "Project name is required";
    }
    if (!postData.project_description) {
      formErrors.project_description = "Project description is required";
    }
    if (!postData.project_start_date) {
      formErrors.project_start_date = "Start date is required";
    }
    if (!postData.project_deadline) {
      formErrors.project_deadline = "Deadline is required";
    }
    setErrors(formErrors);
  }

  function handleOnChange(field: string, value: any) {
    console.log(value);
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit() {
    let key: keyof Project;
    for (key in postData) {
      console.log(postData[key]);
    }
  }

  return (
    <form className="flex flex-col [height:600px] [width:500px] items-center justify-around border-2 border-[color:var(--border-color)] p-10 rounded-md shadow-lg shadow-slate-700">
      <div className="flex justify-around w-full">
        <div className="flex-center flex-col">
          <label>Project status:</label>
          <select
            className="flex-center p-2 bg-slate-300 text-black rounded-xl w-40 mt-2 text-align-last-center"
            onChange={(event) =>
              handleOnChange("project_status", event.target.value)
            }
          >
            <option value="Todo">Todo</option>
            <option value="On Hold">On Hold</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex-center flex-col">
          <label>Project name:</label>
          <input
            type="text"
            name="projectName"
            className="flex-center p-2 bg-slate-300 text-black rounded-xl w-40 mt-2 text-center"
            placeholder="Project Name"
            onChange={(event) =>
              handleOnChange("project_name", event.target.value)
            }
          ></input>
        </div>
      </div>
      <div className="flex justify-around w-full mt-5">
        <div className="flex-center flex-col">
          <label> Start Date:</label>
          <input
            type="date"
            name="projectStartDate"
            className="flex-center p-2 bg-slate-300 text-black rounded-xl w-40 mt-2"
            onChange={(event) =>
              handleOnChange("project_start_date", event.target.value)
            }
          ></input>
        </div>
        <div className="flex-center flex-col">
          <label> Deadline:</label>
          <input
            type="date"
            name="projectDeadLine"
            className="flex-center p-2 bg-slate-300 text-black rounded-xl w-40 mt-2"
            onChange={(event) =>
              handleOnChange("project_deadline", event.target.value)
            }
          ></input>
        </div>
      </div>

      <div className="border-2 border-[color:var(--border-color)] flex flex-col py-4 px-8 rounded-xl text-align-last-center w-full mt-10">
        <label>Describe your project:</label>
        <textarea
          className="w-full rounded-xl p-1 h-44 bg-slate-300 text-black resize-none mt-2"
          name="projectDescription"
          onChange={(event) =>
            handleOnChange("project_description", event.target.value)
          }
        ></textarea>
      </div>

      <input
        type="button"
        value="Create Project"
        className="bg-fuchsia-950 p-6 rounded-xl border-2 my-6 cursor-pointer"
        onClick={handleSubmit}
      ></input>
    </form>
  );
}

export default Page;
