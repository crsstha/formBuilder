import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator, MdOutlineDeleteForever } from "react-icons/md";
("");

const DraggableListItem: React.FC<{
  id: string;
  label: string;
  onRemoveField: (id: string) => void;
}> = ({ id, label, onRemoveField }) => {
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
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent drag behavior from being triggered on button click
    onRemoveField(id); // Call the remove handler
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
    </li>
  );
};

export default DraggableListItem;
