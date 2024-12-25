import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator, MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Stack } from "react-bootstrap";

const DraggableListItem: React.FC<{
  id: string;
  label: string;
  onRemoveField: (id: string) => void;
  onEditField: (id: string) => void;
}> = ({ id, label, onRemoveField, onEditField }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    color: "#121212",
    marginBottom: "10px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "grab",
  };

  // Prevent drag behavior on mouse down when clicking remove button
  const handleRemoveClick = () => {
    onRemoveField(id); // Call the remove handler
  };

  const handleEditClick = () => {
    onEditField(id); // Call the remove handler
  };

  return (
    <li ref={setNodeRef} style={style}>
      <span
        {...attributes}
        {...listeners}
        className="d-flex align-items-center justify-content-center gap-3"
      >
        <MdOutlineDragIndicator />
        {label}
      </span>
      <Stack direction="horizontal">
        <button
          onClick={handleEditClick} // Ensure remove function works
          style={{
            color: "#0d6efd",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FaEdit />
        </button>
        <button
          onClick={handleRemoveClick} // Ensure remove function works
          style={{
            color: "#f44336",
            border: "none",
            cursor: "pointer",
          }}
        >
          <MdOutlineDeleteForever />
        </button>
      </Stack>
    </li>
  );
};

export default DraggableListItem;
