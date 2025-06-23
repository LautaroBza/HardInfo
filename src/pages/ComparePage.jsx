import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import { useProducts } from '../hooks/useProducts';
import CompareSpecs from '../components/CompareSpecs';

function ComparePage() {
  const [selectedComponents, setSelectedComponents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { products, loading, error, loadAllProducts, getProductById } = useProducts();

  // Leer parámetros de la URL
  const searchParams = new URLSearchParams(location.search);
  const categoriaParam = searchParams.get('categoria');
  const idParam = searchParams.get('id');

  // Determinar la categoría a comparar
  const selectedCategory = selectedComponents[0]?.type || categoriaParam;

  // Filtrar componentes por la categoría seleccionada
  const components = selectedCategory
    ? products.filter((c) => c.type?.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  // Cargar productos al montar el componente
  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  // Seleccionar automáticamente el producto si hay parámetro id
  useEffect(() => {
    const loadSelectedProduct = async () => {
      if (idParam && categoriaParam && selectedComponents.length === 0) {
        try {
          if (idParam && !isNaN(Number(idParam))) {
            const found = await getProductById(parseInt(idParam));
            if (found && found.type?.toLowerCase() === categoriaParam.toLowerCase()) {
              setSelectedComponents([found]);
            }
          } else {
            console.error('ID de producto inválido para comparación:', idParam);
          }
        } catch (error) {
          console.error('Error loading selected product:', error);
        }
      }
    };
    
    if (products.length > 0) {
      loadSelectedProduct();
    }
  }, [idParam, categoriaParam, selectedComponents.length, products.length, getProductById]);

  const handleComponentSelect = (component) => {
    const componentId = component.id_producto || component.id;
    if (selectedComponents.length < 2 && !selectedComponents.some(c => (c.id_producto || c.id) === componentId)) {
      setSelectedComponents([...selectedComponents, component]);
    }
  };

  const handleRemoveComponent = (index) => {
    const newSelected = selectedComponents.filter((_, i) => i !== index);
    setSelectedComponents(newSelected);
  };

  if (loading) {
    return (
      <div className="container-home">
        <div className="loading-container">
          <h2>Cargando productos para comparar...</h2>
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
      <h1 className="titulo-home">Comparar Componentes</h1>
      {/* Sección de comparación lado a lado */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Comparación</h2>
        <CompareSpecs components={selectedComponents} onRemove={handleRemoveComponent} />
      </div>
      {/* Sección de selección de componentes */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Componentes</h2>
        <div className="custom-grid">
            {components.map((component) => (
              <div
                key={component.id_producto || component.id}
              className="custom-grid-item"
                onClick={() => handleComponentSelect(component)}
              style={{ opacity: selectedComponents.some(c => (c.id_producto || c.id) === (component.id_producto || component.id)) ? 0.5 : 1, pointerEvents: selectedComponents.some(c => (c.id_producto || c.id) === (component.id_producto || component.id)) ? 'none' : 'auto' }}
                  >
              <Card component={component} hideCompareButton={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComparePage; 