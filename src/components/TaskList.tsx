import { useRef, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../models/Tasks.model";
import TaskItem from "./TaskItem";
import TaskNew from "./TaskNew";

type TaskListProps = {
  theme: "light" | "dark";
};

export const TaskList = ({ theme }: TaskListProps) => {
  const { tasks, addTask, toogleTask, removeTask, reorderTasks } = useTasks();
  const isDarkTheme = theme === "dark";
  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (toIndex: number) => {
    const fromIndex = dragIndexRef.current;
    if (fromIndex !== null && fromIndex !== toIndex) {
      reorderTasks(fromIndex, toIndex);
    }
    dragIndexRef.current = null;
    setDragOverIndex(null);
  };

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
              key={task.id}
              task={task}
              handleToggle={toogleTask}
              handleRemove={removeTask}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              isDragOver={dragOverIndex === index}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
