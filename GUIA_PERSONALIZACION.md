# 🛍️ Guía de Personalización - Tu Tienda Online

Esta guía te explica cómo personalizar cada parte de tu tienda online.

## 📁 Estructura de Archivos Importantes

### 🎨 **Frontend (Lo que ven los usuarios)**
- `app/layout.tsx` - **Layout principal** (estructura base de todas las páginas)
- `app/page.tsx` - **Página principal** (home con productos destacados)
- `components/grid/three-items.tsx` - **Grid de 3 productos** (1 grande + 2 medianos)
- `components/carousel.tsx` - **Carrusel de productos** (desplazamiento horizontal)
- `components/layout/navbar/index.tsx` - **Barra de navegación** (logo, menú, búsqueda, carrito)

### 📊 **Datos (Tus productos e información)**
- `data/products.json` - **Base de datos de productos** (aquí agregas/editas productos)
- `lib/local-data.ts` - **Sistema de datos locales** (lógica para obtener productos)
- `public/images/products/` - **Carpeta de imágenes** (aquí van las fotos de productos)

## 🛠️ Cómo Personalizar

### 1. **Agregar/Editar Productos**

Edita el archivo `data/products.json`:

```json
{
  "id": "producto-nuevo",
  "handle": "mi-producto-genial",
  "title": "Mi Producto Genial",
  "description": "Descripción de mi producto",
  "tags": ["categoria", "tipo"],
  "priceRange": {
    "maxVariantPrice": {
      "amount": "99.99",
      "currencyCode": "USD"
    }
  },
  "featuredImage": {
    "url": "/images/products/mi-imagen.jpg",
    "altText": "Descripción de la imagen"
  }
}
```

### 2. **Cambiar Imágenes**

1. Agrega tus imágenes a `public/images/products/`
2. Actualiza las URLs en `data/products.json`
3. Usa formato JPG o PNG, tamaño recomendado: 800x800px

### 3. **Personalizar Colores y Estilos**

Los estilos están en `app/globals.css` y usan Tailwind CSS:

- **Fondo claro**: `bg-neutral-50`
- **Fondo oscuro**: `dark:bg-neutral-900`
- **Color de selección**: `selection:bg-teal-300`

### 4. **Cambiar Información de la Tienda**

Edita las variables de entorno en `.env.local`:

```env
SITE_NAME="Tu Tienda Increíble"
COMPANY_NAME="Tu Empresa"
```

### 5. **Modificar el Menú de Navegación**

Edita la sección `menu` en `data/products.json`:

```json
"menu": [
  {
    "title": "Ropa",
    "path": "/search/ropa"
  },
  {
    "title": "Accesorios",
    "path": "/search/accesorios"
  }
]
```

## 🎯 Componentes Explicados

### **Grid de 3 Productos** (`components/grid/three-items.tsx`)
- **Qué hace**: Muestra 3 productos destacados en layout especial
- **Layout**: 1 producto grande (izquierda) + 2 productos medianos (derecha)
- **Personalizar**: Cambia qué productos se muestran en `lib/local-data.ts` línea 81-84

### **Carrusel** (`components/carousel.tsx`)
- **Qué hace**: Carrusel horizontal con animación automática
- **Personalizar**: Cambia velocidad de animación en `app/globals.css` (busca `animate-carousel`)

### **Navbar** (`components/layout/navbar/index.tsx`)
- **Qué hace**: Barra superior con logo, menú, búsqueda y carrito
- **Secciones**: 
  - Izquierda: Logo + menú
  - Centro: Búsqueda
  - Derecha: Carrito

## 🔧 Funciones Importantes

### **En `lib/local-data.ts`:**

- `getProducts()` - Obtiene todos los productos con filtros
- `getProduct(handle)` - Obtiene un producto específico
- `getCollectionProducts()` - Obtiene productos de una categoría
- `getMenu()` - Obtiene elementos del menú

### **Colecciones Especiales:**
- `'hidden-homepage-carousel'` - Productos para el carrusel
- `'hidden-homepage-featured-items'` - Productos para el grid de 3

## 📱 Responsive Design

La tienda se adapta automáticamente a diferentes pantallas:

- **Móvil**: Menú hamburguesa, carrusel táctil
- **Tablet**: Layout intermedio
- **Desktop**: Menú completo, grid de 3 productos

## 🚀 Próximos Pasos

### **Desarrollo Actual (JSON Local)**
1. **Agrega tus productos** en `data/products.json`
2. **Sube tus imágenes** a `public/images/products/`
3. **Personaliza colores** en `app/globals.css`
4. **Cambia la información** en las variables de entorno
5. **Prueba en diferentes dispositivos**

### **Migración Futura (Firebase)**
6. **Revisa la estructura Firebase** en `data/products-firebase.json`
7. **Lee la guía de migración** en `MIGRATION_STEPS.md`
8. **Implementa panel de admin** usando `lib/firebase-admin.ts`

## 💡 Tips Útiles

- **Imágenes**: Optimiza para web (máximo 200KB por imagen)
- **SEO**: Usa descripciones detalladas en los productos
- **Performance**: Las imágenes se cargan con lazy loading automático
- **Accesibilidad**: Siempre incluye `altText` en las imágenes

## 🆘 Solución de Problemas

- **No se ven las imágenes**: Verifica que estén en `public/images/products/`
- **Productos no aparecen**: Revisa la sintaxis JSON en `data/products.json`
- **Estilos rotos**: Verifica las clases de Tailwind CSS

---

¡Tu tienda está lista para personalizar! 🎉
