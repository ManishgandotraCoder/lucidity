import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import ToggleSwitch from "./index";

// Mock useSearchParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("ToggleSwitch", () => {
  let mockSearchParams: URLSearchParams;
  let mockSetSearchParams: jest.Mock;

  beforeEach(() => {
    mockSearchParams = new URLSearchParams("role=admin");
    mockSetSearchParams = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial admin role", () => {
    render(
      <MemoryRouter>
        <ToggleSwitch />
      </MemoryRouter>
    );

    const adminLabel = screen.getByText("Admin");
    const userLabel = screen.getByText("User");
    const toggleButton = screen.getByRole("button");

    expect(adminLabel).toHaveClass("font-medium text-lightGreen");
    expect(userLabel).toHaveClass("text-white");
    expect(toggleButton).toHaveClass("bg-lightGreen");
    expect(toggleButton.firstChild).toHaveClass("translate-x-5");
  });

  it("renders with initial user role", () => {
    mockSearchParams.set("role", "user");

    render(
      <MemoryRouter>
        <ToggleSwitch />
      </MemoryRouter>
    );

    const adminLabel = screen.getByText("Admin");
    const userLabel = screen.getByText("User");
    const toggleButton = screen.getByRole("button");

    expect(adminLabel).toHaveClass("text-white");
    expect(userLabel).toHaveClass("font-medium text-lightGreen");
    expect(toggleButton).toHaveClass("bg-gray-400");
    expect(toggleButton.firstChild).toHaveClass("translate-x-0");
  });

  it("toggles from admin to user role when clicked", () => {
    render(
      <MemoryRouter>
        <ToggleSwitch />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams("role=user")
    );
    expect(toggleButton).toHaveClass("bg-gray-400");
    expect(toggleButton.firstChild).toHaveClass("translate-x-0");

    const adminLabel = screen.getByText("Admin");
    const userLabel = screen.getByText("User");
    expect(adminLabel).toHaveClass("text-white");
    expect(userLabel).toHaveClass("font-medium text-lightGreen");
  });

  it("toggles from user to admin role when clicked", () => {
    mockSearchParams.set("role", "user");

    render(
      <MemoryRouter>
        <ToggleSwitch />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams("role=admin")
    );
    expect(toggleButton).toHaveClass("bg-lightGreen");
    expect(toggleButton.firstChild).toHaveClass("translate-x-5");

    const adminLabel = screen.getByText("Admin");
    const userLabel = screen.getByText("User");
    expect(adminLabel).toHaveClass("font-medium text-lightGreen");
    expect(userLabel).toHaveClass("text-white");
  });
});
