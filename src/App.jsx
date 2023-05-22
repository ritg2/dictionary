import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import Layout from "./layout/Layout";
import Result from "./components/Result";

function App() {
  const [search, setSearch] = useState("welcome");

  function handleChange(e) {
    setSearch(e.target.value);
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout handleChange={handleChange} />}>
        <Route index element={<Result search={search} />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
