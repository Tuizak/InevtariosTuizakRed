import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Disenos/InicioDi.css"; // Añade tus estilos aquí

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Obtener productos y categorías al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosResponse, categoriasResponse] = await Promise.all([
          axios.get('http://localhost:3001/api/productos'),
          axios.get('http://localhost:3001/api/categorias'),
        ]);
        setProductos(productosResponse.data);
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Agrupar productos por categoría
  const productosPorCategoria = categorias.reduce((acc, categoria) => {
    acc[categoria.id] = productos.filter(producto => producto.categoria_id === categoria.id);
    return acc;
  }, {});

  return (
    <div className="inicio-container">
      <h2>Bienvenido a la Tienda Online</h2>
      {categorias.map(categoria => (
        <div key={categoria.id} className="categoria-section">
          <h3>{categoria.nombre}</h3>
          <div className="productos-list">
            {productosPorCategoria[categoria.id]?.length > 0 ? (
              productosPorCategoria[categoria.id].map(producto => (
                <div key={producto.id} className="producto-card">
                  <h4>{producto.nombre}</h4>
                  <p>{producto.descripcion}</p>
                  <p>Precio: ${producto.precio}</p>
                  <p>Stock: {producto.stock}</p>
                  {producto.foto && <img src={`http://localhost:3001/uploads/${producto.foto}`} alt={producto.nombre} />}
                </div>
              ))
            ) : (
              <p>No hay productos en esta categoría.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inicio;
