
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import { Earth } from './components/earth';

function App() {
  return (
    <div className="w-full h-full ">
      <Canvas>
        <Suspense fallback={null}>
        <Earth/>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
