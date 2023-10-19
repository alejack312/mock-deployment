# Mock-ajacks41-tbonas

Team members and contributions:
Thalia Bonas (tbonas) and Alejandro Jackson (ajacks41)
Repo link: https://github.com/cs0320-f23/mock-ajacks41-tbonas.git
Estimated completion time: 20 hours

### 1. Functionality/Design

The core components of our program REPL, REPLInput, REPLHistory, and
ControlledInput, which together manage the user input, command history, and
output display.

The use of state management via React's useState hooks allows us to maintain the
state of various variables, such as command history, user input, and the
current mode (verbose or brief). This design enables real-time updates to the
UI based on user input and interactions. More specific examples of our use of
useState hooks includes:

In the REPLInput component, we use useState to manage the commandString variable
and the currentDataset variable. commandString stores the user's input in the
text box, and its value changes as the user types or submits a command. By using
useState, the component can re-render whenever commandString changes, updating
the displayed input in real-time. currentDataset stores the name of the
currently loaded dataset, allowing the application to keep track of the data
source. When the user loads a dataset, currentDataset is updated, influencing
subsequent operations related to that dataset.

In the REPL component, useState is used to manage the history state variable,
which holds an array of command history and their corresponding outputs. When a
new command is executed, the history state is updated to include the new entry.
Also, the mode state variable is also managed by useState, and controls whether
the REPL operates in "brief" or "verbose" mode. When the user enters specific
commands to change the mode, such as "mode brief" or "mode verbose," useState
updates the mode state accordingly.

We used data structures like arrays and maps to store and manage command
history, mock datasets, and search results efficiently. For example, the
mockDatasets map stores various mock datasets, allowing users to load and
view data as needed.

We also used flexible type declarations such as output: string | string[][]; to
allow for the handling of variables that can contain different data types. In
this specific case, the output property of the CommandOutput interface can hold
either a string or a two-dimensional array of strings. This flexibility
accommodates scenarios where the output data structure can vary, providing
versatility in how data is stored and displayed. Using a flexible type
declaration allowed us to enhance the user experience. For example, when the
REPL application displays the command history, it can present data differently
based on its type. If the output is a string, it can be shown as a simple text
response. If it's a two-dimensional array, it can be rendered as a table or
formatted in a more structured manner, making it easier for users to interpret
and work with the data. Additionally, despite the flexibility, using a flexible
type declaration as described above also provides type safety as we used type
assertions conditional checks to ensure that they are working with the correct
data type when needed.

TRuntime and space optimizations are evident in our construction of components
such as ControlledInput, which were designed independently to be reused across
the application, promoting clean and maintainable code. Efficiently updating the
command history and UI in response to user actions, minimized unnecessary
re-renders and data processing.

### 2. Errors/Bugs:
Based on extensive testing there are currently no known bugs in our code. With
that being said, there most definitely potential bugs that we have not yet
encountered. For example, we have not tested our application with very large
datasets, so there may be bugs related to the handling of large datasets that
we have not yet encountered.

### 3. Testing:

The App.spec.ts class is used to test the functionality of the Mock Application.
These tests for the various state changes that the application can undergo.

The mode changes are tested, and the load_file, view, and search functions
are tested as well. More specifically, the key test cases and their purposes are as follows:

"on page load, I see an input bar": This test checks whether an input bar is visible when the page loads.

"after I type into the input box, its text changes": Verifies that typing in the input box results in the expected text being displayed.

"on page load, I see a button": Ensures that a button is visible when the page loads.

"after I click the button, my command gets pushed, brief mode": Tests the interaction flow of clicking a button and verifying the displayed output in brief mode.

"after I click the button, my command gets pushed, verbose mode": Similar to the previous test but in verbose mode, ensuring both the command and output are displayed.

"switching to brief mode displays only the output": Checks if switching to brief mode results in only the output being displayed.

"switching to verbose mode displays the command and output": Verifies that switching to verbose mode displays both the command and output.

"switching between brief and verbose modes works correctly": Tests the correct behavior when switching between brief and verbose modes multiple times.

"after I pass in no filepath, I get an error message": Ensures that passing an empty filepath results in an error message.

"after I pass in a bad filepath, I get an error message": Verifies that an error message is displayed when an invalid filepath is provided.

"after I load in an empty CSV, I see an empty output on view": Tests the functionality of loading an empty CSV file and viewing the results.

"after I try to load in multiple CSVs, I get an error message": Checks if an error message is displayed when trying to load multiple CSV files at once.

"loading a CSV file replaces any previously loaded CSV file": Verifies that loading a new CSV file replaces any previously loaded data.

"switching between CSV files using the load_file command works": Ensures that switching between CSV files using the load_file command works as expected.

"after I load in a CSV, I see a table output on view": Tests the functionality of loading a CSV file and viewing it as a table.

"Using the view command without loading in a file first": Ensures that attempting to view data without loading a file first results in an error message.

"Using the search command; using the search command without viewing first": Tests the search command functionality, even without viewing the data first.

"Using the search command; using the search command without viewing first; Tests search case-insensitive": Checks if the search command is case-insensitive.

"Using the search command; using the search command without viewing first; Tests search case-insensitive for headers": Verifies that searching for column headers is case-insensitive.

"after I load, I can search the CSV": Tests the ability to search for specific data within the loaded CSV.

"after I load, I can search the CSV with index or column name": Tests searching for data using either the index or column name.

"after I load, I can search the CSV with a column name that is more than a word": Checks if searching for data in a column with more than one word works correctly.

"after I search, the output will be an empty list if the value isn't present": Ensures that searching for a non-existent value results in an empty list.

"searching for a value with leading/trailing whitespace works": Verifies that searching for values with leading or trailing whitespace works as expected.

"searching for a numeric value with a numeric column identifier works": Tests searching for numeric values using a numeric column identifier.

"searching for a non-existent value returns no results": Ensures that searching for a value that does not exist results in no results.

"calling load_file, search, view, load_file, view, load_file works": Tests a sequence of actions involving loading files, searching, and viewing.

"calling load_file, view, load_file, search, load_file, view works": Tests a different sequence of actions involving loading files, searching, and viewing.

We also created test file pw-default-example.spec.ts to demonstrate common test patterns
such as Expects page to have a heading with the name of Installation.

### 4. Build and Run:
Upon inputting the command 'npm start' into the terminal, the user can utilize
the Mock Application. The user will be prompted to input a command of their
choice into the command line. The user can input the command mode brief or mode
verbose to change the mode of the application. Using 'mode brief' will set all
of the command history to be displayed in brief mode. Using 'mode verbose' will
set all of the command history to be displayed in verbose mode.

The user can input the command load_file to load a csv file into the 
application. Only one file can be loaded at a time. The user can input the
filepath of the csv file they wish to load. The filepath must be a valid csv
file.

The user can input the command view to view the loaded csv file. 

The user can input the command search to search for a term in the loaded csv 
file. When using the search command, the user can input the column name or the
column index to search for the term. Additionally, the user can input a 
specified value to search for. The user can specify multiword headers or values
by putting them in quotations. For example, the user can input the command 
'search "column name" value' to search for the value in the column name of the 
csv file. 
