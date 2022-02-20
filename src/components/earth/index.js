import React, { useRef } from "react";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthNightMap from "../../assets/textures/8k_earth_nightmap.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import { DoubleSide } from "three";


export const Earth = () => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef()
  const cloudsRef = useRef()

  useFrame(({clock}) => {
    earthRef.current.rotation.y = clock.getElapsedTime()/6
    cloudsRef.current.rotation.y = clock.getElapsedTime()/4
  })

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <pointLight position={[2, 0, 6]} intensity={1.2} color='#f6f3ea'/>
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true}/>
      <mesh ref={cloudsRef} position={[0,0,3]}>
        <sphereBufferGeometry attach="geometry" args={[1.009, 34, 34]} />
        <meshPhongMaterial map={cloudsMap} opacity={0.4} depthWrite={true} transparent={true} side={DoubleSide}/>
      </mesh>
      <mesh ref={earthRef} position={[0,0,3]}>
        <sphereBufferGeometry attach="geometry" args={[1, 34, 34]} />
        <meshPhongMaterial attach="material" specularMap={specularMap} />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={0.4}
          zoomSpeed={0.6}
          panSpeed={0.5}
          // target={}
        />
      </mesh>
    </>
  );
};
