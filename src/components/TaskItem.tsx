import { BsCheckCircle, BsDashCircle, BsGripVertical } from "react-icons/bs";
import { idType, Task } from "../models/Tasks.model";

type TaskItemProps = {
  task: Task;
  handleToggle: (id: idType) => void;
  handleRemove: (id: idType) => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  isDragOver: boolean;
};

const TaskItem = ({ task, handleToggle, handleRemove, onDragStart, onDragOver, onDrop, isDragOver }: TaskItemProps) => {
  return (
    <tr
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        cursor: "grab",
        opacity: isDragOver ? 0.5 : 1,
        borderTop: isDragOver ? "2px solid #0d6efd" : undefined,
      }}
    >
      <td
        className={`${
          task.done ? "text-decoration-line-through text-muted" : ""
        }`}
        onClick={() => handleToggle(task.id)}
        style={{ userSelect: "none" }}
      >
        <BsGripVertical className="me-2 text-muted" style={{ cursor: "grab" }} />
        {task.description}
      </td>
      <td className='text-center'>
        {task.done ? (
          <BsCheckCircle title={`${task.description} is done`} />
        ) : (
          <BsDashCircle
            cursor={"pointer"}
            title={`Remove ${task.description}`}
            onClick={() => handleRemove(task.id)}
          />
        )}
      </td>
    </tr>
  );
};

export default TaskItem;
