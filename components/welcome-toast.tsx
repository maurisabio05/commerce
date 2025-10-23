/**
 * Componente WelcomeToast
 * 
 * Este componente muestra un toast de bienvenida cuando el usuario visita la tienda por primera vez.
 * Utiliza cookies para recordar si ya se mostró el mensaje y evitar mostrarlo repetidamente.
 */
'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // Ignorar si la altura de la pantalla es muy pequeña (dispositivos móviles pequeños)
    if (window.innerHeight < 650) return;
    
    // Verificar si ya se mostró el toast anteriormente usando cookies
    if (!document.cookie.includes('welcome-toast=2')) {
      // Mostrar el toast de bienvenida
      toast('🛍️ Welcome to Next.js Commerce!', {
        id: 'welcome-toast',
        duration: Infinity, // El toast permanece hasta que el usuario lo cierre
        onDismiss: () => {
          // Guardar en cookie que ya se mostró el toast (válido por 1 año)
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            This is a high-performance, SSR storefront powered by Shopify, Next.js, and Vercel.{' '}
            <a
              href="https://vercel.com/templates/next.js/nextjs-commerce"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Deploy your own
            </a>
            .
          </>
        )
      });
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  // Este componente no renderiza nada visible, solo maneja la lógica del toast
  return null;
}
