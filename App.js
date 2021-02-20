import "./App.css";
import MainPageComponent from "./main/index.js";
import { Switch, Route } from "react-router-dom";
import UploadPage from "./upload/index.js";
import ProductPage from "./product/index.js";

function App() {
  return (
    <div>
      <Switch>
        <Route exact={true} path={"/"}>
          <MainPageComponent />
        </Route>
        <Route exact={true} path="/upload/">
          <UploadPage />
        </Route>
        <Route exact={true} path="/product/:id">
          <ProductPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
