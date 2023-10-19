import '../styles/App.css';
import REPL from './REPL';

/**
 * highest level component of the application.
 * It serves as the entry point and contains the main structure of the application.
 */
export function App() {
  /**
   * Render the App component, including the REPL (Read-Eval-Print Loop) component.
   *
   * @returns {JSX.Element} The JSX element representing the App component.
   */
  console.log("Rendering App component...");
  
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
      </p>
      <REPL />
    </div>
  );
}


