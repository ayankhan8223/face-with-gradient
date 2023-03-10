import React, { Suspense, useState } from "react";
import { Interactive, XR, ARButton, Controllers } from "@react-three/xr";
import { Text } from "@react-three/drei";
import "./style.css";
import { Canvas } from "@react-three/fiber";

function Box({ color, size, scale, children, ...rest }) {
  return (
    <mesh scale={scale} {...rest}>
      <boxGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  );
}

function Button(props) {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState("blue");

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0);
  };

  return (
    <Interactive
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
      onSelect={onSelect}
    >
      <Box
        color={color}
        scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]}
        size={[0.4, 0.1, 0.1]}
        {...props}
      >
        <Suspense fallback={null}>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.05}
            color="#000"
            anchorX="center"
            anchorY="middle"
          >
            Hello react-xr!
          </Text>
        </Suspense>
      </Box>
    </Interactive>
  );
}

export default function App() {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR referenceSpace="local">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <mesh>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh> */}
          <Button />
          <Controllers />
        </XR>
      </Canvas>
    </>
  );
}

// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import Experience from "./Experience.jsx";
// import { Suspense } from "react";
// import "./style.css";
// import { Bounds } from "@react-three/drei";
// import { Interactive, XR, ARButton, Controllers } from "@react-three/xr";

// function App() {
//   return (
//     <>
//       <ARButton />
//       <Canvas
//         camera={{
//           fov: 45,
//           near: 0.1,
//           far: 200,
//           position: [5, 0, 5],
//         }}
//       >
//         <XR referenceSpace="local">
//           <color attach="background" args={["#000000"]} />
//         </XR>
//         <Experience />
//       </Canvas>
//     </>
//   );
// }

// export default App;
