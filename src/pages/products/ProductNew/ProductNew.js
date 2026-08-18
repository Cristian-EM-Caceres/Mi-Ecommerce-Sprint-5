import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductNew.css';

const ProductNew = () => {
  const navigate = useNavigate();

  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    tienda: '',
    img: '',
    categoria: ''
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then(respuesta => respuesta.json())
      .then(datos => setCategorias(datos))
      .catch(error => console.error('Error al cargar categorías:', error));
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    let valorProcesado = value;
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

  const manejarSubidaImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setDatosFormulario({ ...datosFormulario, img: lector.result });
      };
      lector.readAsDataURL(archivo); 
    }
  };

  const cancelarCreacion = () => {
    navigate('/products');
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    if (!datosFormulario.nombre.trim()) {
      alert("El nombre del producto es obligatorio.");
      return;
    }

    if (!datosFormulario.categoria) {
      alert("Debes seleccionar una categoría.");
      return;
    }

    const datosAEnviar = {
      ...datosFormulario,
      precio: parseInt(datosFormulario.precio, 10) || 0,
      stock: parseInt(datosFormulario.stock, 10) || 0,
      imagen: datosFormulario.img
    };

    try {
      const respuesta = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAEnviar)
      });

      if (respuesta.ok) {
        alert("¡Producto creado exitosamente!");
        navigate('/products');
      } else {
        console.error("Error del servidor");
        alert("Hubo un error al crear el producto.");
      }
    } catch (error) {
      console.error('Error de red al guardar:', error);
      alert("No se pudo conectar con el servidor backend.");
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
                placeholder="Ej. Camiseta"
              />
            </div>

            <div className="form-group">
              <label>Categoría *</label>
              <select
                name="categoria"
                value={datosFormulario.categoria}
                onChange={manejarCambioInput}
                required
              >
                <option value="">Selecciona una categoría...</option>
                {categorias.length > 0 ? (
                  categorias.map(cat => (
                    <option key={cat.id || cat.nombre} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Camisetas">Camisetas</option>
                    <option value="Botines">Botines</option>
                    <option value="Guantes">Guantes</option>
                    <option value="Pelotas">Pelotas</option>
                  </>
                )}
              </select>
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
              <label>Imagen del Producto</label>

              {datosFormulario.img && (
                <div className="image-preview-container">
                  <img
                    src={datosFormulario.img}
                    alt="Vista previa"
                    className="image-preview"
                  />
                </div>
              )}

              <div className="image-control" style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={manejarSubidaImagen}
                />
                <button
                  type="button"
                  onClick={() => setDatosFormulario({...datosFormulario, img: ''})}
                  className="action-btn danger"
                >
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