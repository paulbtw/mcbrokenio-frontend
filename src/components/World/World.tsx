import { FC, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WorldMesh } from './WorldMesh';

interface IProps {}

export const World: FC<IProps> = () => {
  return (
    <Canvas style={{ backgroundColor: 'black' }}>
      <Suspense fallback={null}>
        <ambientLight intensity={1} />

        <WorldMesh />
      </Suspense>
    </Canvas>
  );
};
