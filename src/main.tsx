import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import QuizzContextProvider from "./context/quizz-context.tsx";
import App from "./app.tsx";
import PlayQuizz from "./pages/play-quizz.tsx";
import "./index.css";
import ModalContextProvider from "./context/modal-context.tsx";

createRoot(document.getElementById("root")!).render(
  <ModalContextProvider>
    <QuizzContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="play" element={<PlayQuizz />}/>
        </Routes>
      </BrowserRouter>
    </QuizzContextProvider>
  </ModalContextProvider>
);
