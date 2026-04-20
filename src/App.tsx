import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { TaskList } from "./components/TaskList";
import { TasksProvider } from "./context/TasksProvider";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? "dark" : "light";

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className={`app-shell theme-${theme}`}>
      <TasksProvider>
        <TaskList theme={theme} />
      </TasksProvider>

      <Form className='theme-switch'>
        <Form.Check
          type='switch'
          id='theme-switch'
          label={isDarkTheme ? "Dark" : "Light"}
          checked={isDarkTheme}
          onChange={(e) => setIsDarkTheme(e.target.checked)}
        />
      </Form>
    </div>
  );
}

export default App;
