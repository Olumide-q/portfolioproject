"use client";

import React from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScrollWrapper({ children }) {
    return (
        <ReactLenis root options={{ lerp: 0.04 }}>
            {children}
        </ReactLenis>
    );
}