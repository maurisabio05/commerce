/**
 * Componente Price
 * 
 * Este componente formatea y muestra precios con la moneda correspondiente.
 * Utiliza la API Intl.NumberFormat para formatear correctamente los precios
 * según la configuración regional del navegador y la moneda especificada.
 */
import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'USD', // Moneda por defecto: Dólares estadounidenses
  currencyCodeClassName
}: {
  amount: string; // Precio como string (ej: "29.99")
  className?: string; // Clases CSS opcionales para el contenedor
  currencyCode: string; // Código de moneda (ej: "USD", "EUR", "ARS")
  currencyCodeClassName?: string; // Clases CSS opcionales para el código de moneda
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {/* Formatear el precio usando la API de internacionalización del navegador */}
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol' // Mostrar símbolo de moneda compacto ($ en lugar de USD)
    }).format(parseFloat(amount))}`}
    {/* Mostrar el código de moneda como texto adicional */}
    <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
  </p>
);

export default Price;
