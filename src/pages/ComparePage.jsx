import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import HardCategories from '../data/hardCategories';
import CompareSpecs from '../components/CompareSpecs';

function ComparePage() {
  const [selectedComponents, setSelectedComponents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Leer parámetros de la URL
  const searchParams = new URLSearchParams(location.search);
  const categoriaParam = searchParams.get('categoria');
  const idParam = searchParams.get('id');

  // Determinar la categoría a comparar: si hay un producto seleccionado, usar su categoría
  const selectedCategory = selectedComponents[0]?.category || categoriaParam;

  // Filtrar componentes por la categoría seleccionada
  const components = selectedCategory
    ? HardCategories.filter((c) => c.category === selectedCategory)
    : HardCategories;

  // Seleccionar automáticamente el producto si hay parámetro id
  useEffect(() => {
    if (idParam && categoriaParam && selectedComponents.length === 0) {
      const found = HardCategories.find((c) => c.id.toString() === idParam && c.category === categoriaParam);
      if (found) setSelectedComponents([found]);
    }
  }, [idParam, categoriaParam, selectedComponents.length]);

  const handleComponentSelect = (component) => {
    if (selectedComponents.length < 2 && !selectedComponents.some(c => c.id === component.id)) {
      setSelectedComponents([...selectedComponents, component]);
    }
  };

  const handleRemoveComponent = (index) => {
    const newSelected = selectedComponents.filter((_, i) => i !== index);
    setSelectedComponents(newSelected);
  };

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
              key={component.id}
              className="custom-grid-item"
              onClick={() => handleComponentSelect(component)}
              style={{ opacity: selectedComponents.some(c => c.id === component.id) ? 0.5 : 1, pointerEvents: selectedComponents.some(c => c.id === component.id) ? 'none' : 'auto' }}
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