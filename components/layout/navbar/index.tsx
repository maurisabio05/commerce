// ===== BARRA DE NAVEGACIÓN PRINCIPAL =====
// Contiene logo, menú de navegación, búsqueda y carrito de compras

import CartModal from 'components/cart/modal'; // Modal del carrito de compras
import LogoSquare from 'components/logo-square'; // Logo de la tienda
import { getMenu } from 'lib/shopify'; // Función para obtener menú (usa datos locales)
import { Menu } from 'lib/shopify/types'; // Tipos de TypeScript para el menú
import Link from 'next/link'; // Componente de Next.js para navegación
import { Suspense } from 'react'; // Para carga asíncrona de componentes
import MobileMenu from './mobile-menu'; // Menú hamburguesa para móviles
import Search, { SearchSkeleton } from './search'; // Barra de búsqueda

// Obtener el nombre del sitio desde las variables de entorno
const { SITE_NAME } = process.env;

export async function Navbar() {
  // Obtener elementos del menú de navegación (usa datos del JSON local)
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      {/* MENÚ MÓVIL (solo visible en pantallas pequeñas) */}
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>

      {/* CONTENEDOR PRINCIPAL DE LA NAVBAR */}
      <div className="flex w-full items-center">
        
        {/* SECCIÓN IZQUIERDA: Logo y menú de navegación */}
        <div className="flex w-full md:w-1/3">
          {/* LOGO Y NOMBRE DE LA TIENDA */}
          <Link
            href="/" // Enlace a la página principal
            prefetch={true} // Pre-cargar la página para navegación más rápida
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare /> {/* Icono/logo de la tienda */}
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME} {/* Nombre de la tienda */}
            </div>
          </Link>

          {/* MENÚ DE NAVEGACIÓN (solo visible en desktop) */}
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path} // URL del elemento del menú
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title} {/* Texto del enlace del menú */}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* SECCIÓN CENTRO: Barra de búsqueda (solo visible en desktop) */}
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        {/* SECCIÓN DERECHA: Carrito de compras */}
        <div className="flex justify-end md:w-1/3">
          <CartModal /> {/* Icono del carrito que abre el modal */}
        </div>
      </div>
    </nav>
  );
}
