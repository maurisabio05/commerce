// ===== COMPONENTE CARRUSEL DE PRODUCTOS =====
// Carrusel horizontal que se desplaza automáticamente mostrando productos

import { getCollectionProducts } from 'lib/shopify'; // Función para obtener productos (usa datos locales)
import Link from 'next/link'; // Componente de Next.js para navegación
import { GridTileImage } from './grid/tile'; // Componente para mostrar imagen del producto

export async function Carousel() {
  // Obtener productos para el carrusel de la colección especial (usa datos del JSON local)
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  // Si no hay productos, no mostrar el carrusel
  if (!products?.length) return null;

  // TRUCO: Duplicar productos 3 veces para crear un carrusel infinito
  // Esto evita que se acaben los productos en pantallas muy anchas
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      {/* Lista horizontal con animación de carrusel automático */}
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`} // Key único combinando handle del producto + índice
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            {/* Enlace al producto individual */}
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              {/* Imagen del producto con información superpuesta */}
              <GridTileImage
                alt={product.title} // Texto alternativo para accesibilidad
                label={{
                  title: product.title, // Nombre del producto
                  amount: product.priceRange.maxVariantPrice.amount, // Precio
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode // Moneda
                }}
                src={product.featuredImage?.url} // URL de la imagen principal
                fill // Llenar todo el contenedor
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" // Tamaños responsivos
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
