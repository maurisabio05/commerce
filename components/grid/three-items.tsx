// ===== COMPONENTE GRID DE 3 PRODUCTOS DESTACADOS =====
// Layout: 1 producto grande (izquierda) + 2 productos medianos (derecha, apilados)

import { GridTileImage } from 'components/grid/tile'; // Componente para mostrar imagen del producto
import { getCollectionProducts } from 'lib/shopify'; // Función para obtener productos (usa datos locales)
import type { Product } from 'lib/shopify/types'; // Tipos de TypeScript para productos
import Link from 'next/link'; // Componente de Next.js para navegación

// ===== COMPONENTE INDIVIDUAL DE PRODUCTO EN EL GRID =====
function ThreeItemGridItem({
  item, // Datos del producto
  size, // Tamaño: 'full' (grande) o 'half' (mediano)
  priority // Si debe cargar la imagen con prioridad (para SEO)
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      // Clases CSS responsivas: producto grande ocupa 4 columnas y 2 filas, mediano ocupa 2x1
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      {/* Enlace al producto individual */}
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`} // URL del producto basada en su handle
        prefetch={true} // Pre-cargar la página para navegación más rápida
      >
        {/* Imagen del producto con overlay de información */}
        <GridTileImage
          src={item.featuredImage.url} // URL de la imagen principal
          fill // Llenar todo el contenedor
          sizes={
            // Tamaños responsivos para optimización de carga
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority} // Cargar con prioridad si es necesario
          alt={item.title} // Texto alternativo para accesibilidad
          label={{
            position: size === 'full' ? 'center' : 'bottom', // Posición del label de precio
            title: item.title as string, // Nombre del producto
            amount: item.priceRange.maxVariantPrice.amount, // Precio
            currencyCode: item.priceRange.maxVariantPrice.currencyCode // Moneda
          }}
        />
      </Link>
    </div>
  );
}

// ===== COMPONENTE PRINCIPAL DEL GRID =====
export async function ThreeItemGrid() {
  // Obtener productos destacados de la colección especial (usa datos del JSON local)
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items' // Colección especial para productos destacados
  });

  // Si no hay al menos 3 productos, no mostrar el componente
  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  // Destructurar los primeros 3 productos para el layout
  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      {/* PRODUCTO GRANDE (izquierda) - Ocupa 4 columnas y 2 filas */}
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      
      {/* PRODUCTO MEDIANO 1 (arriba derecha) - Ocupa 2 columnas y 1 fila */}
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      
      {/* PRODUCTO MEDIANO 2 (abajo derecha) - Ocupa 2 columnas y 1 fila */}
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
