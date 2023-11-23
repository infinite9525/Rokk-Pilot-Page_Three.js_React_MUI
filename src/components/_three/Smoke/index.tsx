import React, { useEffect } from 'react';
import cloud from '../../../../src/assets/images/cloud.png';

import { useThree } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping } from 'three';
import { gsap } from 'gsap';

type TPointData = {
  duration: number;
  x: number;
  y: number;
  z: number;
  delay: number;
};

const movementPointsData: TPointData[] = [
  {
    duration: 2,
    x: 0,
    y: 0,
    z: 15,
    delay: 0,
  },
  {
    duration: 1.5,
    x: 0,
    y: 0,
    z: 10,
    delay: 0,
  },
  {
    duration: 1.5,
    x: 0,
    y: 0,
    z: 8,
    delay: 0.2,
  },
  {
    duration: 1.5,
    x: -4,
    y: -5,
    z: 8,
    delay: 0.2,
  },
  {
    duration: 1.5,
    x: 4,
    y: -5,
    z: 8,
    delay: 0.4,
  },
  {
    duration: 1,
    x: -5,
    y: 0,
    z: 10,
    delay: 0,
  },
  {
    duration: 1.1,
    x: -5,
    y: -5,
    z: 10,
    delay: 0,
  },
  {
    duration: 1.1,
    x: 5,
    y: -5,
    z: 10,
    delay: 0.2,
  },
  {
    duration: 1.2,
    x: 5,
    y: 0,
    z: 10,
    delay: 0.1,
  },
];

const Smoke: React.FC = () => {
  const repeatX = 1;
  const repeatY = 1;

  const cloudTextureCenter = new TextureLoader().load(cloud);
  cloudTextureCenter.wrapS = RepeatWrapping;
  cloudTextureCenter.wrapT = RepeatWrapping;
  cloudTextureCenter.repeat.set(repeatX, repeatY);

  const { scene } = useThree();
  const clouds = scene.getObjectByName('clouds');

  const movementCloud = () => {
    if (clouds) {
      clouds.children.forEach((item, index) => {
        gsap.to(item.position, {
          duration: movementPointsData[index].duration,
          x: movementPointsData[index].x,
          y: movementPointsData[index].y,
          z: movementPointsData[index].z,
          delay: movementPointsData[index].delay,
          repeat: -1,
        });
      });
    }
  };

  useEffect(() => {
    if (clouds) movementCloud();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clouds]);

  return (
    <group name='clouds'>
      <mesh>
        <planeGeometry attach='geometry' args={[10, 10]} />
        <meshLambertMaterial
          attach='material'
          map={cloudTextureCenter}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh>
        <planeGeometry attach='geometry' args={[10, 10]} />
        <meshLambertMaterial
          attach='material'
          map={cloudTextureCenter}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh>
        <planeGeometry attach='geometry' args={[10, 10]} />
        <meshLambertMaterial
          attach='material'
          map={cloudTextureCenter}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh>
        <planeGeometry attach='geometry' args={[12, 12]} />
        <meshLambertMaterial
          attach='material'
          map={cloudTextureCenter}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh>
        <planeGeometry attach='geometry' args={[12, 12]} />
        <meshLambertMaterial
          attach='material'
          map={cloudTextureCenter}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh>
        <planeGeometry attach='geometry' args={[5, 5]} />
        <meshLambertMaterial
          attach='material'
          map={cloudTextureCenter}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh>
        <planeGeometry attach='geometry' args={[5, 5]} />
        <meshLambertMaterial
          attach='material'
          map={cloudTextureCenter}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh>
        <planeGeometry attach='geometry' args={[5, 5]} />
        <meshLambertMaterial
          attach='material'
          map={cloudTextureCenter}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh>
        <planeGeometry attach='geometry' args={[5, 5]} />
        <meshLambertMaterial
          attach='material'
          map={cloudTextureCenter}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
};

export default Smoke;
