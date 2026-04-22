import { useTasksStore } from "../store/tasks.store";

export const useTasks = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const addTask = useTasksStore((state) => state.addTask);
  const toogleTask = useTasksStore((state) => state.toogleTask);
  const removeTask = useTasksStore((state) => state.removeTask);

  return {
    tasks,
    addTask,
    toogleTask,
    removeTask,
  };
};
