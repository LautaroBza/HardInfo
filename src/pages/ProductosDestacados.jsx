import React, { useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'
import Card from '../components/Card'
import '../App.css'

function ProductosDestacados() {
  const { products, loading, error, loadAllProducts } = useProducts();

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  if (loading) {
    return (
      <div className="container-home">
        <div className="loading-container">
          <h2>Cargando productos...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-home">
        <div className="error-container">
          <h2>Error al cargar productos</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-home">
      <section className="featured-section">
        <h1 className="titulo-home">Productos Destacados</h1>
        <p className="featured-description">
          Descubre los mejores componentes de hardware seleccionados por nuestro equipo de expertos.
        </p>
        <div className="custom-grid">
          {products.map((component, index) => {
            const productId = component.id_producto || component.id;
            const uniqueKey = productId && !isNaN(Number(productId)) ? productId : `product-${index}`;
            
            return (
              <div
                key={uniqueKey}
                className="custom-grid-item"
              >
                <Card component={component} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  )
}

export default ProductosDestacados 