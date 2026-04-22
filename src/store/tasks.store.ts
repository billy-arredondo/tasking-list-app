import { create } from "zustand";
import { getNewId } from "../helpers/task.helper";
import { descriptionType, idType, Task } from "../models/Tasks.model";

type TasksStore = {
  tasks: Task[];
  addTask: (description: descriptionType) => void;
  toogleTask: (id: idType) => void;
  removeTask: (id: idType) => void;
};

export const useTasksStore = create<TasksStore>((set) => ({
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
}));
