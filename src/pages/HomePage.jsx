import React from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import '../App.css'

function Home() {
  return (
    <div className="container-home">
      <section className="about-section">
        <h2 className="about-title">¿Qué son los componentes de hardware?</h2>
        <p className="about-intro">
          Conoce los componentes esenciales que forman tu computadora y entiende qué significa cada característica técnica.
        </p>
        
        <div className="components-grid">
          <div className="component-card">
            <h3>CPU (Procesador)</h3>
            <p>El cerebro de tu computadora que ejecuta todas las instrucciones y cálculos.</p>
            <div className="specs-info">
              <h4>Características importantes:</h4>
              <ul>
                <li><strong>Núcleos:</strong> Número de unidades de procesamiento independientes</li>
                <li><strong>Frecuencia:</strong> Velocidad de procesamiento en GHz</li>
                <li><strong>Cache:</strong> Memoria interna rápida para datos frecuentes</li>
                <li><strong>TDP:</strong> Consumo de energía y disipación térmica</li>
              </ul>
            </div>
          </div>

          <div className="component-card">
            <h3>GPU (Tarjeta Gráfica)</h3>
            <p>Se encarga del procesamiento de gráficos y visualización en pantalla.</p>
            <div className="specs-info">
              <h4>Características importantes:</h4>
              <ul>
                <li><strong>VRAM:</strong> Memoria dedicada para gráficos</li>
                <li><strong>Frecuencia:</strong> Velocidad del procesador gráfico</li>
                <li><strong>Ancho de banda:</strong> Velocidad de transferencia de datos</li>
                <li><strong>Consumo:</strong> Energía requerida para funcionar</li>
              </ul>
            </div>
          </div>

          <div className="component-card">
            <h3>RAM (Memoria)</h3>
            <p>Memoria temporal que almacena datos activos para acceso rápido.</p>
            <div className="specs-info">
              <h4>Características importantes:</h4>
              <ul>
                <li><strong>Capacidad:</strong> Cantidad de memoria disponible</li>
                <li><strong>Frecuencia:</strong> Velocidad de transferencia de datos</li>
                <li><strong>Latencia:</strong> Tiempo de respuesta (CL)</li>
                <li><strong>DDR:</strong> Generación de tecnología de memoria</li>
              </ul>
            </div>
          </div>

          <div className="component-card">
            <h3>PSU (Fuente de Poder)</h3>
            <p>Proporciona energía eléctrica a todos los componentes del sistema.</p>
            <div className="specs-info">
              <h4>Características importantes:</h4>
              <ul>
                <li><strong>Potencia:</strong> Capacidad total en Watts</li>
                <li><strong>Eficiencia:</strong> Certificación 80 Plus (Bronze, Silver, Gold, Platinum)</li>
                <li><strong>Modular:</strong> Cables desmontables para mejor organización</li>
                <li><strong>Conectores:</strong> Tipos y cantidad de conexiones disponibles</li>
              </ul>
            </div>
          </div>

          <div className="component-card">
            <h3>Motherboard (Placa Base)</h3>
            <p>Conecta y coordina todos los componentes del sistema.</p>
            <div className="specs-info">
              <h4>Características importantes:</h4>
              <ul>
                <li><strong>Socket:</strong> Tipo de conexión para el procesador</li>
                <li><strong>Chipset:</strong> Controlador que gestiona la comunicación</li>
                <li><strong>Slots RAM:</strong> Número de ranuras de memoria</li>
                <li><strong>PCIe:</strong> Ranuras para tarjetas de expansión</li>
              </ul>
            </div>
          </div>

          <div className="component-card">
            <h3>Almacenamiento</h3>
            <p>Donde se guardan permanentemente tus archivos y sistema operativo.</p>
            <div className="specs-info">
              <h4>Características importantes:</h4>
              <ul>
                <li><strong>Capacidad:</strong> Espacio disponible para almacenar</li>
                <li><strong>Velocidad:</strong> Tasa de lectura/escritura</li>
                <li><strong>Formato:</strong> SSD, HDD, NVMe</li>
                <li><strong>Interfaz:</strong> Tipo de conexión (SATA, PCIe)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <Link to="/productos-destacados" className="cta-button">
            Ver Productos Destacados
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home