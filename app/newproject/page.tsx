"use client";
import { useState } from "react";

//Function to render the page with the form to create a new project.
function Page() {
  //Object that holds the values to be used on the post request.
  //Uses the type Project.
  const [postData, setPostData] = useState<Project>({
    //Initialize the values of name and description as empty strings, since they are going to be tested for length.
    project_name: "",
    project_description: "",
    project_status: "Todo",
    //Set the start date and deadline to be null.
    project_start_date: null,
    project_deadline: null,
  });

  //Object to hold the errors on the inputs.
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  //Function to validate the postData.
  function validateForm() {
    //Create a new object to hold the input errors temporarily before inserting into the errors object.
    let formErrors: { [key: string]: string } = {};
    let key: keyof Project;

    //If any of the data is null, then add it to the errors object.
    for (key in postData) {
      if (!postData[key]) {
        formErrors[key];
      }
    }

    //Verifies if the project name is long enought.
    if (postData.project_name.length < 3) {
      formErrors.project_name =
        "Project name should be at least 3 characters long.";
    }

    //Verifies if the project description is long enought.
    if (postData.project_description.length == 0) {
      formErrors.project_description = "Project description is required";
    }

    //Verifies if both project dates are not null.
    if (!postData.project_start_date) {
      formErrors.project_start_date = "Start date is required";
    } else if (!postData.project_deadline) {
      formErrors.project_deadline = "Deadline is required";
    }

    //TODO: Do a checking if the start date is earlier than the deadline.
    //TODO: Verify the idea of changing the types of the dates to not support null and validate the dates with the Date constructor.

    setErrors(formErrors);
  }

  //Change the postData values for each field when they are changed.
  function handleOnChange(field: string, value: any) {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  //Verifies if there is any error in the form and do a post request.
  //TODO: Get the response from the api to show it on the frontend.
  async function handleSubmit() {
    validateForm();
    if (Object.keys(errors).length == 0) {
      const response = await fetch("/api/projects/create", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    }
  }

  //Form with a select field for the status, one text input for the name, two date inputs for the dates and one textarea input for the description.
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
