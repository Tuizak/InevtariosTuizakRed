import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Disenos/CatalogoDi.css";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [editProducto, setEditProducto] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState(null);

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

  // Manejar eliminación de producto con confirmación
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/productos/${id}`);
        setProductos(productos.filter(producto => producto.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Manejar actualización de producto
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Solo agregar campos modificados
    if (nombre !== editProducto.nombre) formData.append('nombre', nombre);
    if (precio !== editProducto.precio) formData.append('precio', precio);
    if (stock !== editProducto.stock) formData.append('stock', stock);
    if (descripcion !== editProducto.descripcion) formData.append('descripcion', descripcion);
    if (foto) formData.append('foto', foto);

    try {
      await axios.put(`http://localhost:3001/api/productos/${editProducto.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProductos(productos.map(producto =>
        producto.id === editProducto.id
          ? { ...producto, nombre: nombre || producto.nombre, precio: precio || producto.precio, stock: stock || producto.stock, descripcion: descripcion || producto.descripcion, foto: foto ? foto.name : producto.foto }
          : producto
      ));
      setEditProducto(null);
      setNombre('');
      setPrecio('');
      setStock('');
      setDescripcion('');
      setFoto(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Configuración de formulario de edición
  const handleEdit = (producto) => {
    setEditProducto(producto);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setStock(producto.stock);
    setDescripcion(producto.descripcion);
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      {categorias.map(categoria => (
        <div key={categoria.id}>
          <h3>{categoria.nombre}</h3>
          <div>
            {productosPorCategoria[categoria.id]?.length > 0 ? (
              productosPorCategoria[categoria.id].map(producto => (
                <div key={producto.id} className="producto-card">
                  <h4>{producto.nombre}</h4>
                  <p>{producto.descripcion}</p>
                  <p>Precio: ${producto.precio}</p>
                  <p>Stock: {producto.stock}</p>
                  {producto.foto && <img src={`http://localhost:3001/uploads/${producto.foto}`} alt={producto.nombre} />}
                  <button onClick={() => handleEdit(producto)}>Editar</button>
                  <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
                </div>
              ))
            ) : (
              <p>No hay productos en esta categoría.</p>
            )}
          </div>
        </div>
      ))}

      {editProducto && (
        <div className="edit-form">
          <h3>Editar Producto</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div>
              <label>Precio:</label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
            <div>
              <label>Stock:</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <label>Descripción:</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div>
              <label>Foto:</label>
              <input
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit">Actualizar Producto</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Catalogo;
