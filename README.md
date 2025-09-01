# JSON Converter

Una herramienta web moderna y elegante para convertir listas de diccionarios de Python a formato JSON válido, con soporte para múltiples arrays y procesamiento inteligente.

## Características Principales

- **Conversión inteligente**: Transforma automáticamente comillas simples, `None`, `True`, `False` de Python a formato JSON válido
- **Manejo de múltiples arrays**: Detecta y procesa varios arrays en una sola entrada
- **Vista previa en tiempo real**: Observa cómo se procesan tus datos mientras escribes
- **Syntax highlighting**: JSON coloreado y más legible en el resultado
- **Interfaz moderna**: Diseño glassmorphism con gradientes y animaciones suaves
- **Totalmente responsive**: Funciona perfecto en desktop, tablet y móvil
- **Sin servidor requerido**: Funciona completamente en el navegador

## Demo en Vivo

**Probar ahora:** https://ospinajohn.github.io/json-converter/

## Capturas de Pantalla

### Interfaz Principal
Una interfaz limpia y moderna con paneles separados para entrada y salida de datos.

### Características Visuales
- Fondos con gradientes elegantes
- Efectos glassmorphism en las tarjetas
- Animaciones suaves y transiciones
- Notificaciones toast informativas

## Casos de Uso

### Desarrolladores Python
- Convertir salidas de APIs o bases de datos
- Procesar logs de aplicaciones
- Transformar configuraciones de Python a JSON

### Analistas de Datos
- Limpiar y formatear datasets
- Preparar datos para visualizaciones web
- Convertir estructuras de pandas a JSON

### Integración de Sistemas
- Migrar configuraciones entre sistemas
- Adaptar formatos de datos legacy
- Preparar payloads para APIs REST

## Como Usar

### Entrada Básica
```python
[{'name': 'Juan', 'age': 25, 'active': True}]
```

### Entrada con Múltiples Arrays
```python
[{'pedido': 'PV-001', 'cliente': 'Empresa A'}]
Data: [{'producto': 'Laptop', 'cantidad': 2}]
```

### Salida JSON
```json
[
  {
    "pedido": "PV-001",
    "cliente": "Empresa A"
  },
  {
    "producto": "Laptop", 
    "cantidad": 2
  }
]
```

## Opciones Disponibles

- **Formato Legible**: Aplica indentación y saltos de línea para mejor lectura
- **Combinar Arrays**: Une múltiples arrays en una sola estructura
- **Vista Previa**: Muestra el procesamiento en tiempo real
- **Copiar con un Click**: Copia el resultado al portapapeles instantáneamente

## Arquitectura del Proyecto

```
json-converter/
├── index.html          # Estructura HTML principal
├── src/
│   ├── css/
│   │   └── styles.css  # Estilos y tema visual
│   └── js/
│       └── main.js     # Lógica de conversión y UI
└── README.md          # Documentación
```

## Tecnologias Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Gradientes, glassmorphism, animaciones
- **JavaScript ES6+**: Procesamiento de datos y manipulación del DOM
- **Tailwind CSS**: Framework de utilidades CSS
- **Font Awesome**: Iconografía vectorial
- **Google Fonts**: Tipografía Inter

## Instalacion Local

```bash
# Clonar el repositorio
git clone https://github.com/ospinajohn/json-converter.git

# Navegar al directorio
cd json-converter

# Abrir en navegador
open index.html

# O usar servidor local
python -m http.server 8000
# Luego ir a http://localhost:8000
```

## Despliegue

Este proyecto está configurado para GitHub Pages. Cualquier push a la rama `main` actualiza automáticamente el sitio en vivo.

## Resolución de Problemas

### El CSS/JS no carga
- Verifica que las rutas sean `./src/css/styles.css` y `./src/js/main.js`
- Asegúrate de mantener la estructura de carpetas

### Error de sintaxis JSON
- Revisa que los datos de entrada sean válidos
- Utiliza la vista previa para detectar problemas
- Asegúrate de cerrar correctamente corchetes y llaves

### Problemas de renderizado
- Limpia la caché del navegador
- Verifica que JavaScript esté habilitado
- Prueba en modo incógnito

## Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Ideas para Contribuir
- Soporte para más formatos de entrada
- Exportación a diferentes formatos
- Modo oscuro/claro
- Historial de conversiones
- Validación avanzada de JSON

## Roadmap

- **v1.1**: Modo oscuro automático
- **v1.2**: Soporte para XML y YAML
- **v1.3**: Historial de conversiones
- **v2.0**: Editor de JSON integrado
- **v2.1**: Validación de esquemas JSON

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**John James Ospina**
- Desarrollador de Software en Cali, Colombia
- Especializado en desarrollo web y tecnologías modernas
- GitHub: @ospinajohn
- LinkedIn: Perfil Profesional

## Agradecimientos

- Inspirado en la necesidad de convertir datos entre Python y aplicaciones web
- Diseño influenciado por las mejores prácticas de UX/UI modernas
- Construido con amor desde Cali, Valle del Cauca, Colombia 🇨🇴

---

**Te ha sido útil esta herramienta?** Dale una estrella al repositorio y compártela con otros desarrolladores.

*Última actualización: Septiembre 2025*
