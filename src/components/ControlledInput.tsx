import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";


/**
 * Props for the ControlledInput component.
 */
interface ControlledInputProps {
  /**
   * The current value of the input.
   */
  value: string;

  /**
   * A function that sets the state containing a string.
   * This function is used to update the input value.
   *
   * @param {string | ((prev: string) => string)} value - The new value to set.
   */
  setValue: Dispatch<SetStateAction<string>>;
  /**
   * A string to provide an accessible label for the input element.
   */
  ariaLabel: string;
}

/**
 * A controlled input component that wraps an HTML input element.
 * It ensures that React manages the input's state.
 *
 * @param {ControlledInputProps} props - The props for the ControlledInput component.
 * @returns {JSX.Element} The JSX element representing the controlled input.
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  /**
   * Handles the change event of the input element and updates its value.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} ev - The change event.
   */
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
