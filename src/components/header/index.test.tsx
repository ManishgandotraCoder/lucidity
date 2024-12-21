import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from ".";
import ToggleComponent from "../toggle";

// Mock ToggleComponent
jest.mock("../toggle", () => () => (
  <div data-testid="toggle-component">Toggle</div>
));

describe("Header", () => {
  it("renders the header with the correct structure", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("text-2xl font-bold");
  });

  it("renders the ToggleComponent", () => {
    render(<Header />);
    const toggle = screen.getByTestId("toggle-component");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveTextContent("Toggle");
  });

  it("applies the correct classes to the header container", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("text-white");
  });

  it("applies the correct classes to the wrapper div", () => {
    render(<Header />);
    const wrapper = screen.getByRole("banner").firstChild;
    expect(wrapper).toHaveClass(
      "container mx-auto px-4 py-4 flex justify-between items-center"
    );
  });
});
