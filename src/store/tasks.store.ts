import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getNewId } from "../helpers/task.helper";
import { descriptionType, idType, Task } from "../models/Tasks.model";

type TasksStore = {
  tasks: Task[];
  addTask: (description: descriptionType) => void;
  toogleTask: (id: idType) => void;
  removeTask: (id: idType) => void;
  reorderTasks: (fromIndex: number, toIndex: number) => void;
};

export const useTasksStore = create<TasksStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (description) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: getNewId(state.tasks),
              description,
              done: false,
            },
          ],
        })),
      toogleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
          ),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      reorderTasks: (fromIndex, toIndex) =>
        set((state) => {
          const updated = [...state.tasks];
          const [moved] = updated.splice(fromIndex, 1);
          updated.splice(toIndex, 0, moved);
          return { tasks: updated };
        }),
    }),
    { name: "tasks" }
  )
);
