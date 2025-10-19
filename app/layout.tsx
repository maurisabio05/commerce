// ===== LAYOUT PRINCIPAL DE LA APLICACIÓN =====
// Este archivo define la estructura base que se aplica a todas las páginas

import { CartProvider } from "components/cart/cart-context"; // Contexto del carrito de compras
import { Navbar } from "components/layout/navbar"; // Barra de navegación superior
import { WelcomeToast } from "components/welcome-toast"; // Notificación de bienvenida
import { GeistSans } from "geist/font/sans"; // Fuente tipográfica moderna
import { getCart } from "lib/shopify"; // Función para obtener el carrito (usa datos locales)
import { baseUrl } from "lib/utils"; // URL base de la aplicación
import { ReactNode } from "react";
import { Toaster } from "sonner"; // Sistema de notificaciones toast
import "./globals.css"; // Estilos globales de la aplicación

// Obtener el nombre del sitio desde las variables de entorno
const { SITE_NAME } = process.env;

// ===== METADATOS SEO =====
// Configuración para motores de búsqueda y redes sociales
export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!, // Título por defecto del sitio
    template: `%s | ${SITE_NAME}`, // Plantilla para páginas individuales
  },
  robots: {
    follow: true, // Permitir que los bots sigan los enlaces
    index: true, // Permitir indexación en buscadores
  },
};

// ===== COMPONENTE LAYOUT PRINCIPAL =====
export default async function RootLayout({
  children, // Contenido de cada página que se renderiza aquí
}: {
  children: ReactNode;
}) {
  // Obtener el carrito del usuario (usa datos locales si Shopify no está configurado)
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      {/* Estilos del body: fondo claro/oscuro, colores de selección */}
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        {/* Proveedor del contexto del carrito - permite acceso al carrito desde cualquier componente */}
        <CartProvider cartPromise={cart}>
          {/* Barra de navegación superior con logo, menú y carrito */}
          <Navbar />
          
          {/* Contenido principal de cada página */}
          <main>
            {children} {/* Aquí se renderiza el contenido específico de cada página */}
            
            {/* Sistema de notificaciones toast (mensajes emergentes) */}
            <Toaster closeButton />
            
            {/* Mensaje de bienvenida para nuevos usuarios */}
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
