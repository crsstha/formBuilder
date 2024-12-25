import MainPage from "./pages/mainPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.scss";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <MainPage />
    </DndProvider>
  );
};

export default App;
