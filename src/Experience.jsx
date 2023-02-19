import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Bounds, Edges, Center } from "@react-three/drei";
// use ↓ "DebugLayerMaterial as LayerMaterial" ↓ here for integrated leva debug panels
import { LayerMaterial, Depth, Fresnel } from "lamina";
import { useControls } from "leva";
import { OrbitControls } from "@react-three/drei";
import { MeshReflectorMaterial, Environment } from "@react-three/drei";

function Experience(props) {
  const ref = useRef();
  // const { nodes } = useGLTF("/cursor.glb");

  const { nodes } = useGLTF("/head_model_of_a_child.glb");
  const { gradient } = useControls({
    gradient: { value: 0.7, min: 0, max: 1 },
  });

  // console.log(nodes.Object_2.geometry);
  // Animate gradient
  useFrame((state) => {
    const sin = Math.sin(state.clock.elapsedTime / 2);
    const cos = Math.cos(state.clock.elapsedTime / 2);
    ref.current.layers[0].origin.set(cos / 2, 0, 0);
    ref.current.layers[1].origin.set(cos, sin, cos);
    ref.current.layers[2].origin.set(sin, cos, sin);
    ref.current.layers[3].origin.set(cos, sin, cos);
  });

  return (
    <>
      <OrbitControls makeDefault />

      {/* <mesh geometry={nodes.Object_2.geometry}>
        <meshBasicMaterial color={0xff0000} />
      </mesh> */}
      <Center>
        <mesh
          {...props}
          geometry={nodes.Object_2.geometry}
          scale={2}
          rotation={[Math.PI * 0.5, 3.2, 3.2]}
        >
          <LayerMaterial ref={ref} toneMapped={false}>
            <Depth
              colorA="#ff0080"
              colorB="black"
              alpha={1}
              mode="normal"
              near={0.8 * gradient}
              far={0.8}
              origin={[0, 0, 0]}
            />
            <Depth
              colorA="blue"
              colorB="#f7b955"
              alpha={1}
              mode="add"
              near={3 * gradient}
              far={3}
              origin={[0, 1, 1]}
            />
            <Depth
              colorA="green"
              colorB="#f7b955"
              alpha={1}
              mode="add"
              near={4 * gradient}
              far={4}
              origin={[2, 2, -5]}
            />
            <Depth
              colorA="white"
              colorB="red"
              alpha={1}
              mode="overlay"
              near={1.5 * gradient}
              far={1.5}
              origin={[1, -1, -1]}
            />
            <Fresnel
              mode="add"
              color="white"
              intensity={1.5}
              power={2.5}
              bias={0.02}
            />
          </LayerMaterial>
          {/* <Edges color="white" /> */}
        </mesh>
      </Center>
      <mesh scale={20} rotation={[-Math.PI / 2, 0, 0]} position-y={-2}>
        <planeGeometry />
        <MeshReflectorMaterial
          blur={[100, 50]}
          resolution={1024}
          mixBlur={1}
          mixStrength={10}
          depthScale={1}
          minDepthThreshold={0.2}
          color="#151515"
          metalness={0.5}
          roughness={1}
        />
      </mesh>
      <Environment preset="dawn" />
    </>
  );
}

export default Experience;
