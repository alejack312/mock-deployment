import "../styles/main.css";
import { CommandOutput } from "./REPL";

/**
 * Represents the history component of the Read-Eval-Print Loop (REPL).
 * It displays a list of previously executed commands and their output.
 *
 * @param {REPLHistoryProps} props - The props for the REPLHistory component.
 * @returns {JSX.Element} The JSX element representing the REPLHistory component.
 */
export function REPLHistory(props: REPLHistoryProps) {
  /**
   * Render the REPLHistory component, displaying a list of commands and their output.
   *
   * @returns {JSX.Element} The JSX element representing the REPLHistory component.
   */
  return (
    <div className="repl-history overflow-y-scroll" data-testid="repl-history">
      <p>
        {props.history.map((elem, index) => (
          <div className="history-element">
            {props.mode && <p>Command: {elem.command}</p>}
            {typeof elem.output === "string" ? (
              <p>Output: {elem.output}</p>
            ) : (
              <div>
                Output:
                <table>
                  <tbody>
                    {elem.output.map((row) => (
                      <tr>
                        {row.map((cell) => (
                          <td>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </p>
    </div>
  );
}

/**
 * Props for the REPLHistory component.
 */
interface REPLHistoryProps {
  /**
   * An array representing the history of commands and their output.
   */
  history: CommandOutput[];

  /**
   * A boolean indicating the current mode (true for verbose, false for brief).
   */
  mode: boolean;
}
