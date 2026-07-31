import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductView.css';
import { productsData } from '../productsData';

const ProductView = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const product = productsData.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="product-view not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe.</p>
        <Link to="/products" className="back-link">Volver al listado</Link>
      </div>
    );
  }

  const recommendedProducts = productsData
    .filter((item) => item.id !== productId)
    .slice(0, 3);

  const otherProducts = productsData
    .filter((item) => item.id !== productId)
    .slice(3, 9);

  return (
    <div className="product-view">
      <div className="product-view-card">
        <div className="product-view-main">
          <div className="product-view-image">
            <img src={product.img || '/img/default-fallback.png'} alt={product.nombre} />
          </div>

          <div className="product-view-details">
            <h2>{product.nombre}</h2>
            <p className="product-view-description">{product.descripcion}</p>
            <div className="product-view-meta">
              <span className="product-view-price">Precio: ${product.precio}</span>
              <span className="product-view-stock">Stock disponible: {product.stock}</span>
            </div>
            <Link to="/products" className="back-link">Volver al listado</Link>
          </div>
        </div>

        <div className="product-view-recommendations">
          <h3>Productos recomendados</h3>
          <div className="product-view-grid">
            {recommendedProducts.map((item) => (
              <Link to={`/products/${item.id}`} key={item.id} className="small-product-card">
                <div className="small-product-image">
                  <img src={item.img || '/img/default-fallback.png'} alt={item.nombre} />
                </div>
                <div>
                  <h4>{item.nombre}</h4>
                  <span>${item.precio}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="product-view-other">
          <h3>Otros productos</h3>
          <div className="product-view-grid">
            {otherProducts.map((item) => (
              <Link to={`/products/${item.id}`} key={item.id} className="small-product-card">
                <div className="small-product-image">
                  <img src={item.img || '/img/default-fallback.png'} alt={item.nombre} />
                </div>
                <div>
                  <h4>{item.nombre}</h4>
                  <span>${item.precio}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
