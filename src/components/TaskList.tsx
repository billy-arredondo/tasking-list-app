import { Container, Table } from "react-bootstrap";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../models/Tasks.model";
import TaskItem from "./TaskItem";
import TaskNew from "./TaskNew";

type TaskListProps = {
  theme: "light" | "dark";
};

export const TaskList = ({ theme }: TaskListProps) => {
  const { tasks, addTask, toogleTask, removeTask } = useTasks();
  const isDarkTheme = theme === "dark";

  return (
    <Container className='mt-5 col-lg-7'>
      <TaskNew handleAdd={addTask} theme={theme} />
      <Table bordered hover className='mt-4' variant={isDarkTheme ? "dark" : undefined}>
        <thead>
          <tr>
            <th className='col-8 col-md-10'>Task</th>
            <th className='col-4 col-md-2 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: Task, index: number) => (
            <TaskItem
              key={index}
              task={task}
              handleToggle={toogleTask}
              handleRemove={removeTask}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
