import React from "react";
import { FormData } from "../../pages/mainPage";
import { MdOutlineFormatAlignLeft } from "react-icons/md";
import { Stack } from "react-bootstrap";
import FormBuilderCard from "./component/card";
import styles from "./styles.module.scss";

const Sidebar: React.FC<{
  fields: FormData[];
  onAddField: (field: FormData) => void;
}> = ({ fields, onAddField }) => {
  return (
    <div className={styles.sidebar}>
      <Stack direction="horizontal" gap={2} className="align-items-center mb-3">
        <MdOutlineFormatAlignLeft className={styles.icon} />
        <h2 className="m-0">Form Fields</h2>
      </Stack>
      <Stack gap={2}>
        {fields.map((field) => (
          <div key={field.id} onClick={() => onAddField(field)}>
            <FormBuilderCard variant="outline" padding="sm">
              {field.label}
            </FormBuilderCard>
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default Sidebar;
