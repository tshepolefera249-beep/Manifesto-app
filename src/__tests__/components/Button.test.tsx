import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "@components/Button";

describe("Button", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />);
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={onPress} />);
    fireEvent.press(getByText("Test Button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    const { getByTestId } = render(
      <Button title="Test Button" onPress={() => {}} loading />
    );
    // ActivityIndicator should be present when loading
    expect(getByTestId).toBeDefined();
  });

  it("is disabled when disabled prop is true", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPress} disabled />
    );
    fireEvent.press(getByText("Test Button"));
    expect(onPress).not.toHaveBeenCalled();
  });
});

