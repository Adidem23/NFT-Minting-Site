import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider, useWallet } from "@thirdweb-dev/react";
import { ThirdwebSDKProvider, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import "./styles/globals.css";


const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);


reportWebVitals();
