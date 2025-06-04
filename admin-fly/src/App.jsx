import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebarmenu from "./Sidebarmenu";

import Home from "./pages/Home";
import FoodCreate from "./pages/FoodCreate";
import FoodList from "./pages/FoodList";
import FoodEdit from "./pages/FoodEdit";
import ViewFood from "./pages/ViewFood";
import UserList from "./pages/UserList";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login"
function App() {
  return (
    <BrowserRouter>
      <Sidebarmenu>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/foods" element={<FoodList></FoodList>}></Route>
          <Route
            path="/add/food"
            element={<FoodCreate></FoodCreate>}
          ></Route>
          <Route path="/edit/food/:id" element={<FoodEdit></FoodEdit>}></Route>
          <Route path="/view/food/:id" element={<ViewFood></ViewFood>}></Route>
          <Route path="/users" element={<UserList></UserList>}></Route>
          <Route path="/feedbacks" element={<Feedback></Feedback>}></Route>

        </Routes>
      </Sidebarmenu>
    </BrowserRouter>
  );
}

export default App;