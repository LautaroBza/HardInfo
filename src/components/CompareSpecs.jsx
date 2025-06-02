import React from 'react';

const detalles = [
  { label: 'Nombre', key: 'name' },
  { label: 'Categoría', key: 'category' },
  { label: 'Descripción', key: 'description' },
  { label: 'Precio', key: 'price', render: v => v ? `$${v.toFixed(2)}` : '-' },
  // Agrega aquí más detalles si tu objeto tiene más propiedades
];

export default function CompareSpecs({ components, onRemove }) {
  return (
    <div className="compare-main">
      <div className="compare-flex">
        {/* Producto 1 */}
        <div className="compare-product">
          {components[0] ? (
            <>
              <button
                className="compare-remove-btn"
                onClick={() => onRemove(0)}
                title="Quitar"
              >
                ✕
              </button>
              <div className="compare-imgbox">
                {components[0].image ? <img src={components[0].image} alt={components[0].name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: 8 }} /> : 'Producto'}
              </div>
              <div className="compare-product-name">{components[0].name}</div>
            </>
          ) : (
            <div className="compare-imgbox">Producto</div>
          )}
        </div>
        {/* VS */}
        <div className="compare-vs">Vs</div>
        {/* Producto 2 */}
        <div className="compare-product">
          {components[1] ? (
            <>
              <button
                className="compare-remove-btn"
                onClick={() => onRemove(1)}
                title="Quitar"
              >
                ✕
              </button>
              <div className="compare-imgbox">
                {components[1].image ? <img src={components[1].image} alt={components[1].name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: 8 }} /> : 'Producto'}
              </div>
              <div className="compare-product-name">{components[1].name}</div>
            </>
          ) : (
            <div className="compare-imgbox">Producto</div>
          )}
        </div>
      </div>
      {/* Detalles alineados */}
      <div className="compare-details">
        {/* Columna de detalles producto 1 */}
        <div className="compare-details-col">
          {detalles.map(({ label, key, render }) => (
            <div className="compare-detail-row" key={key}>
              <span className="compare-detail-label">{label}</span>
              <span className="compare-detail-value">{components[0] ? (render ? render(components[0][key]) : components[0][key] || '-') : '-'}</span>
            </div>
          ))}
        </div>
        {/* Columna de detalles producto 2 */}
        <div className="compare-details-col">
          {detalles.map(({ label, key, render }) => (
            <div className="compare-detail-row" key={key}>
              <span className="compare-detail-label">{label}</span>
              <span className="compare-detail-value">{components[1] ? (render ? render(components[1][key]) : components[1][key] || '-') : '-'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 