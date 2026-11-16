import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { prewarmImages } from "./lib/prewarmImages";

createRoot(document.getElementById("root")!).render(<App />);
prewarmImages();
