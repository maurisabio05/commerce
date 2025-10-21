# 🚀 Pasos para Migrar a Firebase

## 📋 Checklist de Migración

### **Fase 1: Preparación (5-10 minutos)**

- [ ] **1.1** Crear proyecto en [Firebase Console](https://console.firebase.google.com)
- [ ] **1.2** Habilitar Firestore Database
- [ ] **1.3** Habilitar Authentication (opcional para admin)
- [ ] **1.4** Habilitar Storage (para imágenes)
- [ ] **1.5** Obtener configuración del proyecto

### **Fase 2: Instalación (2-3 minutos)**

```bash
# Instalar Firebase SDK
npm install firebase

# Opcional: Firebase Admin SDK para funciones del servidor
npm install firebase-admin
```

### **Fase 3: Configuración (5 minutos)**

- [ ] **3.1** Crear variables de entorno en `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
```

- [ ] **3.2** Descomentar código en `lib/firebase.ts`
- [ ] **3.3** Reemplazar valores de configuración

### **Fase 4: Migración de Datos (10 minutos)**

- [ ] **4.1** Importar datos desde `products-firebase.json`

```javascript
// Opción 1: Importar manualmente desde Firebase Console
// 1. Ir a Firestore Database
// 2. Importar JSON directamente

// Opción 2: Script de importación (recomendado)
// Usar la función importProductsFromJSON() en firebase-admin.ts
```

- [ ] **4.2** Configurar índices en Firestore:

```javascript
// Índices recomendados:
// products: tags.* (Array)
// products: metadata.featured (Ascending)  
// products: availableForSale (Ascending)
// products: timestamps.updatedAt (Descending)
```

### **Fase 5: Actualización del Código (15-20 minutos)**

- [ ] **5.1** Actualizar `lib/local-data.ts`:
  - [ ] Descomentar imports de Firebase
  - [ ] Reemplazar funciones con código Firebase comentado
  - [ ] Cambiar import de JSON por Firebase

- [ ] **5.2** Actualizar estructura de datos:
  - [ ] Cambiar `products.json` por `products-firebase.json`
  - [ ] Adaptar funciones para nueva estructura de objetos

### **Fase 6: Funciones de Admin (Opcional - 30+ minutos)**

- [ ] **6.1** Descomentar funciones en `firebase-admin.ts`
- [ ] **6.2** Crear rutas API para administración:

```typescript
// pages/api/admin/products.ts
// pages/api/admin/collections.ts
// pages/api/admin/settings.ts
```

- [ ] **6.3** Crear componentes de administración:

```typescript
// components/admin/ProductForm.tsx
// components/admin/ProductList.tsx
// components/admin/Dashboard.tsx
```

- [ ] **6.4** Implementar autenticación para admin

### **Fase 7: Testing (10 minutos)**

- [ ] **7.1** Probar carga de productos
- [ ] **7.2** Probar búsqueda y filtros
- [ ] **7.3** Probar funciones de admin (si implementadas)
- [ ] **7.4** Verificar performance

## 🔧 Archivos que Necesitas Modificar

### **Archivos Principales**
1. **`lib/firebase.ts`** - Descomentar configuración
2. **`lib/local-data.ts`** - Reemplazar funciones
3. **`.env.local`** - Agregar variables Firebase

### **Archivos Opcionales (Admin)**
4. **`lib/firebase-admin.ts`** - Funciones CRUD
5. **`pages/api/admin/`** - Rutas API admin
6. **`components/admin/`** - Componentes admin

## 📊 Reglas de Seguridad Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Productos: lectura pública, escritura solo admin
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
    }
    
    // Colecciones: lectura pública, escritura solo admin  
    match /collections/{collectionId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
    }
    
    // Configuración: solo admin
    match /settings/{settingId} {
      allow read, write: if request.auth != null && 
                            request.auth.token.admin == true;
    }
    
    // Órdenes: solo el usuario propietario
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
                            request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🎯 Beneficios Post-Migración

### **Inmediatos**
- ✅ Datos en tiempo real
- ✅ Escalabilidad automática
- ✅ Backup automático
- ✅ Consultas eficientes

### **Funcionalidades Futuras**
- ✅ Panel de administración
- ✅ Gestión de inventario en tiempo real
- ✅ Sistema de órdenes
- ✅ Analytics avanzados
- ✅ Notificaciones push
- ✅ Sincronización multi-dispositivo

## 🚨 Consideraciones Importantes

### **Performance**
- Firebase tiene límites de lectura/escritura
- Implementar cache local para mejor UX
- Usar paginación para listas grandes

### **Costos**
- Firebase es gratis hasta cierto límite
- Monitorear uso en Firebase Console
- Optimizar consultas para reducir lecturas

### **Backup**
- Configurar exportaciones automáticas
- Mantener copia local de datos críticos

## 📞 Soporte

Si necesitas ayuda durante la migración:

1. **Documentación oficial**: [Firebase Docs](https://firebase.google.com/docs)
2. **Ejemplos de código**: Todos están comentados en los archivos
3. **Testing**: Usar Firebase Emulator para desarrollo local

---

¡Tu migración a Firebase será súper smooth! 🔥
