import ReactDOM from "react-dom/client";

import App from "@/app/App.tsx";

import "./index.css";
import { appStarted } from "./shared/config/init";
const container = document.querySelector("#root") as HTMLElement;
const root = ReactDOM.createRoot(container);
appStarted();

root.render(<App />);
