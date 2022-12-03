import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppProvider from "./context/AppProvider"
import Navbar from './components/Navbar'
// import Uik from '@reef-defi/ui-kit'
import "./styles/index.css";

ReactDOM.render(
    <React.StrictMode>
        <h1 className="text-3xl font-bold underline bg-red-300">
            Hello world!
        </h1>
        {/* <AppProvider>
            <div className="w-full bg-red-100">
                <Navbar />
            </div>
            <App />
        </AppProvider> */}
    </React.StrictMode>,
    document.getElementById("root")
);
