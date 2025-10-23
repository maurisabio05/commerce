/**
 * Componente Prose
 * 
 * Este componente renderiza contenido HTML con estilos de prosa (texto largo) aplicados.
 * Utiliza Tailwind CSS con el plugin @tailwindcss/typography para dar formato al contenido.
 * Incluye estilos para encabezados, enlaces, listas y texto en modo claro/oscuro.
 */
import clsx from 'clsx';

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        // Estilos base de prosa con tipografía y espaciado
        'prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline prose-a:hover:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white',
        className // Clases adicionales opcionales
      )}
      // Renderizar HTML de forma segura (¡cuidado con el contenido no confiable!)
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;
