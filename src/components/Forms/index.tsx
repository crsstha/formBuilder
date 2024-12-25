import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FormData } from "../../pages/mainPage";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  console.log(fields);
  // Handle form submission
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
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
                  <input {...controlField} type={field.type} />
                  {error && (
                    <span style={{ color: "black" }}>{error.message}</span>
                  )}
                </>
              )}
            />
          </div>
        );

      case "radio":
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            {field.options?.map((option, index) => (
              <label key={index}>
                <Controller
                  name={field.id}
                  control={control}
                  defaultValue={field.value}
                  render={({ field: controlField, fieldState: { error } }) => (
                    <>
                      <input
                        {...controlField}
                        type="radio"
                        value={option}
                        checked={controlField.value === option}
                      />
                      {option}
                      {error && (
                        <span style={{ color: "black" }}>{error.message}</span>
                      )}
                    </>
                  )}
                />
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id}>
            <label>
              <Controller
                name={field.id}
                control={control}
                defaultValue={field.value || false}
                render={({ field: controlField, fieldState: { error } }) => (
                  <>
                    <input
                      {...controlField}
                      type="checkbox"
                      checked={controlField.value}
                      onChange={(e) => controlField.onChange(e.target.checked)}
                    />
                    {field.label}
                    {error && (
                      <span style={{ color: "black" }}>{error.message}</span>
                    )}
                  </>
                )}
              />
            </label>
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
                  <select {...controlField}>
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {error && (
                    <span style={{ color: "black" }}>{error.message}</span>
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map(renderField)}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormBuilder;
