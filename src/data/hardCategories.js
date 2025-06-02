const HardCategories = [
  {
    id: 1,
    name: 'Intel Core i9-13900K',
    category: 'CPU',
    longDescription: 'El Intel Core i9-13900K es un procesador desbloqueado de 24 núcleos (8P + 16E) y 32 hilos, con velocidades de hasta 5.8 GHz. Ideal para gaming extremo y creación de contenido.',
    image: 'https://mla-s1-p.mlstatic.com/851671-MLA52221724022_102022-F.jpg',
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
    longDescription: 'El Ryzen 7 7800X3D cuenta con tecnología 3D V-Cache que ofrece un rendimiento de juego excepcional con sus 8 núcleos y 16 hilos.',
    image: 'https://katech.com.ar/wp-content/uploads/x1-189-jpg.webp',
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
    longDescription: 'La NVIDIA GeForce RTX 4090 es la GPU tope de gama de la serie 40. Con 24GB de VRAM GDDR6X y arquitectura Ada Lovelace, ofrece un rendimiento brutal para gaming 4K y tareas profesionales como IA o renderizado 3D.',
    image: 'https://images-cdn.ubuy.com.ar/652a823904abac2439285874-nvidia-geforce-rtx-4090-founders-edition.jpg',
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
    longDescription: 'El Samsung 990 PRO es una unidad SSD NVMe PCIe 4.0 de 2TB con velocidades de lectura secuencial de hasta 7450 MB/s. Ideal para sistemas operativos, juegos pesados y transferencias masivas de datos.',
    image: 'https://ar-hard.com.ar/wp-content/uploads/MZ-V9P2T0B-AM_2.jpg',
    specs: [
      { name: "Capacidad", value: "2TB" },
      { name: "Interfaz", value: "PCIe 4.0 x4 NVMe" },
      { name: "Lectura", value: "7450 MB/s" },
      { name: "Escritura", value: "6900 MB/s" },
      { name: "Formato", value: "M.2 2280" }
    ],
    price: 159999
  },
  {
    id: 5,
    name: 'Corsair Vengeance RGB Pro 32GB',
    category: 'RAM',
    longDescription: 'Corsair Vengeance RGB Pro es un kit de memoria DDR4 de alto rendimiento con iluminación RGB personalizable y excelente compatibilidad para plataformas modernas.',
    image: 'https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024,f_auto/products/Memory/CMW32GX4M2D3600C18/Gallery/Vengeance_RGB_Pro_01.webp',
    specs: [
      { name: 'Tipo', value: 'DDR4' },
      { name: 'Capacidad', value: '32GB (2x16GB)' },
      { name: 'Velocidad', value: '3200MHz' },
      { name: 'RGB', value: 'Sí' }
    ],
    price: 69999
  },
  {
    id: 6,
    name: 'G.SKILL Trident Z5 32GB',
    category: 'RAM',
    longDescription: 'G.SKILL Trident Z5 es una memoria DDR5 de alto rendimiento diseñada para plataformas de última generación, ideal para overclockers y entusiastas.',
    image: 'https://ar-hard.com.ar/wp-content/uploads/Trident_Z5_Neo_RGB_Black_2.jpg',
    specs: [
      { name: 'Tipo', value: 'DDR5' },
      { name: 'Capacidad', value: '32GB (2x16GB)' },
      { name: 'Velocidad', value: '6000MHz' },
      { name: 'RGB', value: 'Sí' }
    ],
    price: 89999
  },
  {
    id: 7,
    name: 'Samsung 980 PRO 1TB NVMe SSD',
    category: 'SSD',
    longDescription: 'El Samsung 980 PRO es una unidad SSD NVMe PCIe 4.0 de 1TB con velocidades de lectura secuencial de hasta 7000 MB/s. Ideal para gaming y cargas de trabajo exigentes.',
    image: 'https://tienda.starware.com.ar/wp-content/uploads/2021/07/disco-solido-ssd-nvme-m2-samsung-980-evo-pro-1tb-pcie-40-2333-3865.jpg',
    specs: [
      { name: 'Capacidad', value: '1TB' },
      { name: 'Interfaz', value: 'PCIe 4.0 x4 NVMe' },
      { name: 'Lectura', value: '7000 MB/s' },
      { name: 'Escritura', value: '5000 MB/s' },
      { name: 'Formato', value: 'M.2 2280' }
    ],
    price: 79999
  },
  {
    id: 8,
    name: 'Seagate Barracuda 2TB HDD',
    category: 'HDD',
    longDescription: 'El Seagate Barracuda de 2TB es un disco duro confiable y asequible, ideal para almacenamiento masivo y backups.',
    image: 'https://fullh4rd.com.ar/img/productos/12/hd-hdd-2tb-seagate-barracuda-sata-iii-35-0.jpg',
    specs: [
      { name: 'Capacidad', value: '2TB' },
      { name: 'Interfaz', value: 'SATA III' },
      { name: 'Velocidad', value: '7200 RPM' },
      { name: 'Caché', value: '256MB' }
    ],
    price: 39999
  },
  {
    id: 9,
    name: 'ASUS ROG Strix Z790-E',
    category: 'Motherboard',
    longDescription: 'La ASUS ROG Strix Z790-E es una placa madre premium con soporte para procesadores Intel de 12ª/13ª generación, Wi-Fi 6E, PCIe 5.0 y múltiples opciones de expansión.',
    image: 'https://http2.mlstatic.com/D_Q_NP_672973-MLU77983493600_082024-O.webp',
    specs: [
      { name: 'Socket', value: 'LGA 1700' },
      { name: 'Chipset', value: 'Intel Z790' },
      { name: 'Wi-Fi', value: '6E' },
      { name: 'PCIe', value: '5.0' }
    ],
    price: 159999
  },
  {
    id: 10,
    name: 'MSI MPG A850G PCIE5',
    category: 'PSU',
    longDescription: 'La fuente MSI MPG A850G PCIE5 ofrece 850W de potencia, certificación 80+ Gold, cables totalmente modulares y soporte para PCIe 5.0, ideal para PCs de alto rendimiento.',
    image: 'https://storage-asset.msi.com/global/picture/image/feature/power/MPG/A1000G-pcie5/plus.png',
    specs: [
      { name: 'Potencia', value: '850W' },
      { name: 'Certificación', value: '80+ Gold' },
      { name: 'Modular', value: 'Sí' },
      { name: 'PCIe', value: '5.0' }
    ],
    price: 99999
  }
];

export default HardCategories
