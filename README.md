# Task Manager

That project is a task manager with a structure of Projects-> Tasks.
I'm developing this project to implement some technologies that i've been studying, and also learn others during development.
I plan to implement authentication, at first with jwt authentication, and later use the database for authentication.
Also using Prisma as a ORM, Jest for testing (Yet to learn and implement) and Uploadthing for image storage.

## Objectives

The goal of this project is to implement a task manager with multiple users, projects and tasks.
Each user can create their own project, turning them into the project creator/head admin.
A project can have multiple assigned administrators and users.
Head admin is responsible for managing the privileges of each admin and user.

A project can have multiple tasks, each task can be assigned to a user, the assigment is done manually by whoever has privileges to do so.

## Structure

The main structure of the project is composed of:
A left sidebar that displays multiple options, for a unauthenticated user, shows login and signup buttons, that redirect for the respective pages.
Authenticated users should have access to a list of all the owned projects, the projects that they are admins of and the projects that they are users of.

Other options should be available, such as a link to a dashboard containing all options above.

## Todo:

[X] Implement basic authentication
[X] Authentication pages.
[X] Image upload to UploadThing, as well as image deletion on profile picture changes.
[] Improve database approach for projects and tasks.
[] Add project creation and management, as well as tasks creation and management.
[] Create a configuration system for privileges.
[] Add testing mechanisms.
[] Improve general code structure.
