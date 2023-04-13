import ThreeCanvas from "./ThreeCanvas";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";
export default function App() {

  return(
    <>
    <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [1, 4, (window.innerWidth < 600 ? 35 : 25)]
            }}
        >
            <Suspense fallback={null}>
            <ThreeCanvas />
            </Suspense>
        </Canvas>
        <Loader containerStyles={{ backgroundColor: 'white', color: 'black' }} />
    </>
  );
}