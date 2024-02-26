create table tb_project(
    project_id int auto_increment primary key,
    project_name varchar(50) not null unique,
    project_description tinytext not null,
    project_status enum("Completed", "On Hold", "In Progress", "Todo") DEFAULT "TODO",
    project_start_date date,
    project_deadline date
);

create table tb_user(
    user_id int auto_increment primary key,
    user_name varchar(50) not null
);

create table tb_task(
    task_id int primary key auto_increment,
    project_id int not null,
    task_name varchar(50) not null unique,
    task_description text,
    task_user int,
    task_status enum("Completed", "On Hold", "In Progress", "Todo") DEFAULT "Todo",
    task_urgency enum("Critical", "Urgent", "Alert", "Normal", "Low") DEFAULT "Normal",
    task_start_date date,
    task_deadline date,
    foreign key(project_id) references tb_project(project_id),
    foreign key(task_user) references tb_user(user_id)
);