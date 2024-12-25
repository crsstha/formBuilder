import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FormData } from "../../pages/mainPage";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles.module.scss";
import {
  Button,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Stack,
} from "react-bootstrap";

// Zod Validation Schema
const createZodSchema = (fields: FormData[]) => {
  const schemaShape: any = {};

  fields.forEach((field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
        schemaShape[field.id] = z
          .string()
          .min(1, { message: `${field.label} is required` });
        break;
      case "radio":
        schemaShape[field.id] = z
          .string()
          .min(1, { message: `Please select a ${field.label}` });
        break;
      case "checkbox":
        schemaShape[field.id] = z.boolean().refine((val) => val === true, {
          message: `${field.label} must be checked`,
        });
        break;
      case "select":
        schemaShape[field.id] = z
          .string()
          .min(1, { message: `Please select a ${field.label}` });
        break;
      default:
        break;
    }
  });

  return z.object(schemaShape);
};

const FormBuilder: React.FC<{ fields: FormData[] }> = ({ fields }) => {
  const dynamicSchema = createZodSchema(fields);

  const { control, handleSubmit } = useForm<any>({
    resolver: zodResolver(dynamicSchema), // Pass the dynamically created Zod schema
  });
  // Handle form submission
  const onSubmit = (data: FormData) => {
    alert(`Form submission: ${JSON.stringify(data, null, 2)}`);
  };

  // Function to render form fields based on type
  const renderField = (field: FormData) => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.value}
              render={({ field: controlField, fieldState: { error } }) => (
                <>
                  <FormControl {...controlField} type={field.type} />
                  {error && (
                    <span style={{ color: "red" }}>{error.message}</span>
                  )}
                </>
              )}
            />
          </div>
        );

      case "radio":
        return (
          <Stack
            key={field.id}
            direction="horizontal"
            gap={2}
            className="align-items-center"
          >
            <FormLabel className="m-0">{field.label}</FormLabel>
            {field.options?.map((option, index) => (
              <label key={index}>
                <Controller
                  name={field.id}
                  control={control}
                  defaultValue={field.value}
                  render={({ field: controlField, fieldState: { error } }) => (
                    <Stack direction="horizontal" gap={2}>
                      <FormCheck
                        {...controlField}
                        type="radio"
                        value={option}
                        checked={controlField.value === option}
                      />
                      {option}
                      {error && (
                        <span style={{ color: "red" }}>{error.message}</span>
                      )}
                    </Stack>
                  )}
                />
              </label>
            ))}
          </Stack>
        );

      case "checkbox":
        return (
          <div key={field.id}>
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.value || false}
              render={({ field: controlField, fieldState: { error } }) => (
                <>
                  <Stack direction="horizontal" gap={2}>
                    <FormCheck
                      {...controlField}
                      type="checkbox"
                      checked={controlField.value}
                      onChange={(e) => controlField.onChange(e.target.checked)}
                    />
                    {field.label}
                  </Stack>
                  {error && (
                    <span style={{ color: "red" }}>{error.message}</span>
                  )}
                </>
              )}
            />
          </div>
        );

      case "select":
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.value}
              render={({ field: controlField, fieldState: { error } }) => (
                <>
                  <FormSelect {...controlField}>
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </FormSelect>
                  {error && (
                    <span style={{ color: "red" }}>{error.message}</span>
                  )}
                </>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Stack className={styles.form}>
      <h2>Form</h2>
      {fields.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>{fields.map(renderField)}</Stack>
          <Button className="mt-3" type="submit">
            Submit
          </Button>
        </form>
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <h3>No Available Form</h3>
        </div>
      )}
    </Stack>
  );
};

export default FormBuilder;
