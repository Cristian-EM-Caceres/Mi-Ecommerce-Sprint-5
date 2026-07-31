🏪 Dashboard de Gestión - Tienda (Sprint 5)
Este proyecto es un Panel de Control (Dashboard) desarrollado para administrar de manera eficiente nuestra tienda inteligente. Construido como una Single Page Application (SPA) utilizando ReactJS (patrón MVC), este panel se comunica directamente con nuestra API REST (desarrollada en Express durante el Sprint 4) y marca nuestra transición oficial hacia el uso de bases de datos relacionales con SQLite.

🚀 Características Principales
El dashboard permite al equipo de administración gestionar de forma gráfica y amigable las entidades principales de la aplicación:

📦 Módulo de Productos
🗃️ Listar todos los productos con opción de búsqueda y filtrado en tiempo real.

👁️ Ver los detalles específicos de cada producto.

➕ Registrar nuevos productos de forma sencilla.

✍🏻 Modificar información existente (nombre, descripción, precio, stock, imágenes).

🗑️ Eliminar productos del catálogo.

🏪 Módulo de Categorías
🗃️ Ver y buscar en el listado de categorías.

👁️ Ver los detalles de una categoría.

➕ Registrar, ✍🏻 modificar o 🗑️ eliminar categorías.

📦 Asignar o remover productos de categorías específicas.

👥 Módulo de Usuarios
🗃️ Ver lista de usuarios.

👁️ Ver los detalles, ➕ registrar, ✍🏻 modificar o 🗑️ eliminar usuarios.

Nota: Preparado arquitectónicamente para el futuro sistema de autenticación real.

🛠️ Tecnologías y Arquitectura
Frontend: ReactJS (Componentes funcionales, modelo atómico).

Backend / API: Node.js + Express.

Base de Datos: SQLite (Migración completa desde almacenamiento local en JSON).

Patrón de Diseño: MVC (Modelo-Vista-Controlador) adaptado a SPA.

Diseño UI: Estructura responsiva dividida en Sidebar (Menú de navegación colapsable en pantallas < 1024px) y Main Area (Header + Content).