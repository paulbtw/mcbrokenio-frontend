import { FC } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface IProps {}

export const WorldMesh: FC<IProps> = () => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [
      '/textures/8k_earth_daymap.jpg',
      '/textures/8k_earth_normal_map.jpg',
      '/textures/8k_earth_specular_map.jpg',
      '/textures/8k_earth_clouds.jpg',
    ],
  );
  // This reference gives us direct access to the THREE.Mesh object,
  // const ref = useRef();

  return (
    <>
      <Stars
        radius={300}
        depth={60}
        count={5000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh>
        <sphereGeometry attach="geometry" args={[2.02, 128, 128]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.2}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry attach="geometry" args={[2, 128, 128]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
};
