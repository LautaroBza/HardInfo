import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare debe ser usado dentro de un CompareProvider');
  }
  return context;
};

export const CompareProvider = ({ children }) => {
  const [selectedComponents, setSelectedComponents] = useState([]);

  const addComponent = (component) => {
    const componentId = component.id_producto || component.id;
    if (selectedComponents.length < 2 && !selectedComponents.some(c => (c.id_producto || c.id) === componentId)) {
      setSelectedComponents([...selectedComponents, component]);
    }
  };

  const removeComponent = (index) => {
    const newSelected = selectedComponents.filter((_, i) => i !== index);
    setSelectedComponents(newSelected);
  };

  const clearComparison = () => {
    setSelectedComponents([]);
  };

  const value = {
    selectedComponents,
    addComponent,
    removeComponent,
    clearComparison,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}; 