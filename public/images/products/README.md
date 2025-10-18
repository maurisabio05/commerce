# Imágenes de Productos

Esta carpeta contiene las imágenes de tus productos. Para que funcionen correctamente, necesitas agregar las siguientes imágenes:

## Imágenes Requeridas:

### Camiseta Básica Negra
- `camiseta-negra.jpg` - Imagen principal (800x800px recomendado)
- `camiseta-negra-back.jpg` - Imagen de la espalda (800x800px recomendado)

### Jeans Clásicos Azul
- `jeans-azul.jpg` - Imagen principal (800x800px recomendado)

### Zapatillas Deportivas Blancas
- `zapatillas-blancas.jpg` - Imagen principal (800x800px recomendado)

## Recomendaciones:

1. **Formato**: Usa JPG o PNG
2. **Tamaño**: 800x800px mínimo para mejor calidad
3. **Peso**: Optimiza las imágenes para web (máximo 200KB por imagen)
4. **Nombres**: Usa nombres descriptivos sin espacios ni caracteres especiales

## Cómo agregar más productos:

1. Agrega las imágenes a esta carpeta
2. Edita el archivo `/data/products.json` 
3. Agrega la información del nuevo producto siguiendo la estructura existente
4. Actualiza las rutas de las imágenes en el JSON

## Herramientas recomendadas para optimizar imágenes:

- [TinyPNG](https://tinypng.com/) - Compresión online
- [Squoosh](https://squoosh.app/) - Herramienta de Google
- Photoshop, GIMP, o cualquier editor de imágenes

## Ejemplo de estructura de producto en JSON:

```json
{
  "id": "product-4",
  "handle": "tu-producto",
  "title": "Tu Producto",
  "description": "Descripción de tu producto",
  "featuredImage": {
    "url": "/images/products/tu-imagen.jpg",
    "altText": "Descripción de la imagen",
    "width": 800,
    "height": 800
  }
}
```
