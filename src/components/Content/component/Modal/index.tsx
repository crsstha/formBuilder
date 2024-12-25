import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FormData } from "../../../../pages/mainPage";

interface EditModalProps {
  field: FormData;
  handleSave: (updatedField: FormData) => void;
  showModal: boolean;
  setShowModal: (flag: boolean) => void;
}

const EditFieldModal: React.FC<EditModalProps> = ({
  field,
  handleSave,
  showModal,
  setShowModal,
}) => {
  const [currentField, setCurrentField] = useState<FormData>(field);
  const [newOption, setNewOption] = useState<string>("");

  // Initialize the currentField state with field prop whenever showModal changes
  useEffect(() => {
    if (showModal) {
      setCurrentField(field);
    }
  }, [showModal, field]);

  const handleInputChange = (key: keyof FormData, value: string | boolean) => {
    setCurrentField({ ...currentField, [key]: value });
  };

  const handleAddOption = () => {
    if (newOption.trim() && !currentField.options?.includes(newOption)) {
      setCurrentField((prevField) => ({
        ...prevField,
        options: [...(prevField.options || []), newOption],
      }));
      setNewOption(""); // Reset the input after adding the option
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    setCurrentField((prevField) => ({
      ...prevField,
      options: (prevField.options || []).filter(
        (option) => option !== optionToRemove
      ),
    }));
  };

  const onSave = () => {
    console.log("Updated Field:", currentField);
    handleSave(currentField);
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Field Properties</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Change Label */}
            <Form.Group className="mb-3">
              <Form.Label>Field Label</Form.Label>
              <Form.Control
                type="text"
                value={currentField?.label}
                onChange={(e) => handleInputChange("label", e.target.value)}
              />
            </Form.Group>

            {/* Toggle Required */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Required"
                checked={currentField?.required || false}
                onChange={(e) =>
                  handleInputChange("required", e.target.checked)
                }
              />
            </Form.Group>

            {/* Edit Field Value */}
            <Form.Group className="mb-3">
              {currentField?.type === "radio" ? (
                <>
                  <Form.Label>{currentField?.label}</Form.Label>
                  {(currentField?.options || []).map((option) => (
                    <div
                      key={option}
                      className="d-flex align-items-center mb-2"
                    >
                      <Form.Check
                        type="radio"
                        label={option}
                        name={currentField?.id}
                        value={option}
                        checked={currentField?.value === option}
                        onChange={(e) =>
                          handleInputChange("value", e.target.value)
                        }
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleRemoveOption(option)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="d-flex align-items-center mt-2">
                    <Form.Control
                      type="text"
                      placeholder="New Option"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      className="ms-2"
                      onClick={handleAddOption}
                    >
                      Add
                    </Button>
                  </div>
                </>
              ) : currentField?.type === "checkbox" ? (
                <Form.Check
                  type="checkbox"
                  label={currentField?.label}
                  checked={currentField?.value as boolean}
                  onChange={(e) => handleInputChange("value", e.target.checked)}
                />
              ) : currentField?.type === "select" ? (
                <>
                  <Form.Select
                    value={currentField.value as string}
                    onChange={(e) => handleInputChange("value", e.target.value)}
                  >
                    <option value="">Select {currentField?.label}</option>
                    {(currentField.options || []).map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="d-flex align-items-center mt-2">
                    <Form.Control
                      type="text"
                      placeholder="New Option"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      className="ms-2"
                      onClick={handleAddOption}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="mt-2">
                    {(currentField.options || []).map((option) => (
                      <div
                        key={option}
                        className="d-flex align-items-center mb-2"
                      >
                        <span>{option}</span>
                        <Button
                          variant="danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => handleRemoveOption(option)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditFieldModal;
