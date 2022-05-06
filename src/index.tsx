import React from 'react';
import { createRoot } from 'react-dom/client';
import GutenTag from "./components/GutenTag";
import {GT6Params} from "./types";

declare global {
    interface Window {
        gt6Params?: GT6Params,
    }
}

const root = createRoot(document.getElementById('app')!);
root.render(<GutenTag />);
