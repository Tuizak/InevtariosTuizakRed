import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

// Registrar los componentes necesarios en ChartJS
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Graficas = () => {
  const [proveedoresCount, setProveedoresCount] = useState(0);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proveedoresResponse, productosCategoriaResponse] = await Promise.all([
          fetch('http://localhost:3001/api/statistics/proveedores').then(res => res.json()),
          fetch('http://localhost:3001/api/statistics/productos-categoria').then(res => res.json())
        ]);

        setProveedoresCount(proveedoresResponse);
        setProductosPorCategoria(productosCategoriaResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Preparar datos para la gráfica de barras
  const barData = {
    labels: productosPorCategoria.map(item => item.categoria),
    datasets: [
      {
        label: 'Productos por Categoría',
        data: productosPorCategoria.map(item => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      }
    ]
  };

  // Preparar opciones para la gráfica de barras
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
        }
      }
    }
  };

  // Preparar datos para la gráfica de pastel
  const pieData = {
    labels: ['Proveedores'],
    datasets: [
      {
        label: 'Proveedores',
        data: [proveedoresCount],
        backgroundColor: ['rgba(255, 159, 64, 0.4)'],
        borderColor: ['rgba(255, 159, 64, 1)'],
        borderWidth: 2,
      }
    ]
  };

  // Preparar opciones para la gráfica de pastel
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Estadísticas</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ width: '45%', marginBottom: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Conteo de Proveedores</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div style={{ width: '45%', marginBottom: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Productos por Categoría</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Graficas;
