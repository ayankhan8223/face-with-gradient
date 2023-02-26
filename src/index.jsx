import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Suspense } from "react";
import { Bounds } from "@react-three/drei";
import { Interactive, XR, ARButton, Controllers } from "@react-three/xr";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <ARButton />
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [5, 0, 5],
      }}
    >
      <XR referenceSpace="local">
        <color attach="background" args={["#000000"]} />
      </XR>
      <Experience />
    </Canvas>
  </>
);
