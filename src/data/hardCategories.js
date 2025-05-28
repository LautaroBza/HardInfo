import i9Image from '../assets/i9.png';
import ryzenImage from '../assets/r7.png';
import rtx4090 from '../assets/4090.png';

const HardCategories = [
  {
    id: 1,
    name: 'Intel Core i9-13900K',
    category: 'CPU',
    description: 'High-end 24-core processor with excellent gaming and multitasking performance.',
    longDescription: 'El Intel Core i9-13900K es un procesador desbloqueado de 24 núcleos (8P + 16E) y 32 hilos, con velocidades de hasta 5.8 GHz. Ideal para gaming extremo y creación de contenido.',
    image: i9Image,
    specs: [
      { name: "Núcleos", value: "24 (8P + 16E)" },
      { name: "Hilos", value: "32" },
      { name: "Frecuencia", value: "3.0 GHz - 5.8 GHz" },
      { name: "TDP", value: "125W" },
      { name: "Socket", value: "LGA 1700" }
    ],
    price: 99999
  },
  {
    id: 2,
    name: 'AMD Ryzen 7 7800X3D',
    category: 'CPU',
    description: 'Top-tier AMD CPU with 3D V-Cache for superior gaming performance.',
    longDescription: 'El Ryzen 7 7800X3D cuenta con tecnología 3D V-Cache que ofrece un rendimiento de juego excepcional con sus 8 núcleos y 16 hilos.',
    image:ryzenImage ,
    specs: [
      { name: "Núcleos", value: "8" },
      { name: "Hilos", value: "16" },
      { name: "Frecuencia", value: "4.2 GHz - 5.0 GHz" },
      { name: "Cache L3", value: "96MB" },
      { name: "Socket", value: "AM5" }
    ],
    price: 999999
  },
  {
    id: 3,
    name: 'NVIDIA GeForce RTX 4090',
    category: 'GPU',
    description: 'La bestia de las gráficas modernas, sin competencia en gaming y renderizado.',
    longDescription: 'La NVIDIA GeForce RTX 4090 es la GPU tope de gama de la serie 40. Con 24GB de VRAM GDDR6X y arquitectura Ada Lovelace, ofrece un rendimiento brutal para gaming 4K y tareas profesionales como IA o renderizado 3D.',
    image: rtx4090,
    specs: [
      { name: "Memoria", value: "24GB GDDR6X" },
      { name: "Núcleos CUDA", value: "16384" },
      { name: "Frecuencia", value: "2.23 GHz - 2.52 GHz" },
      { name: "TDP", value: "450W" },
      { name: "Conectores", value: "3x DisplayPort, 1x HDMI" }
    ],
    price: 299999
  },
  {
    id: 4,
    name: 'Samsung 990 PRO 2TB NVMe',
    category: 'SSD',
    description: 'Almacenamiento ultrarrápido para quienes no toleran pantallas de carga.',
    longDescription: 'El Samsung 990 PRO es una unidad SSD NVMe PCIe 4.0 de 2TB con velocidades de lectura secuencial de hasta 7450 MB/s. Ideal para sistemas operativos, juegos pesados y transferencias masivas de datos.',
    image: 'https://via.placeholder.com/300x200?text=SSD',
    specs: [
      { name: "Capacidad", value: "2TB" },
      { name: "Interfaz", value: "PCIe 4.0 x4 NVMe" },
      { name: "Lectura", value: "7450 MB/s" },
      { name: "Escritura", value: "6900 MB/s" },
      { name: "Formato", value: "M.2 2280" }
    ],
    price: 159999
  }

];

export default HardCategories
