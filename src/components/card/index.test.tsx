import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import CardComponent from ".";

describe("CardComponent", () => {
  it("renders the component with title, value, and icon", () => {
    render(<CardComponent icon={faCoffee} title="Card Title" value="42" />);
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();

    // Check for `svg-inline--fa` instead of `fa-coffee`
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "svg-inline--fa"
    );
  });

  it("applies the correct classes for the icon", () => {
    render(<CardComponent icon={faCoffee} title="Card Title" value="42" />);
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("text-white text-lg svg-inline--fa");
  });

  it("renders with a custom title", () => {
    render(<CardComponent icon={faCoffee} title="Custom Title" value="99" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders with a custom value", () => {
    render(<CardComponent icon={faCoffee} title="Card Title" value="12345" />);
    expect(screen.getByText("12345")).toBeInTheDocument();
  });

  it("does not render if title is missing", () => {
    const { container } = render(
      <CardComponent icon={faCoffee} value="99" title={""} />
    );
    expect(container).toBeEmptyDOMElement(); // Verify component does not render
  });

  it("does not render if value is missing", () => {
    const { container } = render(
      <CardComponent icon={faCoffee} title="Card Title" value="" />
    );
    expect(container).toBeEmptyDOMElement(); // Verify component does not render
  });
});
