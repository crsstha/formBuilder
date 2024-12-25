import { Stack } from "react-bootstrap";
import styles from "./styles.module.scss";
import SideBar from "../../components/Sidebar";
import Content from "../../components/Content";
import Forms from "../../components/Forms";
import Header from "../../components/Header";
import { useState } from "react";

export interface FormData {
  formId: string;
  id: string;
  type:
    | "text"
    | "email"
    | "radio"
    | "checkbox"
    | "password"
    | "select"
    | "number";
  label: string;
  value: string | boolean;
  required?: boolean;
  options?: string[]; // For radio and select fields
}
const availableFields: FormData[] = [
  {
    formId: "",
    id: "name",
    type: "text",
    label: "Name",
    value: "",
    required: true,
  },
  {
    formId: "",
    id: "email",
    type: "email",
    label: "Email",
    value: "",
    required: true,
  },
  {
    formId: "",
    id: "gender",
    type: "radio",
    label: "Gender",
    value: "",
    options: ["Male", "Female"],
  },
  {
    formId: "",
    id: "subscribe",
    type: "checkbox",
    label: "Subscribe to newsletter",
    value: false,
  },
  {
    formId: "",
    id: "password",
    type: "password",
    label: "Password",
    value: "",
    required: true,
  },
  {
    formId: "",
    id: "role",
    type: "select",
    label: "Role",
    value: "",
    options: ["Admin", "Editor", "Viewer"],
  },
];

const MainPage = () => {
  const [selectedFields, setSelectedFields] = useState<FormData[]>([]);
  const handleAddField = (field: FormData) => {
    setSelectedFields((prevFields) => {
      const isNameDuplicate = prevFields.some(
        (prevField) => prevField.id === field.id
      );

      const uniqueName = isNameDuplicate
        ? `${field.id}_${Date.now()}`
        : field.id;

      return [
        ...prevFields,
        { ...field, id: uniqueName, formId: Date.now().toString() },
      ];
    });
  };

  const handleRemoveField = (id: string) => {
    setSelectedFields((prevFields) =>
      prevFields.filter((field) => field.formId !== id)
    );
  };

  const handleReorderFields = (updatedFields: FormData[]) => {
    setSelectedFields(updatedFields);
  };

  return (
    <Stack className={styles.container} gap={4}>
      <Header />
      <Stack direction="horizontal" className="align-items-start">
        <SideBar fields={availableFields} onAddField={handleAddField} />
        <Stack>
          <Content
            fields={selectedFields}
            onRemoveField={handleRemoveField}
            onReorderFields={handleReorderFields}
          />
        </Stack>
        <Stack>
          <Forms fields={selectedFields} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MainPage;
