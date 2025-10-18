import { Product, Collection, Menu, Cart, Page } from './shopify/types';
import productsData from '../data/products.json';

// Función helper para simular delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Función para obtener todos los productos
export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
} = {}): Promise<Product[]> {
  await delay(100); // Simular delay de API
  
  let products = [...productsData.products] as Product[];
  
  // Filtrar por query si se proporciona
  if (query) {
    products = products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }
  
  // Ordenar productos
  if (sortKey) {
    products.sort((a, b) => {
      let comparison = 0;
      
      switch (sortKey) {
        case 'PRICE':
          comparison = parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount);
          break;
        case 'CREATED_AT':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'BEST_SELLING':
          // Para demo, usar orden aleatorio
          comparison = Math.random() - 0.5;
          break;
        default:
          comparison = a.title.localeCompare(b.title);
      }
      
      return reverse ? -comparison : comparison;
    });
  }
  
  return products;
}

// Función para obtener un producto por handle
export async function getProduct(handle: string): Promise<Product | undefined> {
  await delay(100);
  return productsData.products.find(product => product.handle === handle) as Product | undefined;
}

// Función para obtener productos de una colección
export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  await delay(100);
  
  // Si es la colección especial del carousel, devolver algunos productos
  if (collection === 'hidden-homepage-carousel') {
    return productsData.products.slice(0, 3) as Product[];
  }
  
  // Si es la colección especial de featured items (para el grid de 3 items)
  if (collection === 'hidden-homepage-featured-items') {
    // Devolver los 3 productos en orden específico para el layout
    return productsData.products.slice(0, 3) as Product[];
  }
  
  // Filtrar productos por colección basado en tags
  const products = productsData.products.filter(product => 
    product.tags.includes(collection)
  ) as Product[];
  
  return products;
}

// Función para obtener todas las colecciones
export async function getCollections(): Promise<Collection[]> {
  await delay(100);
  return productsData.collections as unknown as Collection[];
}

// Función para obtener una colección específica
export async function getCollection(handle: string): Promise<Collection | undefined> {
  await delay(100);
  return productsData.collections.find(collection => collection.handle === handle) as unknown as Collection | undefined;
}

// Función para obtener el menú
export async function getMenu(handle: string): Promise<Menu[]> {
  await delay(100);
  return productsData.menu as Menu[];
}

// Función para obtener páginas (vacío por ahora)
export async function getPages(): Promise<Page[]> {
  await delay(100);
  return [];
}

// Función para obtener una página específica
export async function getPage(handle: string): Promise<Page> {
  await delay(100);
  return {
    id: '',
    title: '',
    handle: '',
    body: '',
    bodySummary: '',
    seo: { title: '', description: '' },
    createdAt: '',
    updatedAt: ''
  };
}

// Funciones del carrito (simplificadas para datos locales)
export async function getCart(): Promise<Cart | undefined> {
  // En una implementación real, podrías usar localStorage aquí
  return undefined;
}

export async function createCart(): Promise<Cart> {
  return {
    id: 'local-cart-' + Date.now(),
    checkoutUrl: '',
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'USD' },
      totalAmount: { amount: '0', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0', currencyCode: 'USD' }
    },
    lines: [],
    totalQuantity: 0
  };
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  // Implementación simplificada
  return createCart();
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  return createCart();
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  return createCart();
}

// Función para obtener recomendaciones de productos
export async function getProductRecommendations(productId: string): Promise<Product[]> {
  await delay(100);
  // Devolver productos aleatorios como recomendaciones
  const allProducts = productsData.products as Product[];
  return allProducts.filter(p => p.id !== productId).slice(0, 3);
}
