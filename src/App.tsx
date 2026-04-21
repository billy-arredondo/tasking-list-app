import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { TaskList } from "./components/TaskList";
import { TasksProvider } from "./context/TasksProvider";
import { useThemeStore } from "./store/theme.store";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const isDarkTheme = theme === "dark";

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
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
      </Form>
    </div>
  );
}

export default App;
