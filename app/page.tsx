// ===== PÁGINA PRINCIPAL (HOME) =====
// Esta es la primera página que ven los usuarios al entrar a tu tienda

import { Carousel } from 'components/carousel'; // Carrusel de productos en la parte inferior
import { ThreeItemGrid } from 'components/grid/three-items'; // Grid de 3 productos destacados
import Footer from 'components/layout/footer'; // Pie de página con enlaces y información

// ===== METADATOS DE LA PÁGINA PRINCIPAL =====
export const metadata = {
  description:
    'Tienda online de alta calidad con productos personalizados. Encuentra lo que buscas.',
  openGraph: {
    type: 'website' // Tipo de contenido para redes sociales
  }
};

// ===== COMPONENTE DE LA PÁGINA PRINCIPAL =====
export default function HomePage() {
  return (
    <>
      {/* SECCIÓN 1: Grid de productos destacados */}
      {/* Muestra 3 productos: 1 grande a la izquierda + 2 medianos apilados a la derecha */}
      <ThreeItemGrid />
      
      {/* SECCIÓN 2: Carrusel de productos */}
      {/* Carrusel horizontal con productos que se desplazan automáticamente */}
      <Carousel />
      
      {/* SECCIÓN 3: Pie de página */}
      {/* Enlaces de navegación, información de contacto y menús adicionales */}
      <Footer />
    </>
  );
}
