/**
 * Componente LogoSquare
 * 
 * Este componente muestra el logo de la tienda dentro de un contenedor cuadrado con bordes redondeados.
 * Soporta dos tamaños: normal (por defecto) y pequeño ('sm').
 * Se adapta automáticamente al modo claro/oscuro del tema.
 */
import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        // Estilos base: contenedor flex centrado con borde y fondo adaptable al tema
        'flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black',
        {
          // Tamaño normal: 40x40px con bordes más redondeados
          'h-[40px] w-[40px] rounded-xl': !size,
          // Tamaño pequeño: 30x30px con bordes menos redondeados
          'h-[30px] w-[30px] rounded-lg': size === 'sm'
        }
      )}
    >
      {/* Icono del logo con tamaño adaptable */}
      <LogoIcon
        className={clsx({
          'h-[16px] w-[16px]': !size, // Tamaño normal del icono
          'h-[10px] w-[10px]': size === 'sm' // Tamaño pequeño del icono
        })}
      />
    </div>
  );
}
