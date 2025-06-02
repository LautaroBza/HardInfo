import React from 'react'
import HardCategories from '../data/hardCategories'
import Card from '../components/Card'
import '../App.css'

function Home() {
  return (
    <div className="container-home">
      <h1 className="titulo-home">Productos Destacados</h1>
      <div className="custom-grid">
        {HardCategories.map((component) => (
          <div
            key={component.id}
            className="custom-grid-item"
          >
            <Card component={component} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home