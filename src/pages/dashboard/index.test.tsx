import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardContainer from "./index.container"; // Update the path if necessary
import { InventoryInterface } from "../../redux/authInterfaces";
import { MemoryRouter, useSearchParams } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));
jest.mock("../../components/table/index", () => {
  return function MockTable({ data, columns, onEdit, onView, onDelete }: any) {
    return (
      <table role="table">
        <thead>
          <tr>
            {columns.map((col: any, index: number) => (
              <th key={index}>{col.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, index: number) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.quantity}</td>
              <td>
                <button onClick={() => onEdit(row)}>Edit</button>
                <button onClick={() => onView(row)}>View</button>
                <button onClick={() => onDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
});

describe("DashboardContainer Component", () => {
  const mockInventoryList: InventoryInterface[] = [
    {
      enabled: true,
      quantity: 3,
      value: "100",
      category: "Electronics",
      name: "Product 1",
      price: "1000",
    },
  ];
  const mockColumns = [
    {
      key: "name" as keyof InventoryInterface,
      header: "Name",
      accessor: "name",
    },
    {
      key: "quantity" as keyof InventoryInterface,
      header: "Quantity",
      accessor: "quantity",
    },
  ];

  const mockHandleAction = jest.fn();
  const renderTableInvEmpty = (role: string) => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(`role=${role}`),
      jest.fn(),
    ]);

    return render(
      <MemoryRouter>
        <DashboardContainer
          inventoryList={[]}
          handleAction={mockHandleAction}
          columns={mockColumns}
        />
      </MemoryRouter>
    );
  };

  const renderTableInvFulfilled = (role: string) => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(`role=${role}`),
      jest.fn(),
    ]);

    return render(
      <MemoryRouter>
        <DashboardContainer
          inventoryList={mockInventoryList}
          handleAction={mockHandleAction}
          columns={mockColumns}
        />
      </MemoryRouter>
    );
  };

  it("should render the DashboardContainer without crashing", () => {
    renderTableInvEmpty("admin");
    expect(screen.getByText(/Inventory Stats/i)).toBeInTheDocument();
  });

  it("should render the Header component", () => {
    renderTableInvFulfilled("admin");
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render all cards with correct titles", () => {
    renderTableInvFulfilled("admin");

    expect(screen.getByText(/Total Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Store Value/i)).toBeInTheDocument();
    // expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
    expect(screen.getByText(/No. of Categories/i)).toBeInTheDocument();
  });

  it("should calculate card values correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <DashboardContainer
          inventoryList={mockInventoryList}
          handleAction={mockHandleAction}
          columns={mockColumns}
        />
      </MemoryRouter>
    );

    // expect(getByText("3")).toBeInTheDocument();
    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
  });

  it("should render the Table component with correct props", () => {
    render(
      <DashboardContainer
        inventoryList={mockInventoryList}
        handleAction={mockHandleAction}
        columns={mockColumns}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument(); // Ensure data is rendered
  });

  it("should trigger handleAction callbacks on table actions", () => {
    renderTableInvFulfilled("admin");
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    expect(mockHandleAction).toHaveBeenCalledWith("Edit", mockInventoryList[0]);

    const viewButton = screen.getByText("View");
    fireEvent.click(viewButton);
    expect(mockHandleAction).toHaveBeenCalledWith("View", mockInventoryList[0]);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockHandleAction).toHaveBeenCalledWith(
      "Delete",
      mockInventoryList[0]
    );
  });

  it("should have correct background and text colors", () => {
    const { container } = renderTableInvEmpty("admin");
    expect(container.firstChild).toHaveClass("bg-darkBackground");
    expect(container.firstChild).toHaveClass("text-light");
  });
});
