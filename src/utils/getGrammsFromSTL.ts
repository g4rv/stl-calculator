import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export enum MATERIAL_DENSITIES {
  POLYAMIDE = 1.01, // g/cm³
}

export default async function getGrammsFromSTL(
  file: File,
  material: keyof typeof MATERIAL_DENSITIES = 'POLYAMIDE'
) {
  const arrayBuffer = await file.arrayBuffer();
  const loader = new STLLoader();
  const geometry = loader.parse(arrayBuffer);

  const position = geometry.attributes.position;
  let volume = 0;
  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 3) {
    p1.fromBufferAttribute(position, i);
    p2.fromBufferAttribute(position, i + 1);
    p3.fromBufferAttribute(position, i + 2);

    volume += signedVolumeOfTriangle(p1, p2, p3);
  }

  const volumeCm3 = Math.abs(volume) / 1000; // mm³ -> cm³
  const grams = volumeCm3 * MATERIAL_DENSITIES[material];
  return Number(grams.toFixed(2));
}

function signedVolumeOfTriangle(p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3) {
  return p1.dot(p2.clone().cross(p3)) / 6.0;
}
