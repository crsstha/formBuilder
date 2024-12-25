import React from "react";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter } from "@dnd-kit/core";
import DraggableListItem from "./component/DragableList";
import { FormData } from "../../pages/mainPage";
import { Stack } from "react-bootstrap";

const SelectedFieldsList: React.FC<{
  fields: FormData[];
  onRemoveField: (id: string) => void;
  onReorderFields: (updatedFields: FormData[]) => void;
}> = ({ fields, onRemoveField, onReorderFields }) => {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.formId === active.id);
      const newIndex = fields.findIndex((field) => field.formId === over?.id);
      const updatedFields = arrayMove(fields, oldIndex, newIndex);
      onReorderFields(updatedFields); // Pass reordered fields
    }
  };

  return (
    <Stack className="p-2">
      <h2 className="mb-3">Selected Fields</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={fields.map((field) => field.formId)}
          strategy={verticalListSortingStrategy}
        >
          {fields.length === 0 ? (
            <h3>Please select some form fields</h3>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {fields.map((field) => (
                <DraggableListItem
                  key={field.formId}
                  id={field.formId}
                  label={field.label}
                  onRemoveField={onRemoveField}
                />
              ))}
            </ul>
          )}
        </SortableContext>
      </DndContext>
    </Stack>
  );
};

export default SelectedFieldsList;
