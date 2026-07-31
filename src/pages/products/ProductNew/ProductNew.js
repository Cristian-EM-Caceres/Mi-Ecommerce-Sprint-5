import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductNew.css';

const ProductNew = () => {
  const navigate = useNavigate();

  // Estado inicial del formulario con los valores por defecto requeridos
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    tienda: '',
    img: ''
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    
    let valorProcesado = value;
    
    // Validación: precio y stock deben ser enteros (por defecto 0)
    if (name === 'precio' || name === 'stock') {
      valorProcesado = value === '' ? 0 : parseInt(value, 10);
      if (isNaN(valorProcesado)) valorProcesado = 0;
    }

    setDatosFormulario({ ...datosFormulario, [name]: valorProcesado });
  };

  const cambiarStock = (cantidad) => {
    setDatosFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      stock: Math.max(0, parseInt(estadoAnterior.stock || 0) + cantidad)
    }));
  };

  const cancelarCreacion = () => {
    // Si cancela, lo devolvemos al listado de productos
    navigate('/products');
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    
    // Validación de nombre requerido (el required de HTML5 también ayuda)
    if (!datosFormulario.nombre.trim()) {
      alert("El nombre del producto es obligatorio.");
      return;
    }

    const datosAEnviar = {
      ...datosFormulario,
      precio: parseInt(datosFormulario.precio, 10) || 0,
      stock: parseInt(datosFormulario.stock, 10) || 0
    };

    try {
      // Petición POST a la API
      const respuesta = await fetch('/products/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAEnviar)
      });

      if (respuesta.ok) {
        alert("Producto creado exitosamente");
        navigate('/products'); // Redirige al listado
      } else {
        alert("Hubo un error al crear el producto.");
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      // MOCK: Para pruebas locales sin API, simulamos éxito:
      alert("Simulación: Producto creado exitosamente");
      navigate('/products');
    }
  };

  return (
    <div className="productnew">
      <div className="productnewcard">
        
        <div className="productnew.headertop">
          <div className="breadcrumb-title">
            <Link to="/products" className="breadcrumb-link">Productos</Link> &gt; Nuevo Producto
          </div>
        </div>

        <div className="edit-section" style={{ marginTop: '20px', borderTop: 'none' }}>
          <h3>Registrar Nuevo Producto</h3>
          <form className="edit-form" onSubmit={guardarProducto}>
            
            <div className="formgroup">
              <label>Nombre *</label>
              <input 
                type="text" 
                name="nombre" 
                value={datosFormulario.nombre} 
                onChange={manejarCambioInput} 
                required 
                placeholder="Ej. Teclado Mecánico"
              />
            </div>

            <div className="form-group">
              <label>Valor ($)</label>
              <input 
                type="number" 
                name="precio" 
                value={datosFormulario.precio} 
                onChange={manejarCambioInput} 
                step="1"
                min="0"
                required 
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <div className="stock-control">
                <button type="button" onClick={() => cambiarStock(-1)} className="btn-stock">➖</button>
                <input 
                  type="number" 
                  name="stock" 
                  value={datosFormulario.stock} 
                  onChange={manejarCambioInput} 
                  step="1"
                  min="0"
                  required
                />
                <button type="button" onClick={() => cambiarStock(1)} className="btn-stock">➕</button>
              </div>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea 
                name="descripcion" 
                value={datosFormulario.descripcion} 
                onChange={manejarCambioInput} 
                rows="4"
                placeholder="Descripción del producto (opcional)"
              ></textarea>
            </div>

            <div className="form-group">
              <label>URL de la Imagen</label>
              <div className="image-control" style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  name="img" 
                  value={datosFormulario.img} 
                  onChange={manejarCambioInput}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  style={{ flex: 1 }}
                />
                <button type="button" onClick={() => setDatosFormulario({...datosFormulario, img: ''})} className="action-btn danger">
                  Remover
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={cancelarCreacion} className="action-btn secondary">Cancelar</button>
              <button type="submit" className="action-btn primary">Guardar</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProductNew;