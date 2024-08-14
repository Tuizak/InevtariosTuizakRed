import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Provedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState('');

  // Obtener proveedores al cargar el componente
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/proveedores');
        setProveedores(response.data);
      } catch (error) {
        setError('Error al obtener proveedores');
        console.error('Error fetching proveedores:', error);
      }
    };

    fetchProveedores();
  }, []);

  return (
    <div>
      <h2>Proveedores</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.length > 0 ? (
            proveedores.map((prov) => (
              <tr key={prov.id}>
                <td>{prov.id}</td>
                <td>{prov.nombre}</td>
                <td>{prov.contacto}</td>
                <td>{prov.direccion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay proveedores disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Provedores;
