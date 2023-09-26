import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuizContextProvider } from "./Context/QuizContext";
import QuizForm from "./Components/statefull/QuizForm";
import AnswerSheet from "./Components/statefull/AnswerSheet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/QuizForm",
    element: <QuizForm />,
  },
  {
    path: "/QuizForm/:id",
    element: <QuizForm />,
  },
  {
    path: "/answer/:id",
    element: <AnswerSheet />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuizContextProvider>
      <RouterProvider router={router} />
    </QuizContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
