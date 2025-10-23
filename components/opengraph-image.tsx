/**
 * Componente OpengraphImage
 * 
 * Este componente genera imágenes dinámicas para Open Graph (redes sociales).
 * Cuando se comparte un enlace en redes sociales, esta imagen aparece como vista previa.
 * Utiliza la API @vercel/og para generar imágenes SVG/PNG dinámicamente.
 */
import { ImageResponse } from 'next/og';
import LogoIcon from './icons/logo';
import { join } from 'path';
import { readFile } from 'fs/promises';

export type Props = {
  title?: string; // Título opcional para mostrar en la imagen
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  // Configurar el título: usar el proporcionado o el nombre del sitio por defecto
  const { title } = {
    ...{
      title: process.env.SITE_NAME // Título por defecto desde variables de entorno
    },
    ...props // Sobrescribir con props si se proporciona
  };

  // Cargar la fuente Inter Bold desde el sistema de archivos
  const file = await readFile(join(process.cwd(), './fonts/Inter-Bold.ttf'));
  const font = Uint8Array.from(file).buffer;

  // Generar y retornar la imagen usando JSX-like syntax
  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        {/* Contenedor del logo con borde redondeado */}
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="white" />
        </div>
        {/* Título principal de la imagen */}
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      // Dimensiones estándar para Open Graph (1200x630)
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          style: 'normal',
          weight: 700 // Peso bold para el texto
        }
      ]
    }
  );
}
