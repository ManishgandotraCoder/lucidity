import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormModalComponent from "./form.modal";
import { InputInterface } from "../../input/interface";
import React from "react";

// Mock InputComponent
jest.mock("../../input/index.tsx", () => (props: InputInterface) => (
  <input
    data-testid={`input-${props.label}`}
    value={props.value}
    onChange={props.onChange}
    disabled={props.disabled}
  />
));

describe("FormModalComponent", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  const emptyRow = {
    name: "",
    price: "",
    quantity: 0,
    category: "",
    enabled: false,
    value: "0",
  };
  const defaultProps = {
    isOpen: {
      status: true,
      row: {
        name: "Item 1",
        price: "10",
        quantity: 2,
        category: "Electronics",
        enabled: true,
        value: "20",
      },
    },
    onClose: mockOnClose,
    onSave: mockOnSave,
    title: "Edit Item",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal when isOpen is true", () => {
    render(<FormModalComponent {...defaultProps} />);
    expect(screen.getByText("Edit Item")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <FormModalComponent
        {...defaultProps}
        isOpen={{ status: false, row: emptyRow }}
      />
    );
    expect(screen.queryByText("Edit Item")).not.toBeInTheDocument();
  });

  it("displays the correct initial form values", () => {
    render(<FormModalComponent {...defaultProps} />);
    expect(screen.getByTestId("input-Category")).toHaveValue("Electronics");
    expect(screen.getByTestId("input-Price")).toHaveValue("10");
    expect(screen.getByTestId("input-Quantity")).toHaveValue("2");
    expect(screen.getByTestId("input-Value")).toHaveValue("20");
  });

  it("updates form data on input change", () => {
    render(<FormModalComponent {...defaultProps} />);
    const priceInput = screen.getByTestId("input-Price");
    fireEvent.change(priceInput, { target: { value: "20" } });
    expect(priceInput).toHaveValue("20");
    const valueInput = screen.getByTestId("input-Value");
    expect(valueInput).toHaveValue("40"); // Value should update automatically
  });

  it("calls onClose when the Cancel button is clicked", () => {
    render(<FormModalComponent {...defaultProps} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onSave with correct form data when Save button is clicked", () => {
    render(<FormModalComponent {...defaultProps} />);
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenCalledWith({
      name: "Item 1",
      price: "10",
      quantity: 2,
      value: "20",
      category: "Electronics",
      enabled: true,
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("closes the modal when Save button is clicked", () => {
    render(<FormModalComponent {...defaultProps} />);
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("applies the correct classes to the modal container", () => {
    render(<FormModalComponent {...defaultProps} />);

    // Find the modal container directly
    const modalContainer = screen.getByRole("dialog");

    // Assert that it has the correct classes
    expect(modalContainer).toHaveClass(
      "bg-modalBg rounded-lg shadow-lg p-4 animate-fade-in"
    );
  });
});
