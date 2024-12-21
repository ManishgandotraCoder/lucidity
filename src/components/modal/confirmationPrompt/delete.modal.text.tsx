import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmationPrompt from "./delete.modal";

describe("ConfirmationPrompt", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnConfirm.mockClear();
    mockOnCancel.mockClear();
  });

  it("renders the modal with title and description", () => {
    render(
      <ConfirmationPrompt onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    );
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Do you really want to delete this item? This action cannot be undone."
      )
    ).toBeInTheDocument();
  });

  it("renders the Cancel button", () => {
    render(
      <ConfirmationPrompt onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    );
    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveClass(
      "px-4 py-2 text-lightGreen hover:text-lightGreen focus:outline-none"
    );
  });

  it("renders the Confirm button", () => {
    render(
      <ConfirmationPrompt onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    );
    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton).toHaveClass(
      "px-3 py-1 bg-red-500 text-gray-100 rounded-md hover: focus:outline-none focus:ring-2"
    );
  });

  it("calls onCancel when the Cancel button is clicked", () => {
    render(
      <ConfirmationPrompt onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when the Confirm button is clicked", () => {
    render(
      <ConfirmationPrompt onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    );
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("applies the correct classes for the modal container", () => {
    render(
      <ConfirmationPrompt onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    );
    const modalContainer = screen.getByRole("dialog");
    expect(modalContainer).toHaveClass(
      "fixed inset-0 flex items-center justify-center bg-modalBg bg-opacity-50 z-50"
    );
  });

  it("applies the correct classes for the content box", () => {
    render(
      <ConfirmationPrompt onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    );
    const contentBox = screen.getByText("Are you sure?").closest("div");
    expect(contentBox).toHaveClass("bg-modalBg rounded-lg shadow-lg w-80 p-6");
  });
});
