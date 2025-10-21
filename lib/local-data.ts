// ===== SISTEMA DE DATOS LOCALES =====
// Este archivo reemplaza las llamadas a Shopify con datos del archivo JSON local
// Aquí puedes personalizar cómo se obtienen y filtran los productos

// 🔥 MIGRACIÓN A FIREBASE - PASOS FUTUROS:
// 1. Reemplazar import de JSON por Firebase
// 2. Cambiar todas las funciones para usar Firestore
// 3. Agregar cache local para mejor performance
// 4. Implementar funciones de administración

import { Product, Collection, Menu, Cart, Page } from './shopify/types';
import productsData from '../data/products.json'; // Importar datos desde el archivo JSON

// TODO: Cuando migres a Firebase, reemplazar por:
// import { db, COLLECTIONS } from './firebase'
// import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore'

// Función helper para simular delay de API (hace que se sienta más realista)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ===== OBTENER TODOS LOS PRODUCTOS =====
// Esta función devuelve productos con filtrado y ordenamiento
// PERSONALIZACIÓN: Aquí puedes cambiar cómo se filtran y ordenan los productos
export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string; // Texto de búsqueda
  reverse?: boolean; // Si invertir el orden
  sortKey?: string; // Criterio de ordenamiento
} = {}): Promise<Product[]> {
  await delay(100); // Simular delay de API para realismo
  
  let products = [...productsData.products] as Product[];
  
  // 🔥 TODO: MIGRACIÓN A FIREBASE
  // Reemplazar todo este bloque por consultas de Firestore:
  /*
  const productsRef = collection(db, COLLECTIONS.PRODUCTS);
  let q = query(productsRef);
  
  // Filtrado por búsqueda en Firebase
  if (query) {
    // Opción 1: Búsqueda por título (más eficiente)
    q = query(productsRef, 
      where('title', '>=', query),
      where('title', '<=', query + '\uf8ff')
    );
    
    // Opción 2: Para búsqueda más compleja, usar Algolia o cliente
  }
  
  // Ordenamiento en Firebase
  if (sortKey) {
    switch (sortKey) {
      case 'PRICE':
        q = query(q, orderBy('priceRange.minVariantPrice.amount', reverse ? 'desc' : 'asc'));
        break;
      case 'CREATED_AT':
        q = query(q, orderBy('timestamps.createdAt', reverse ? 'desc' : 'asc'));
        break;
      default:
        q = query(q, orderBy('title', reverse ? 'desc' : 'asc'));
    }
  }
  
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
  return products;
  */
  
  // FILTRADO POR BÚSQUEDA (ACTUAL - JSON LOCAL)
  if (query) {
    products = products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }
  
  // ORDENAMIENTO DE PRODUCTOS (ACTUAL - JSON LOCAL)
  if (sortKey) {
    products.sort((a, b) => {
      let comparison = 0;
      
      switch (sortKey) {
        case 'PRICE': // Ordenar por precio
          comparison = parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount);
          break;
        case 'CREATED_AT': // Ordenar por fecha de creación
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'BEST_SELLING': // Más vendidos (simulado con orden aleatorio)
          comparison = Math.random() - 0.5;
          break;
        default: // Ordenar alfabéticamente por título
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
  
  // 🔥 TODO: MIGRACIÓN A FIREBASE
  // Reemplazar por consulta directa a Firestore:
  /*
  const productDoc = doc(db, COLLECTIONS.PRODUCTS, handle);
  const snapshot = await getDoc(productDoc);
  
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Product;
  }
  return undefined;
  */
  
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
