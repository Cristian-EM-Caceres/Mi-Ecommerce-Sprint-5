import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../ProductList/ProductList.css';
import './CategorieList.css'; 

const CategorieList = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setProductos(datos);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setCargando(false);
      });
  }, []);

  const agruparPorCategoria = (listaProductos) => {
    return listaProductos.reduce((acumulador, producto) => {
      const categoria = producto.categoria || 'Otros';
      if (!acumulador[categoria]) acumulador[categoria] = [];
      acumulador[categoria].push(producto);
      return acumulador;
    }, {});
  };

  const productosAgrupados = agruparPorCategoria(productos);

  return (
    <div className="admin-product-list">
      <header className="admin-header">
        <h1 className="admin-title">Catálogo por Categorías</h1>
      </header>

      <main className="admin-content">
        {cargando ? (
          <div className="loading-state"><p>Cargando catálogo...</p></div>
        ) : Object.keys(productosAgrupados).length > 0 ? (
          Object.keys(productosAgrupados).map((nombreCategoria) => (
            <div key={nombreCategoria} className="categoria-seccion">
              
              <h2 className="categoria-titulo-agrupado">
                {nombreCategoria}
              </h2>

              {/* GRILLA UNIFICADA */}
              <div className="products-grid">
                {productosAgrupados[nombreCategoria].map((producto) => (
                  <Link key={producto.id} to={`/products/${producto.id}`} className="admin-product-card">
                    
                    <h3 className="card-title">{producto.nombre}</h3>
                    
                    <div className="card-image-container">
                      <img 
                        src={producto.imagen || producto.img || '/img/default-fallback.png'} 
                        alt={producto.nombre} 
                      />
                    </div>
                    
                    <div className="card-info">
                      <ul className="product-details-list">
                        <li className="price">$ {producto.precio.toLocaleString('es-AR')}</li>
                        <li>Los productos personalizados no están sujetos a cambios y/o devoluciones.</li>
                      </ul>
                    </div>

                  </Link>
                ))}
              </div>

            </div>
          ))
        ) : (
          <div className="no-results"><p>No hay productos registrados.</p></div>
        )}
      </main>
    </div>
  );
};

export default CategorieList;