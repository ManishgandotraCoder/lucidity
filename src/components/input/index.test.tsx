import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputComponent from "./index";

describe("InputComponent", () => {
  it("renders the component with a label", () => {
    render(<InputComponent label="Name" value="" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders without a label", () => {
    render(<InputComponent label="Label" value="" onChange={jest.fn()} />);
    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
  });

  it("renders with a prefix icon", () => {
    render(
      <InputComponent
        label="Search"
        value=""
        onChange={jest.fn()}
        prefixIcon={<span>🔍</span>}
      />
    );
    expect(screen.getByText("🔍")).toBeInTheDocument();
  });

  it("disables the input when the `disabled` prop is true", () => {
    render(
      <InputComponent label="Email" value="" onChange={jest.fn()} disabled />
    );
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("calls `onChange` when the input value changes", () => {
    const handleChange = jest.fn();
    render(
      <InputComponent label="Username" value="" onChange={handleChange} />
    );
    const input = screen.getByLabelText("Username");
    fireEvent.change(input, { target: { value: "JohnDoe" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders the correct value from the `value` prop", () => {
    render(
      <InputComponent label="Password" value="12345" onChange={jest.fn()} />
    );
    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input.value).toBe("12345");
  });

  it("displays the placeholder text correctly", () => {
    render(<InputComponent label="City" value="" onChange={jest.fn()} />);
    const input = screen.getByLabelText("City") as HTMLInputElement;
    expect(input.placeholder).toBe("Enter City");
  });
});
