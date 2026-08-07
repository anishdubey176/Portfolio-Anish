import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer,
  scene,
  camera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child) => {
              if (child.isMesh) {
                const mesh = child;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const mName = mesh.name.toLowerCase();
                const matName = mesh.material && mesh.material.name ? mesh.material.name.toLowerCase() : "";
                const nameStr = mName + " " + matName;

                if (mesh.material) {
                  mesh.material = mesh.material.clone();
                  
                  if (nameStr.includes("eye") || nameStr.includes("pupil") || nameStr.includes("cornea") || nameStr.includes("lens")) {
                    // Keep eyes white so texture is visible
                    mesh.material.color.setHex(0xffffff);
                  } else if (nameStr.includes("hair") || nameStr.includes("brow") || nameStr.includes("lash")) {
                    // Hair and eyebrows pure black
                    mesh.material.color.setHex(0x000000);
                  } else if (nameStr.includes("shirt") || nameStr.includes("cloth") || nameStr.includes("top") || nameStr.includes("jacket")) {
                    // Clothes black
                    mesh.material.color.setHex(0x1a1a1a);
                    mesh.material.roughness = 0.9;
                  } else if (nameStr.includes("leg") || nameStr.includes("foot") || nameStr.includes("shoe") || nameStr.includes("pant") || nameStr.includes("bottom")) {
                    // Grey Jeans/Shoes
                    mesh.material.color.setHex(0x555555); // Grey color
                    mesh.material.roughness = 0.9;
                  } else if (nameStr.includes("head") || nameStr.includes("face") || nameStr.includes("skin") || nameStr.includes("hand") || nameStr.includes("arm") || nameStr.includes("neck")) {
                    // Skin brown
                    mesh.material.color.setHex(0xa66a42); // Warm brown skin tone
                    mesh.material.roughness = 0.4;
                  } else if (nameStr.includes("body")) {
                    // If it's named body, we make it clothes (black shirt) to cover him up
                    mesh.material.color.setHex(0x1a1a1a);
                  } else {
                    // Fallback for unnamed meshes: skin tone
                    mesh.material.color.setHex(0xa66a42);
                  }
                }
              }
              
              // Add a silver cap to the head bone!
              if (child.isBone && (child.name === "spine006" || child.name.toLowerCase().includes("head"))) {
                if (!child.userData.hasCap) {
                  child.userData.hasCap = true;
                  
                  const capGroup = new THREE.Group();
                  const silverMaterial = new THREE.MeshStandardMaterial({
                      color: 0xdcdcdc, // Bright Silver
                      metalness: 0.8,
                      roughness: 0.3
                  });
                  
                  // Cap size (adjust these if it looks too big/small)
                  // Typical values for 1x scale models
                  const radius = 10; 
                  
                  // Dome
                  const domeGeo = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
                  const dome = new THREE.Mesh(domeGeo, silverMaterial);
                  dome.castShadow = true;
                  
                  // Brim
                  const brimGeo = new THREE.CylinderGeometry(radius * 1.05, radius * 1.05, radius * 0.1, 32, 1, false, -Math.PI / 2.5, Math.PI / 1.25);
                  const brim = new THREE.Mesh(brimGeo, silverMaterial);
                  brim.castShadow = true;
                  brim.position.set(0, 0, radius * 0.5); // Move forward
                  brim.scale.set(1, 1, 1.5); // Stretch forward
                  
                  capGroup.add(dome);
                  capGroup.add(brim);
                  
                  // Position relative to the neck/head bone.
                  // Try to guess the height. Let's make it adjustable globally just in case.
                  capGroup.position.set(0, radius * 1.2, 0); 
                  capGroup.rotation.x = -0.1; // slight tilt
                  
                  // If the model is small scale (like 0.1), we need to scale the cap down.
                  // Let's attach it. If it's huge, we'll fix it.
                  child.add(capGroup);
                  
                  // Save globally so we can adjust it via console if needed without recompiling
                  window.capGroup = capGroup;
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character.getObjectByName("footR").position.y = 3.36;
            character.getObjectByName("footL").position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
