import { Provider } from "react-redux";
import "./App.css";
import DashboardHelper from "./pages/dashboard/index.helper";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <DashboardHelper />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
