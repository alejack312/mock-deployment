import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { CommandOutput } from "./REPL";

import {
  empty,
  studentsWithHeader,
  studentsWithoutHeader,
  studentsMissingData,
  tenstar,
  postsecondaryeducation,
  mockSearchMap,
} from "../mock/MockedData";

/**
 * Represents the input component of the Read-Eval-Print Loop (REPL).
 * It allows users to enter commands and handles their execution.
 *
 * @param {REPLInputProps} props - The props for the REPLInput component.
 * @returns {JSX.Element} The JSX element representing the REPLInput component.
 */
interface REPLInputProps {
  history: CommandOutput[];
  setHistory: Dispatch<SetStateAction<CommandOutput[]>>;

  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
}

let mockDatasets = new Map<string, string[][]>();

/**
 * Load a dataset from the mock datasets folder
 * @param filePath The path to the field in the dataset
 */
function loadDataset() {
  mockDatasets.set("empty", empty);
  mockDatasets.set("studentsWithHeader", studentsWithHeader);
  mockDatasets.set("studentsWithoutHeader", studentsWithoutHeader);
  mockDatasets.set("studentsMissingData", studentsMissingData);
  mockDatasets.set("tenstar", tenstar);
  mockDatasets.set("postsecondaryeducation", postsecondaryeducation);
}

/**
 * The REPLInput component
 * @param props The props for the REPLInput component
 * @returns The JSX element representing the REPLInput component
 */
export function REPLInput(props: REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Manages the count of the number of commands entered
  const [count, setCount] = useState<number>(0);
  // Manages the current dataset
  const [currentDataset, setDataset] = useState<string>("file not loaded");

  //Load the mock datasets
  loadDataset();

  /**
   * Handle the submission of a command.
   *
   * @param {string} commandString - The command entered by the user.
   */
  function handleSubmit(commandString: string) {
    // Split the command string into parts
    const regex = new RegExp(/("[^"]+"|\S+)/g);
    const parts = commandString.match(regex)?.map((part) => part.replace(/"/g, "")) ?? [];
    const command = parts[0];
    
    // Defining a placeholder for the command history element
    let historyElement: CommandOutput = {
      command: commandString,
      output: "file does not exist",
    };

    //Check if the command is the mode command and whether brief is specified
    if (parts[0] === "mode" && parts[1] === "brief") {
      //Check if the mode is already verbose
      if (props.mode === true) {
        // Set the mode to brief
        props.setMode(false);
        historyElement.output = "mode changed to brief";
      }
      setCommandString("");
    } else if (parts[0] === "mode" && parts[1] === "verbose") { // Check if the command is the mode command and whether verbose is specified
      // Check if the mode is already brief
      if (props.mode === false) {
        // Set the mode to verbose
        props.setMode(true);
        historyElement.output = "mode changed to verbose";
      }
      setCommandString("");
    } else if (parts[0] === "load_file" && parts[1] && parts.length === 2) { //Check if the command is the load_file command and whether a file is specified
      // Increment the count
      setCount(count + 1);
      // Check if the mockDatasets has the file
      if (mockDatasets.has(parts[1])) {
        // Set the output to the name of the file
        historyElement.output = parts[1];
        setDataset(parts[1]);
      } else {//Otherwise, set the output to file does not exist
        historyElement.output = "file does not exist";
      }
      setCommandString("");
    } else if (parts[0] === "view") { //Check if the command is the view command 
      setCount(count + 1);
      if (currentDataset === "file not loaded") { //Check if the file is loaded
        // Set the output to file not loaded if the file is not loaded
        historyElement.output = "file not loaded";
      } else { //Otherwise, set the output to the current dataset
        const dataset = mockDatasets.get(currentDataset);
        if (dataset !== undefined) { //Check if the dataset exists
          // Set the output to the dataset
          historyElement.output = dataset;
        } else { //Otherwise, set the output to dataset does not exist
          // Set the output to dataset does not exist
          historyElement.output = "dataset does not exist";
        }
      }
      setCommandString("");
    } else if (parts[0] === "search" && parts.length === 3) { //Check if the command is the search command and whether the query is specified with column identifer
      if (currentDataset === "file not loaded") { //Check if the file is loaded
        // Set the output to file not loaded if the file is not loaded
        historyElement.output = "file not loaded";
      } else { //Otherwise, set the output to the result of the search
        // Get the query in the form of "header + value" where header is always lowercase
        const query = parts[1].toLowerCase() + " " + parts[2];
        // Get the result from the mock data of search results
        const res = mockSearchMap.get(query);
        if (currentDataset === "empty") { //Check if the dataset is empty
          // Set the output to an empty array
          historyElement.output = [[]];
        } else if (res) { //Check if the result exists
          // Set the output to the result
          historyElement.output = res;
        } else { //Otherwise, set the output to search invalid
          // Set the output to search invalid
          historyElement.output = "search invalid";
        }
      }
    } else if (parts[0] === "search" && parts.length === 2) { //Check if the command is the search command and whether the query is specified without column identifer
      // If the file is not loaded, then we want to indicate that the file is 
      // not loaded
      if (currentDataset === "file not loaded") { //Check if the file is loaded
        // Set the output to file not loaded if the file is not loaded
        historyElement.output = "file not loaded";
      } else { //Otherwise, set the output to the result of the search
        // Get the query which is just the value
        const query = parts[1];
        // Get the result from the mock data of search results
        const res = mockSearchMap.get(query);
        if (currentDataset === "empty") { //Check if the dataset is empty
          // Set the output to an empty array
          historyElement.output = [[]];
        } else if (res) { //Check if the result exists
          // Set the output to the result
          historyElement.output = res;
        } else { //Otherwise, set the output to search invalid
          // Set the output to search invalid
          historyElement.output = "search invalid";
        }
      }
    } else { //Otherwise, set the output to invalid command
      historyElement.output = "invalid command";
    }
    // Add the history element to the command history
    props.setHistory([...props.history, historyElement]);
  }

  // Render the REPLInput component
  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>

        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />

        {/*https://www.w3schools.com/howto/howto_css_switch.asp*/}
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
