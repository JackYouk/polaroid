import React, { Suspense, useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, Text, Environment, Float, Loader, MeshReflectorMaterial, OrbitControls, useGLTF, Image } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import Camera from './components/Camera';

export default function ThreeCanvas(props) {
    const photoArr = ['./HA.png', './jimi.png', './gdead.png', './guitargirl.png', './bear.png', './jerry.png', './santana.png'];
    const [photoIndex, setPhotoIndex] = useState(0)
    const { nodes, materials } = useGLTF("./polaroid_photo_sample.glb");
    const logoTexture = useMemo(() => {
        const tex = new THREE.TextureLoader().load(photoArr[photoIndex]);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(3.2, 2.5);
        return tex;
    }, [photoIndex]);

    const polaroid = useRef();

    useFrame((state) => {
        const camera = state.camera.position;
        gsap.to(camera, 4, {x: 1, y: 4, z: (window.innerWidth < 600 ? 30 : 20)})
        if(photoIndex > 0){
            gsap.to(camera, 4, {x: -1, y: 0, z: (window.innerWidth < 600 ? 15 : 5)})
        }
    });

    return (
        <>
        
                {/* <OrbitControls /> */}
                <color args={['#fff']} attach='background' />
                {/* <Environment
                    background
                    files='./sky.pic'
                /> */}
                <Environment preset='city' />

                <Text 
                    position={[0, 6, -10]} 
                    scale={3.2} 
                    color='black' 
                    font='./shrikhand.ttf'
                    lineHeight={0.8}
                >
                    summer {'\n'} of  
                </Text>
                <Text 
                    position={[1, 5.5, -10]} 
                    scale={3.8} 
                    color='red' 
                    font='./shrikhand.ttf'
                    lineHeight={1}
                >LOVE</Text>
                
                <Image url='./Click-Me.png' transparent position={[-6, 1, -5]} scale={[4, 2, 0]}  />

                <group position={[-1, -3, 0]}>
                    <Float>
                        <group {...props} dispose={null} onPointerMissed={() => setPhotoIndex(0)} onClick={() => photoIndex >= 6 ? setPhotoIndex(0) : setPhotoIndex(photoIndex + 1)}>
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
                </>
    );
}

useGLTF.preload("./polaroid_photo_sample.glb");
