import React, { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, Text, Environment, Float, Loader, MeshReflectorMaterial, OrbitControls, useGLTF, Image } from '@react-three/drei'
import * as THREE from 'three'
import Camera from './components/Camera';

export default function ThreeCanvas(props) {
    const [photo, setPhoto] = useState('./goodair.png')
    const { nodes, materials } = useGLTF("./polaroid_photo_sample.glb");
    const logoTexture = useMemo(() => {
        const tex = new THREE.TextureLoader().load(photo);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(2, 2);
        return tex;
    });

    const polaroid = useRef();

    return (
        <>
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [1, 4, (window.innerWidth < 600 ? 30 : 20)]
            }}
            {...props}
        >
            <Suspense fallback={null}>
                <OrbitControls />
                <color args={['#fff']} attach='background' />
                {/* <Environment
                    background
                    files='./sky.pic'
                /> */}
                <Environment preset='city' />

                <Text 
                    position={[0, 6, -10]} 
                    scale={3.8} 
                    color='black' 
                    font='./shrikhand.ttf'
                    lineHeight={1}
                >
                    good air {'\n'} studios
                </Text>
                {/* <Image url='./goodairtbg.png' position={[0, 6, -10]} scale={1}  /> */}

                <group position={[-1, -3, 0]}>
                    <Float>
                        <group {...props} dispose={null} onClick={() => setPhoto('')}>
                            <group rotation={[-0.7, 0.2, 0.85]} scale={0.15}>
                                <group position={[0, 0, 0]}>
                                    <mesh
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Object_3.geometry}
                                    >
                                        <meshStandardMaterial attach='material' map={logoTexture} />
                                    </mesh>
                                    <mesh
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Object_4.geometry}
                                        material={materials.Framelambert79SG}
                                    />
                                    <mesh
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Object_5.geometry}
                                        material={materials.initialShadingGroup}
                                    />
                                </group>
                            </group>
                        </group>
                    </Float>
                </group>

                <Camera scale={0.7} position={[1, -4, -3]} rotation={[0, -0.4, 0]} />

                <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[100, 500]} />
                    <MeshReflectorMaterial
                        blur={[400, 100]}
                        resolution={1024}
                        mixBlur={1}
                        mixStrength={15}
                        depthScale={1}
                        minDepthThreshold={0.85}
                        color="#fff"
                        metalness={0.6}
                        roughness={1}
                    />
                </mesh>
            </Suspense>
        </Canvas>
        <Loader containerStyles={{ backgroundColor: 'white', color: 'black' }} />
                </>
    );
}

useGLTF.preload("./polaroid_photo_sample.glb");
