# Catálogo de Productos

Aplicación web que consume la API pública **Fake Store API** para mostrar un catálogo de productos, con búsqueda, filtro por categoría y paginación.

- **URL de la aplicación:** 
- **Repositorio:** https://github.com/Landon919/Practica-4.git

## API utilizada

- **Nombre:** Fake Store API (https://fakestoreapi.com)
- **Autenticación:** no requiere clave ni datos sensibles.
- **Endpoint:** `GET https://fakestoreapi.com/products`
- **Formato de respuesta:** arreglo JSON con 20 productos. Ejemplo:

```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack",
  "price": 109.95,
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": { "rate": 3.9, "count": 120 }
}
```

- **Posibles errores:** `404` (recurso no encontrado) y `5xx` (falla del servidor).

## Funcionalidades

- Consumo de la API con `fetch()` y `async/await`.
- Tarjetas de producto creadas dinámicamente en el DOM.
- Búsqueda por nombre y filtro por categoría.
- Paginación sencilla (8 productos por página).
- Estados de carga, resultado vacío y error con botón "Reintentar".

## Instrucciones de uso

1. Abre la URL de la aplicación.
2. Escribe en el buscador o elige una categoría para filtrar.
3. Usa los botones "Anterior" y "Siguiente" para cambiar de página.

Para ejecutarla localmente, clona el repositorio y abre `index.html` con Live Server en VS Code.

## Tecnologías

HTML5, CSS3, JavaScript ES6+, Fetch API, JSON, Git y GitHub.

## Capturas

| Vista general | Búsqueda | Estado de error |
|---|---|---|
| ![General](capturas/general.png) | ![Búsqueda](capturas/busqueda.png) | ![Error](capturas/error.png) |

