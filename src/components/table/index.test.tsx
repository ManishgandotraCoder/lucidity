import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from ".";
import { MemoryRouter } from "react-router-dom";
import { InventoryInterface } from "../../redux/authInterfaces";
import { useSearchParams } from "react-router-dom";
import {
  ConfirmationPromptInterface,
  FormModalInterface,
} from "../modal/interface";
import React from "react";
// Mock Modals
jest.mock("../modal/form/form.modal", () => (props: FormModalInterface) => (
  <div data-testid="modal">{props.title}</div>
));
jest.mock(
  "../modal/confirmationPrompt/delete.modal",
  () => (props: ConfirmationPromptInterface) =>
    (
      <div data-testid="confirmation-prompt">
        <button onClick={props.onConfirm}>Confirm</button>
        <button onClick={props.onCancel}>Cancel</button>
      </div>
    )
);

// Mock useSearchParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("Table Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnView = jest.fn();
  const mockOnDelete = jest.fn();

  const data: InventoryInterface[] = [
    {
      name: "Bluetooth",
      category: "Electronic",
      value: "$150",
      price: "$30",
      quantity: 5,
      enabled: true,
    },
    {
      name: "Edifier",
      category: "Electronic",
      value: "$100",
      price: "$50",
      quantity: 10,
      enabled: false,
    },
  ];

  const columns = [
    { header: "Name", key: "name" as keyof InventoryInterface },
    { header: "Price", key: "price" as keyof InventoryInterface },
    { header: "Actions", key: "actions" as "actions" },
  ];

  const defaultProps = {
    data,
    columns,
    onEdit: mockOnEdit,
    onView: mockOnView,
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTable = (role: string) => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(`role=${role}`),
      jest.fn(),
    ]);

    return render(
      <MemoryRouter>
        <Table {...defaultProps} />
      </MemoryRouter>
    );
  };

  it("renders the table with correct columns and data", () => {
    renderTable("admin");
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Bluetooth")).toBeInTheDocument();
    expect(screen.getByText("Edifier")).toBeInTheDocument();
  });

  it("disables actions for user role", () => {
    renderTable("user");
    const editIcons = screen.getAllByLabelText("edit");
    expect(editIcons[0]).toHaveClass("cursor-not-allowed");
    const viewIcons = screen.getAllByLabelText("view");
    expect(viewIcons[0]).toHaveClass("cursor-not-allowed");
    const deleteIcons = screen.getAllByLabelText("delete");
    expect(deleteIcons[0]).toHaveClass("cursor-not-allowed");
  });

  it("enables actions for admin role", () => {
    renderTable("admin");
    const editIcons = screen.getAllByLabelText("edit");
    expect(editIcons[0]).not.toHaveClass("cursor-not-allowed");
    const viewIcons = screen.getAllByLabelText("view");
    expect(viewIcons[0]).not.toHaveClass("cursor-not-allowed");
    const deleteIcons = screen.getAllByLabelText("delete");
    expect(deleteIcons[0]).not.toHaveClass("cursor-not-allowed");
  });

  it("opens the edit modal when edit icon is clicked", () => {
    renderTable("admin");
    const editIcon = screen.getAllByLabelText("edit")[0];
    fireEvent.click(editIcon);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("calls onView when view icon is clicked", () => {
    renderTable("admin");
    const viewIcon = screen.getAllByLabelText("view")[0];
    fireEvent.click(viewIcon);
    expect(mockOnView).toHaveBeenCalledWith({
      ...data[0],
      enabled: !data[0].enabled,
    });
  });

  it("opens the confirmation prompt when delete icon is clicked", () => {
    renderTable("admin");
    const deleteIcon = screen.getAllByLabelText("delete")[0];
    fireEvent.click(deleteIcon);
    expect(screen.getByTestId("confirmation-prompt")).toBeInTheDocument();
  });

  it("calls onDelete when delete confirmation is confirmed", () => {
    renderTable("admin");
    const deleteIcon = screen.getAllByLabelText("delete")[0];
    fireEvent.click(deleteIcon);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(mockOnDelete).toHaveBeenCalledWith(data[0]);
  });

  it("closes the delete confirmation when canceled", () => {
    renderTable("admin");
    const deleteIcon = screen.getAllByLabelText("delete")[0];
    fireEvent.click(deleteIcon);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(screen.queryByTestId("confirmation-prompt")).not.toBeInTheDocument();
  });
});
