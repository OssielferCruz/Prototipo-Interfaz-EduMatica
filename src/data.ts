import type { Subject, Achievement, Game, User } from './types';

export const SUBJECTS: Subject[] = [
  {
    id: 'matematica',
    name: 'Matemática',
    color: '#FE6D73',
    bgColor: '#fff0f0',
    textLight: '#fff',
    emoji: '🔢',
    tagline: '¡Los números son divertidos!',
    grades: {
      1: [
        { id: 'mat-1-1', title: 'Los Conjuntos', description: 'Agrupamos objetos y aprendemos a contar', duration: 15, icon: '🔵' },
        { id: 'mat-1-2', title: 'Números del 0 al 20', description: 'Conocemos y escribimos los primeros números', duration: 20, icon: '1️⃣' },
        { id: 'mat-1-3', title: 'Números del 21 al 100', description: 'Contamos hasta cien', duration: 20, icon: '💯' },
        { id: 'mat-1-4', title: 'La Adición', description: 'Sumamos números pequeños con objetos', duration: 25, icon: '➕' },
        { id: 'mat-1-5', title: 'La Sustracción', description: 'Restamos de forma divertida', duration: 25, icon: '➖' },
        { id: 'mat-1-6', title: 'Figuras Geométricas', description: 'Círculos, cuadrados y triángulos', duration: 20, icon: '🔺' },
        { id: 'mat-1-7', title: 'Medidas de Longitud', description: 'Largo, corto, alto y bajo', duration: 15, icon: '📏' },
      ],
      2: [
        { id: 'mat-2-1', title: 'Números hasta 1,000', description: 'Aprendemos a contar hasta mil', duration: 20, icon: '🔢' },
        { id: 'mat-2-2', title: 'Suma con Llevada', description: 'Sumas de dos cifras con llevada', duration: 25, icon: '➕' },
        { id: 'mat-2-3', title: 'Resta con Prestada', description: 'Restas con préstamo paso a paso', duration: 25, icon: '➖' },
        { id: 'mat-2-4', title: 'Tablas del 2 y del 3', description: 'Nuestras primeras multiplicaciones', duration: 30, icon: '✖️' },
        { id: 'mat-2-5', title: 'Tablas del 4 y del 5', description: 'Más tablas de multiplicar', duration: 30, icon: '✖️' },
        { id: 'mat-2-6', title: 'Sistema Monetario', description: 'Los córdobas y los centavos', duration: 20, icon: '💰' },
        { id: 'mat-2-7', title: 'Medidas de Peso', description: 'Gramos y kilogramos', duration: 20, icon: '⚖️' },
      ],
      3: [
        { id: 'mat-3-1', title: 'Números hasta 10,000', description: 'Números de cuatro cifras', duration: 20, icon: '🔢' },
        { id: 'mat-3-2', title: 'Tablas del 6 al 10', description: 'Completamos las tablas de multiplicar', duration: 30, icon: '✖️' },
        { id: 'mat-3-3', title: 'División Básica', description: 'Repartir en partes iguales', duration: 30, icon: '➗' },
        { id: 'mat-3-4', title: 'Fracciones Simples', description: 'Mitad, tercio y cuarto', duration: 25, icon: '🍕' },
        { id: 'mat-3-5', title: 'El Perímetro', description: 'Medimos el borde de las figuras', duration: 20, icon: '📐' },
        { id: 'mat-3-6', title: 'El Tiempo', description: 'Horas, días, semanas y meses', duration: 20, icon: '⏰' },
      ],
      4: [
        { id: 'mat-4-1', title: 'Números Decimales', description: 'Décimas y centésimas', duration: 25, icon: '🔢' },
        { id: 'mat-4-2', title: 'Fracciones Equivalentes', description: 'Diferentes fracciones, igual valor', duration: 30, icon: '⅔' },
        { id: 'mat-4-3', title: 'Multiplicación de 2 Cifras', description: 'Multiplicación avanzada', duration: 30, icon: '✖️' },
        { id: 'mat-4-4', title: 'División con Residuo', description: 'Cuando no es exacta', duration: 30, icon: '➗' },
        { id: 'mat-4-5', title: 'Ángulos', description: 'Rectos, agudos y obtusos', duration: 25, icon: '📐' },
        { id: 'mat-4-6', title: 'Área de Figuras', description: 'Calculamos el área de rectángulos', duration: 25, icon: '🔲' },
      ],
      5: [
        { id: 'mat-5-1', title: 'Números Enteros', description: 'Positivos y negativos', duration: 25, icon: '🔢' },
        { id: 'mat-5-2', title: 'Proporcionalidad', description: 'Razones y proporciones', duration: 30, icon: '⚖️' },
        { id: 'mat-5-3', title: 'Porcentajes', description: 'El tanto por ciento en la vida', duration: 30, icon: '💯' },
        { id: 'mat-5-4', title: 'Estadística Básica', description: 'Gráficas de barras y circulares', duration: 25, icon: '📊' },
        { id: 'mat-5-5', title: 'Área y Perímetro Avanzado', description: 'Figuras complejas', duration: 25, icon: '📐' },
      ],
      6: [
        { id: 'mat-6-1', title: 'Álgebra Básica', description: 'Expresiones y variables', duration: 30, icon: '🔣' },
        { id: 'mat-6-2', title: 'Ecuaciones Simples', description: 'Encontrar el valor desconocido', duration: 30, icon: '🔣' },
        { id: 'mat-6-3', title: 'Funciones', description: 'Relaciones entre variables', duration: 30, icon: '📈' },
        { id: 'mat-6-4', title: 'Geometría Espacial', description: 'Cubos, esferas y pirámides', duration: 25, icon: '🧊' },
        { id: 'mat-6-5', title: 'Probabilidad', description: 'La probabilidad de los eventos', duration: 25, icon: '🎲' },
      ],
    },
  },
  {
    id: 'lengua',
    name: 'Lengua y Literatura',
    color: '#2584A7',
    bgColor: '#e8f4f8',
    textLight: '#fff',
    emoji: '📚',
    tagline: '¡Las palabras son magia!',
    grades: {
      1: [
        { id: 'len-1-1', title: 'Las Vocales', description: 'A, E, I, O, U — nuestras primeras letras', duration: 15, icon: '🔤' },
        { id: 'len-1-2', title: 'Las Consonantes', description: 'Las letras del alfabeto español', duration: 20, icon: '🔤' },
        { id: 'len-1-3', title: 'Las Sílabas', description: 'Dividir palabras en sílabas', duration: 20, icon: '🗣️' },
        { id: 'len-1-4', title: 'Lectura Inicial', description: 'Leer nuestras primeras palabras', duration: 25, icon: '📖' },
        { id: 'len-1-5', title: 'Escritura de Palabras', description: 'Escribir palabras simples', duration: 25, icon: '✏️' },
        { id: 'len-1-6', title: 'Cuentos Cortos', description: 'Escuchar y contar cuentos sencillos', duration: 20, icon: '🐰' },
      ],
      2: [
        { id: 'len-2-1', title: 'Lectura de Oraciones', description: 'Leemos oraciones completas', duration: 20, icon: '📖' },
        { id: 'len-2-2', title: 'Signos de Puntuación', description: 'El punto, la coma y los signos', duration: 20, icon: '❗' },
        { id: 'len-2-3', title: 'El Sustantivo', description: 'Nombres de personas, lugares y cosas', duration: 20, icon: '🏠' },
        { id: 'len-2-4', title: 'El Adjetivo', description: 'Palabras que describen', duration: 20, icon: '🌈' },
        { id: 'len-2-5', title: 'Textos Descriptivos', description: 'Describir objetos y personas', duration: 25, icon: '✍️' },
        { id: 'len-2-6', title: 'Cuentos Populares', description: 'Leyendas y cuentos de Nicaragua', duration: 20, icon: '🎭' },
      ],
      3: [
        { id: 'len-3-1', title: 'El Verbo', description: 'Palabras que expresan acción', duration: 20, icon: '🏃' },
        { id: 'len-3-2', title: 'La Oración', description: 'Sujeto y predicado', duration: 25, icon: '📝' },
        { id: 'len-3-3', title: 'El Párrafo', description: 'Escribir párrafos completos', duration: 25, icon: '📄' },
        { id: 'len-3-4', title: 'Textos Narrativos', description: 'Contar historias ordenadas', duration: 25, icon: '📚' },
        { id: 'len-3-5', title: 'La Poesía', description: 'Rimas y poemas sencillos', duration: 20, icon: '🎵' },
        { id: 'len-3-6', title: 'Ortografía Básica', description: 'Reglas de escritura correcta', duration: 20, icon: '✏️' },
      ],
      4: [
        { id: 'len-4-1', title: 'Ortografía: B y V', description: 'Cuándo usar B o V', duration: 25, icon: '✏️' },
        { id: 'len-4-2', title: 'Sinónimos y Antónimos', description: 'Palabras similares y opuestas', duration: 20, icon: '🔄' },
        { id: 'len-4-3', title: 'Texto Instructivo', description: 'Recetas e instrucciones paso a paso', duration: 20, icon: '📋' },
        { id: 'len-4-4', title: 'Fábulas y Moralejas', description: 'Las fábulas de Esopo y más', duration: 25, icon: '🦊' },
        { id: 'len-4-5', title: 'Comprensión Lectora', description: 'Entender lo que leemos', duration: 30, icon: '🔍' },
      ],
      5: [
        { id: 'len-5-1', title: 'Rubén Darío', description: 'El Príncipe de las Letras Castellanas', duration: 30, icon: '🌟' },
        { id: 'len-5-2', title: 'Literatura Nicaragüense', description: 'Autores y obras de Nicaragua', duration: 30, icon: '🇳🇮' },
        { id: 'len-5-3', title: 'La Carta Formal', description: 'Escribir cartas formales', duration: 25, icon: '✉️' },
        { id: 'len-5-4', title: 'El Periódico', description: 'Noticias, reportajes y columnas', duration: 25, icon: '📰' },
        { id: 'len-5-5', title: 'Análisis de Textos', description: 'Comprender y analizar lecturas', duration: 30, icon: '📖' },
      ],
      6: [
        { id: 'len-6-1', title: 'Análisis Literario', description: 'Tema, argumento y personajes', duration: 30, icon: '📖' },
        { id: 'len-6-2', title: 'El Ensayo', description: 'Escribir un ensayo básico', duration: 35, icon: '✍️' },
        { id: 'len-6-3', title: 'Gramática Avanzada', description: 'Pronombres y preposiciones', duration: 30, icon: '📝' },
        { id: 'len-6-4', title: 'La Oratoria', description: 'Hablar en público con seguridad', duration: 25, icon: '🎤' },
        { id: 'len-6-5', title: 'Literatura Hispanoamericana', description: 'Grandes autores de América Latina', duration: 30, icon: '🌎' },
      ],
    },
  },
  {
    id: 'valores',
    name: 'Creciendo en Valores',
    color: '#24E5D2',
    bgColor: '#e6fdfb',
    textLight: '#1a4a44',
    emoji: '💚',
    tagline: '¡Ser bueno es genial!',
    grades: {
      1: [
        { id: 'val-1-1', title: 'Me Quiero a Mí Mismo', description: 'La autoestima y el amor propio', duration: 15, icon: '💖' },
        { id: 'val-1-2', title: 'Mi Familia', description: 'El amor y respeto en familia', duration: 15, icon: '👨‍👩‍👧' },
        { id: 'val-1-3', title: 'El Respeto', description: 'Respetar a los demás y a nosotros mismos', duration: 20, icon: '🤝' },
        { id: 'val-1-4', title: 'La Honestidad', description: 'Decir siempre la verdad', duration: 20, icon: '✨' },
        { id: 'val-1-5', title: 'La Amistad', description: 'Cómo ser un buen amigo', duration: 15, icon: '👫' },
      ],
      2: [
        { id: 'val-2-1', title: 'La Responsabilidad', description: 'Cumplir con nuestros deberes', duration: 20, icon: '📚' },
        { id: 'val-2-2', title: 'La Solidaridad', description: 'Ayudar a quienes lo necesitan', duration: 20, icon: '🤲' },
        { id: 'val-2-3', title: 'Trabajo en Equipo', description: 'Juntos somos más fuertes', duration: 20, icon: '🏆' },
        { id: 'val-2-4', title: 'Cuidado del Ambiente', description: 'Proteger la naturaleza de Nicaragua', duration: 20, icon: '🌳' },
        { id: 'val-2-5', title: 'La Generosidad', description: 'Compartir con amor y alegría', duration: 15, icon: '🎁' },
      ],
      3: [
        { id: 'val-3-1', title: 'La Tolerancia', description: 'Aceptar y respetar las diferencias', duration: 20, icon: '🌈' },
        { id: 'val-3-2', title: 'La Justicia', description: 'Actuar con equidad y justicia', duration: 20, icon: '⚖️' },
        { id: 'val-3-3', title: 'La Paz', description: 'Vivir en armonía con los demás', duration: 20, icon: '🕊️' },
        { id: 'val-3-4', title: 'La Empatía', description: 'Ponerse en el lugar del otro', duration: 20, icon: '❤️' },
      ],
      4: [
        { id: 'val-4-1', title: 'Los Derechos del Niño', description: 'Mis derechos y los de los demás', duration: 25, icon: '📜' },
        { id: 'val-4-2', title: 'La Ciudadanía', description: 'Ser un buen ciudadano nicaragüense', duration: 25, icon: '🏛️' },
        { id: 'val-4-3', title: 'Medio Ambiente', description: 'Cuidar nuestro planeta', duration: 20, icon: '🌍' },
        { id: 'val-4-4', title: 'La Igualdad', description: 'Todos los seres humanos somos iguales', duration: 20, icon: '🤝' },
      ],
      5: [
        { id: 'val-5-1', title: 'El Liderazgo', description: 'Cualidades de un buen líder', duration: 25, icon: '⭐' },
        { id: 'val-5-2', title: 'El Emprendimiento', description: 'Crear e innovar con creatividad', duration: 25, icon: '💡' },
        { id: 'val-5-3', title: 'Valores Democráticos', description: 'La democracia y la participación ciudadana', duration: 25, icon: '🗳️' },
        { id: 'val-5-4', title: 'La Integridad', description: 'Actuar con rectitud en todo momento', duration: 20, icon: '💫' },
      ],
      6: [
        { id: 'val-6-1', title: 'La Ética', description: 'Principios y valores morales', duration: 30, icon: '💫' },
        { id: 'val-6-2', title: 'La Convivencia Social', description: 'Vivir juntos en armonía', duration: 25, icon: '🌐' },
        { id: 'val-6-3', title: 'Servicio Comunitario', description: 'Ayudar a nuestra comunidad', duration: 25, icon: '🤲' },
        { id: 'val-6-4', title: 'Mi Proyecto de Vida', description: 'Planificar mi futuro con valores', duration: 30, icon: '🚀' },
      ],
    },
  },
  {
    id: 'identidad',
    name: 'Identidad Nacional y Orgullo Patrio',
    color: '#FFCB77',
    bgColor: '#fffbf0',
    textLight: '#5c3c00',
    emoji: '🇳🇮',
    tagline: '¡Orgullosos de ser nicas!',
    grades: {
      1: [
        { id: 'id-1-1', title: 'Mi Nombre y Mi Familia', description: 'Quiénes somos y de dónde venimos', duration: 15, icon: '👤' },
        { id: 'id-1-2', title: 'Mi Escuela', description: 'La escuela, mi segundo hogar', duration: 15, icon: '🏫' },
        { id: 'id-1-3', title: 'Mi Comunidad', description: 'Las personas de mi barrio', duration: 20, icon: '🏘️' },
        { id: 'id-1-4', title: 'La Bandera de Nicaragua', description: 'Los colores azul y blanco de nuestra bandera', duration: 15, icon: '🚩' },
        { id: 'id-1-5', title: 'El Himno Nacional', description: 'La canción que nos une como nicaragüenses', duration: 15, icon: '🎵' },
        { id: 'id-1-6', title: 'El Escudo Nacional', description: 'El triángulo, el volcán y el arco iris de Nicaragua', duration: 15, icon: '🛡️' },
        { id: 'id-1-7', title: 'El Guardabarranco', description: 'El ave nacional: símbolo de belleza y libertad', duration: 15, icon: '🐦' },
      ],
      2: [
        { id: 'id-2-1', title: 'Los Símbolos Patrios', description: 'Bandera, escudo e himno de Nicaragua', duration: 20, icon: '🛡️' },
        { id: 'id-2-2', title: 'Augusto C. Sandino', description: 'El General de Hombres Libres, héroe nacional', duration: 25, icon: '⭐' },
        { id: 'id-2-3', title: 'Rubén Darío', description: 'El Príncipe de las Letras Castellanas nació en Nicaragua', duration: 20, icon: '✒️' },
        { id: 'id-2-4', title: 'Fiestas Patrias', description: 'Septiembre, mes de la Patria nicaragüense', duration: 20, icon: '🎉' },
        { id: 'id-2-5', title: 'Comidas Típicas', description: 'Gallo pinto, nacatamal y la deliciosa cocina nica', duration: 15, icon: '🍽️' },
        { id: 'id-2-6', title: 'El Güegüense', description: 'La obra teatral más antigua del teatro latinoamericano', duration: 20, icon: '🎭' },
        { id: 'id-2-7', title: 'Danzas Folclóricas', description: 'Danzas tradicionales y el traje típico nicaragüense', duration: 20, icon: '💃' },
      ],
      3: [
        { id: 'id-3-1', title: 'Pueblos Indígenas', description: 'Chorotegas, Nicaraos y los primeros habitantes', duration: 25, icon: '🏺' },
        { id: 'id-3-2', title: 'La Colonización Española', description: 'La llegada de los españoles en el siglo XVI', duration: 25, icon: '⛵' },
        { id: 'id-3-3', title: 'Geografía de Nicaragua', description: 'Lagos, volcanes, costas Pacífico y Caribe', duration: 25, icon: '🗺️' },
        { id: 'id-3-4', title: 'El Lago Cocibolca', description: 'El mar dulce de América, el lago más grande de Centroamérica', duration: 20, icon: '🏞️' },
        { id: 'id-3-5', title: 'Departamentos y Regiones', description: 'Los 15 departamentos y 2 regiones autónomas', duration: 20, icon: '📍' },
        { id: 'id-3-6', title: 'La Batalla de San Jacinto', description: '14 de septiembre de 1856, victoria ante los filibusteros', duration: 25, icon: '⚔️' },
        { id: 'id-3-7', title: 'Andrés Castro', description: 'El héroe que defendió a Nicaragua en San Jacinto', duration: 20, icon: '🦸' },
        { id: 'id-3-8', title: 'Símbolos Naturales', description: 'El sacuanjoche, el madroño y el guardabarranco', duration: 20, icon: '🌸' },
      ],
      4: [
        { id: 'id-4-1', title: 'La Independencia de Nicaragua', description: 'Nicaragua libre el 15 de septiembre de 1821', duration: 25, icon: '🇳🇮' },
        { id: 'id-4-2', title: 'La Revolución Popular Sandinista', description: 'El triunfo del 19 de julio de 1979', duration: 25, icon: '⭐' },
        { id: 'id-4-3', title: 'Carlos Fonseca Amador', description: 'Fundador del Frente Sandinista de Liberación Nacional', duration: 25, icon: '📖' },
        { id: 'id-4-4', title: 'Héroes y Mártires', description: 'Personajes que dieron su vida por la libertad de Nicaragua', duration: 25, icon: '🌹' },
        { id: 'id-4-5', title: 'Regiones de Nicaragua', description: 'Región del Pacífico, Central y Costa Caribe', duration: 20, icon: '🗺️' },
        { id: 'id-4-6', title: 'Biodiversidad de Nicaragua', description: 'Reservas naturales y nuestra rica flora y fauna', duration: 25, icon: '🦜' },
      ],
      5: [
        { id: 'id-5-1', title: 'Economía Nicaragüense', description: 'Agricultura, ganadería, industria y comercio', duration: 30, icon: '🌽' },
        { id: 'id-5-2', title: 'Recursos Naturales', description: 'Las riquezas naturales de nuestra tierra', duration: 25, icon: '🌊' },
        { id: 'id-5-3', title: 'Instituciones del Estado', description: 'Los poderes ejecutivo, legislativo y judicial', duration: 25, icon: '⚖️' },
        { id: 'id-5-4', title: 'Cultura e Identidad Nacional', description: 'Lo que nos une y nos hace orgullosamente nicaragüenses', duration: 30, icon: '🎭' },
        { id: 'id-5-5', title: 'La Costa Caribe', description: 'Diversidad étnica: miskitos, garífunas y afrodescendientes', duration: 30, icon: '🌴' },
        { id: 'id-5-6', title: 'Personajes Históricos', description: 'Grandes figuras que forjaron la historia de Nicaragua', duration: 30, icon: '🌟' },
      ],
      6: [
        { id: 'id-6-1', title: 'Nicaragua en Centroamérica', description: 'Nuestra posición geopolítica e importancia regional', duration: 30, icon: '🌎' },
        { id: 'id-6-2', title: 'Relaciones Internacionales', description: 'Nicaragua y su rol en la comunidad mundial', duration: 25, icon: '🌐' },
        { id: 'id-6-3', title: 'Protección del Ambiente', description: 'El compromiso de Nicaragua con el medio ambiente', duration: 25, icon: '🌿' },
        { id: 'id-6-4', title: 'Patrimonio Cultural', description: 'El Güegüense y el patrimonio de Nicaragua ante la UNESCO', duration: 30, icon: '🏛️' },
        { id: 'id-6-5', title: 'Integración Centroamericana', description: 'Nicaragua en el SICA y los acuerdos regionales', duration: 25, icon: '🤝' },
        { id: 'id-6-6', title: 'Retos del Futuro', description: 'Nicaragua: soberanía, desarrollo y dignidad nacional', duration: 30, icon: '🚀' },
      ],
    },
  },
  {
    id: 'ciencias',
    name: 'Ciencias Naturales',
    color: '#6ECB7A',
    bgColor: '#f0faf2',
    textLight: '#fff',
    emoji: '🔬',
    tagline: '¡Explora el mundo natural!',
    grades: {
      1: [
        { id: 'cie-1-1', title: 'Seres Vivos y No Vivos', description: 'Diferencias entre lo vivo y lo inerte', duration: 20, icon: '🌱' },
        { id: 'cie-1-2', title: 'Las Plantas', description: 'Raíz, tallo, hojas y flores', duration: 20, icon: '🌸' },
        { id: 'cie-1-3', title: 'Los Animales', description: 'Mamíferos, aves, reptiles y más', duration: 20, icon: '🐾' },
        { id: 'cie-1-4', title: 'Mi Cuerpo', description: 'Las partes del cuerpo humano', duration: 20, icon: '🧍' },
        { id: 'cie-1-5', title: 'Los Cinco Sentidos', description: 'Ver, oír, oler, gustar y tocar', duration: 15, icon: '👀' },
      ],
      2: [
        { id: 'cie-2-1', title: 'El Suelo', description: 'Tipos de suelo y su importancia', duration: 20, icon: '🌍' },
        { id: 'cie-2-2', title: 'El Agua', description: 'El agua y sus estados', duration: 20, icon: '💧' },
        { id: 'cie-2-3', title: 'El Aire', description: 'El aire que respiramos cada día', duration: 20, icon: '💨' },
        { id: 'cie-2-4', title: 'Cuidado del Ambiente', description: 'Cómo proteger la naturaleza', duration: 20, icon: '♻️' },
        { id: 'cie-2-5', title: 'El Sol y la Luna', description: 'Nuestros vecinos del cielo', duration: 20, icon: '☀️' },
      ],
      3: [
        { id: 'cie-3-1', title: 'Los Ecosistemas', description: 'Bosques, ríos y mares de Nicaragua', duration: 25, icon: '🌲' },
        { id: 'cie-3-2', title: 'Cadenas Alimenticias', description: 'Quién come a quién en la naturaleza', duration: 25, icon: '🦁' },
        { id: 'cie-3-3', title: 'El Sistema Solar', description: 'Los planetas y el sol', duration: 25, icon: '🪐' },
        { id: 'cie-3-4', title: 'El Clima y las Nubes', description: 'Por qué llueve y hace sol', duration: 20, icon: '⛅' },
        { id: 'cie-3-5', title: 'Los Volcanes', description: 'Los volcanes de Nicaragua', duration: 25, icon: '🌋' },
      ],
      4: [
        { id: 'cie-4-1', title: 'La Materia', description: 'Sólido, líquido y gaseoso', duration: 25, icon: '⚗️' },
        { id: 'cie-4-2', title: 'La Energía', description: 'Tipos y fuentes de energía', duration: 25, icon: '⚡' },
        { id: 'cie-4-3', title: 'El Calor y la Luz', description: 'Propiedades del calor y la luz', duration: 25, icon: '🔥' },
        { id: 'cie-4-4', title: 'Sistemas del Cuerpo', description: 'Digestivo, respiratorio y más', duration: 30, icon: '🫀' },
        { id: 'cie-4-5', title: 'Nutrición y Salud', description: 'Alimentos saludables y la pirámide', duration: 20, icon: '🥗' },
      ],
      5: [
        { id: 'cie-5-1', title: 'La Célula', description: 'La unidad básica de la vida', duration: 30, icon: '🧬' },
        { id: 'cie-5-2', title: 'Química Básica', description: 'Átomos, moléculas y elementos', duration: 30, icon: '⚗️' },
        { id: 'cie-5-3', title: 'Astronomía', description: 'El universo, estrellas y galaxias', duration: 25, icon: '🌌' },
        { id: 'cie-5-4', title: 'Ecología', description: 'El equilibrio del ecosistema', duration: 25, icon: '🌿' },
        { id: 'cie-5-5', title: 'Salud y Prevención', description: 'Enfermedades y cómo prevenirlas', duration: 25, icon: '🏥' },
      ],
      6: [
        { id: 'cie-6-1', title: 'La Electricidad', description: 'Corriente, circuitos y conductores', duration: 30, icon: '⚡' },
        { id: 'cie-6-2', title: 'Física Básica', description: 'Movimiento, fuerzas y gravedad', duration: 30, icon: '🔭' },
        { id: 'cie-6-3', title: 'Biotecnología', description: 'Ciencia y tecnología en el futuro', duration: 30, icon: '🧪' },
        { id: 'cie-6-4', title: 'Cambio Climático', description: 'El calentamiento global y Nicaragua', duration: 25, icon: '🌡️' },
        { id: 'cie-6-5', title: 'La Genética', description: 'ADN, herencia y características', duration: 30, icon: '🧬' },
      ],
    },
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-lesson',
    title: '¡Primera Lección!',
    description: 'Completa tu primera lección',
    emoji: '🌟',
    xpReward: 50,
    rarity: 'common',
    check: (u) => u.completedLessons.length >= 1,
  },
  {
    id: 'five-lessons',
    title: 'Estudiante Activo',
    description: 'Completa 5 lecciones',
    emoji: '📚',
    xpReward: 100,
    rarity: 'common',
    check: (u) => u.completedLessons.length >= 5,
  },
  {
    id: 'ten-lessons',
    title: 'Súper Estudiante',
    description: 'Completa 10 lecciones',
    emoji: '🎓',
    xpReward: 200,
    rarity: 'rare',
    check: (u) => u.completedLessons.length >= 10,
  },
  {
    id: 'streak-3',
    title: 'Racha de 3 Días',
    description: 'Estudia 3 días seguidos',
    emoji: '🔥',
    xpReward: 75,
    rarity: 'common',
    check: (u) => u.streak >= 3,
  },
  {
    id: 'streak-7',
    title: '¡Una Semana Completa!',
    description: 'Estudia 7 días seguidos',
    emoji: '🔥',
    xpReward: 200,
    rarity: 'rare',
    check: (u) => u.streak >= 7,
  },
  {
    id: 'first-game',
    title: '¡Jugador Estrella!',
    description: 'Juega tu primer juego',
    emoji: '🎮',
    xpReward: 50,
    rarity: 'common',
    check: (u) => u.gamesPlayed >= 1,
  },
  {
    id: 'five-games',
    title: 'Pro Gamer',
    description: 'Juega 5 juegos educativos',
    emoji: '🕹️',
    xpReward: 150,
    rarity: 'rare',
    check: (u) => u.gamesPlayed >= 5,
  },
  {
    id: 'math-master',
    title: 'Mago de los Números',
    description: 'Completa 5 lecciones de Matemática',
    emoji: '🔢',
    xpReward: 250,
    rarity: 'epic',
    check: (u) => u.completedLessons.filter((l) => l.startsWith('mat-')).length >= 5,
  },
  {
    id: 'reader',
    title: 'Lector Voraz',
    description: 'Completa 5 lecciones de Lengua',
    emoji: '📖',
    xpReward: 250,
    rarity: 'epic',
    check: (u) => u.completedLessons.filter((l) => l.startsWith('len-')).length >= 5,
  },
  {
    id: 'scientist',
    title: 'Pequeño Científico',
    description: 'Completa 5 lecciones de Ciencias',
    emoji: '🔬',
    xpReward: 250,
    rarity: 'epic',
    check: (u) => u.completedLessons.filter((l) => l.startsWith('cie-')).length >= 5,
  },
  {
    id: 'patriot',
    title: 'Orgulloso Nica',
    description: 'Completa 5 lecciones de Identidad Nacional',
    emoji: '🇳🇮',
    xpReward: 250,
    rarity: 'epic',
    check: (u) => u.completedLessons.filter((l) => l.startsWith('id-')).length >= 5,
  },
  {
    id: 'champion',
    title: '¡Campeón del Saber!',
    description: 'Llega al nivel 10',
    emoji: '🏆',
    xpReward: 500,
    rarity: 'legendary',
    check: (u) => u.level >= 10,
  },
];

export const GAMES: Game[] = [
  {
    id: 'suma-rapida',
    title: 'Suma Rápida',
    description: 'Resuelve sumas lo más rápido que puedas',
    subjectId: 'matematica',
    emoji: '⚡',
    color: '#FE6D73',
    difficulty: 1,
    xpReward: 60,
    questions: [
      { question: '¿Cuánto es 7 + 5?', options: ['10', '12', '11', '13'], correctIndex: 1, emoji: '🍎' },
      { question: '¿Cuánto es 15 - 8?', options: ['6', '8', '7', '9'], correctIndex: 2, emoji: '🌟' },
      { question: '¿Cuánto es 4 × 6?', options: ['20', '22', '24', '26'], correctIndex: 2, emoji: '🎯' },
      { question: '¿Cuánto es 36 ÷ 4?', options: ['8', '9', '7', '10'], correctIndex: 1, emoji: '🏆' },
      { question: '¿Cuánto es 13 + 19?', options: ['30', '31', '32', '33'], correctIndex: 2, emoji: '🚀' },
    ],
  },
  {
    id: 'fracciones',
    title: 'El Mundo de las Fracciones',
    description: 'Aprende fracciones jugando',
    subjectId: 'matematica',
    emoji: '🍕',
    color: '#FE6D73',
    difficulty: 2,
    xpReward: 80,
    questions: [
      { question: '¿Qué fracción es la mitad?', options: ['1/4', '1/3', '1/2', '2/3'], correctIndex: 2, emoji: '🍕' },
      { question: 'Si una pizza tiene 8 pedazos y como 2, ¿qué fracción comí?', options: ['2/8', '1/4', 'Las dos respuestas son correctas', '1/8'], correctIndex: 2, emoji: '🍕' },
      { question: '¿Cuál fracción es mayor: 1/2 o 1/4?', options: ['1/4', '1/2', 'Son iguales', 'No se puede saber'], correctIndex: 1, emoji: '📊' },
      { question: '¿Cuántos cuartos forman un entero?', options: ['2', '3', '4', '5'], correctIndex: 2, emoji: '🔵' },
      { question: '3/6 simplificado es…', options: ['1/3', '1/2', '2/3', '1/4'], correctIndex: 1, emoji: '✂️' },
    ],
  },
  {
    id: 'silabas',
    title: '¡A Silabear!',
    description: 'Separa las palabras en sílabas',
    subjectId: 'lengua',
    emoji: '🗣️',
    color: '#2584A7',
    difficulty: 1,
    xpReward: 60,
    questions: [
      { question: '¿Cuántas sílabas tiene "mariposa"?', options: ['3', '4', '5', '2'], correctIndex: 1, emoji: '🦋' },
      { question: '¿Cómo se separa "pelota"?', options: ['pel-ota', 'pe-lo-ta', 'pelo-ta', 'p-e-l-o-t-a'], correctIndex: 1, emoji: '⚽' },
      { question: '¿Cuántas sílabas tiene "sol"?', options: ['2', '3', '1', '4'], correctIndex: 2, emoji: '☀️' },
      { question: '¿Cómo se separa "Nicaragua"?', options: ['Ni-ca-ra-gua', 'Nica-ragua', 'Ni-car-a-gua', 'Nicar-agua'], correctIndex: 0, emoji: '🇳🇮' },
      { question: '¿Cuántas sílabas tiene "computadora"?', options: ['4', '5', '6', '3'], correctIndex: 1, emoji: '💻' },
    ],
  },
  {
    id: 'ruben-dario',
    title: 'Quiz: Rubén Darío',
    description: '¿Qué sabes del Príncipe de las Letras?',
    subjectId: 'lengua',
    emoji: '✍️',
    color: '#2584A7',
    difficulty: 3,
    xpReward: 100,
    questions: [
      { question: '¿En qué país nació Rubén Darío?', options: ['Guatemala', 'México', 'Nicaragua', 'Costa Rica'], correctIndex: 2, emoji: '🇳🇮' },
      { question: '¿En qué ciudad nació Rubén Darío?', options: ['Managua', 'Granada', 'Metapa (Ciudad Darío)', 'León'], correctIndex: 2, emoji: '🏙️' },
      { question: '¿Cómo se llamaba el movimiento literario que lideró?', options: ['Realismo', 'Romanticismo', 'Modernismo', 'Surrealismo'], correctIndex: 2, emoji: '📚' },
      { question: '¿Cuál es uno de sus libros más famosos?', options: ['Cien años de soledad', 'Azul', 'Don Quijote', 'La Odisea'], correctIndex: 1, emoji: '📖' },
      { question: '¿Con qué apodo se le conoce a Rubén Darío?', options: ['El Rey de los Poetas', 'El Príncipe de las Letras Castellanas', 'El Grande de la Literatura', 'El Padre del Modernismo'], correctIndex: 1, emoji: '👑' },
    ],
  },
  {
    id: 'valores-quiz',
    title: '¿Qué Harías Tú?',
    description: 'Elige la respuesta correcta en cada situación',
    subjectId: 'valores',
    emoji: '🤔',
    color: '#24E5D2',
    difficulty: 1,
    xpReward: 60,
    questions: [
      { question: 'Tu amigo se cae y llora. ¿Qué haces?', options: ['Me río y sigo jugando', 'Lo ayudo a levantarse y lo consolo', 'Me voy a jugar con otros', 'No hago nada'], correctIndex: 1, emoji: '🤝' },
      { question: 'Encuentras una billetera con dinero. ¿Qué haces?', options: ['Me quedo con el dinero', 'La escondo', 'La entrego a un adulto o a la policía', 'La dejo en el suelo'], correctIndex: 2, emoji: '👜' },
      { question: 'Alguien de tu clase no tiene lápiz. ¿Qué haces?', options: ['No le presto', 'Me río de él', 'Le presto un lápiz', 'Le cobro para prestárselo'], correctIndex: 2, emoji: '✏️' },
      { question: 'Ves que alguien tira basura en el parque. ¿Qué haces?', options: ['Hago lo mismo', 'Le digo amablemente que recoja la basura', 'Ignoro la situación', 'Me voy del parque'], correctIndex: 1, emoji: '🌳' },
      { question: 'Tu maestra pregunta algo y no sabes la respuesta. ¿Qué haces?', options: ['Copio a tu compañero', 'Dices "no sé" con honestidad', 'Inventas una respuesta', 'No dices nada'], correctIndex: 1, emoji: '🏫' },
    ],
  },
  {
    id: 'simbolos-patrios',
    title: 'Símbolos de Nicaragua',
    description: 'Conoce los símbolos de tu país',
    subjectId: 'identidad',
    emoji: '🛡️',
    color: '#FFCB77',
    difficulty: 2,
    xpReward: 80,
    questions: [
      { question: '¿De qué colores es la bandera de Nicaragua?', options: ['Rojo, amarillo y verde', 'Azul, blanco y azul', 'Verde, blanco y rojo', 'Azul, rojo y blanco'], correctIndex: 1, emoji: '🚩' },
      { question: '¿Cuántas estrellas tiene el escudo de Nicaragua?', options: ['4', '5', '6', '7'], correctIndex: 1, emoji: '⭐' },
      { question: '¿Qué lago es llamado el "Mar Dulce"?', options: ['Lago Xolotlán', 'Lago Cocibolca', 'Lago de Apanás', 'Lago de Asososca'], correctIndex: 1, emoji: '🏞️' },
      { question: '¿En qué fecha es el Día de la Independencia de Nicaragua?', options: ['14 de septiembre', '15 de septiembre', '19 de julio', '1 de enero'], correctIndex: 1, emoji: '🇳🇮' },
      { question: '¿Quién es el héroe nacional más conocido de Nicaragua?', options: ['Rubén Darío', 'Augusto C. Sandino', 'José Martí', 'Simón Bolívar'], correctIndex: 1, emoji: '⭐' },
    ],
  },
  {
    id: 'seres-vivos',
    title: 'El Mundo Vivo',
    description: 'Clasifica y conoce los seres vivos',
    subjectId: 'ciencias',
    emoji: '🌿',
    color: '#6ECB7A',
    difficulty: 1,
    xpReward: 60,
    questions: [
      { question: '¿Cuál de estos es un ser vivo?', options: ['Una piedra', 'Una nube', 'Un árbol', 'El agua'], correctIndex: 2, emoji: '🌱' },
      { question: '¿Qué necesitan las plantas para vivir?', options: ['Solo agua', 'Sol, agua y tierra', 'Solamente sol', 'Aire y sol únicamente'], correctIndex: 1, emoji: '🌸' },
      { question: '¿Cómo se llama el proceso en que las plantas fabrican su alimento?', options: ['Respiración', 'Fotosíntesis', 'Digestión', 'Circulación'], correctIndex: 1, emoji: '☀️' },
      { question: '¿Qué es un mamífero?', options: ['Un animal que pone huevos', 'Un animal que vive en el agua', 'Un animal que da leche a sus crías', 'Un animal que vuela'], correctIndex: 2, emoji: '🐾' },
      { question: '¿Cuántos sentidos tiene el ser humano?', options: ['4', '5', '6', '3'], correctIndex: 1, emoji: '👁️' },
    ],
  },
  {
    id: 'sistema-solar',
    title: 'Viaje al Sistema Solar',
    description: 'Explora los planetas del universo',
    subjectId: 'ciencias',
    emoji: '🚀',
    color: '#6ECB7A',
    difficulty: 2,
    xpReward: 80,
    questions: [
      { question: '¿Cuántos planetas tiene el Sistema Solar?', options: ['7', '8', '9', '10'], correctIndex: 1, emoji: '🪐' },
      { question: '¿Cuál es el planeta más grande?', options: ['Saturno', 'Júpiter', 'Neptuno', 'Urano'], correctIndex: 1, emoji: '🔭' },
      { question: '¿Cuál es el planeta más cercano al Sol?', options: ['Venus', 'Tierra', 'Mercurio', 'Marte'], correctIndex: 2, emoji: '☀️' },
      { question: '¿Cuánto tarda la Tierra en dar una vuelta completa al Sol?', options: ['1 mes', '6 meses', '1 año', '2 años'], correctIndex: 2, emoji: '🌍' },
      { question: '¿Cómo se llama la galaxia donde vivimos?', options: ['Andrómeda', 'La Vía Láctea', 'El Gran Universo', 'El Cosmos'], correctIndex: 1, emoji: '🌌' },
    ],
  },
];

// ── Unsplash image shortcuts for game questions ──
const IMG = {
  sandinoEstatua:   '/images/revolucion/sandino_estatua.jpg',
  sandinoEjercito:  '/images/revolucion/sandino_ejercito.jpg',
  sandinoRetrato:   '/images/revolucion/sandino_retrato.jpg',
  somozaDictadura:  '/images/revolucion/somoza_dictadura.jpg',
  sandinoMonumento: '/images/revolucion/sandino_estatua.jpg',
  edificioBandera:  'https://images.unsplash.com/photo-1674844477048-9c1be509eeac?w=480&q=75',
  multitudBandera:  'https://images.unsplash.com/photo-1666714011290-97f641afd12b?w=480&q=75',
  catedralColonial: 'https://images.unsplash.com/photo-1710172908681-bd2e80d776c0?w=480&q=75',
  uniformeMilitar:  '/images/revolucion/sandino_retrato.jpg',
  paisajeNica:      'https://images.unsplash.com/photo-1775497403180-ad9cae0d514b?w=480&q=75',
  lagoNica:         'https://images.unsplash.com/photo-1665518807030-ff232df26016?w=480&q=75',
};

GAMES.push(
  {
    id: 'sandino-quiz',
    title: 'El General Sandino',
    description: 'Conoce al héroe nacional de Nicaragua',
    subjectId: 'identidad',
    emoji: '⭐',
    color: '#FFCB77',
    difficulty: 2,
    xpReward: 80,
    questions: [
      {
        question: '¿En qué municipio nació Augusto C. Sandino?',
        options: ['León', 'Managua', 'Niquinohomo', 'Matagalpa'],
        correctIndex: 2,
        emoji: '🏠',
        imageUrl: IMG.sandinoEstatua,
      },
      {
        question: '¿En qué año comenzó la lucha armada de Sandino contra los invasores?',
        options: ['1920', '1927', '1933', '1910'],
        correctIndex: 1,
        emoji: '⚔️',
        imageUrl: IMG.sandinoEjercito,
      },
      {
        question: '¿Cómo se le conoce a Sandino históricamente?',
        options: ['El Héroe Invencible', 'El General de Hombres Libres', 'El Padre de la Patria', 'El León del Caribe'],
        correctIndex: 1,
        emoji: '🎖️',
        imageUrl: IMG.sandinoRetrato,
      },
      {
        question: '¿Contra qué fuerza extranjera luchó Sandino en Nicaragua?',
        options: ['Soldados ingleses', 'Marines de Estados Unidos', 'Ejército español', 'Tropas hondureñas'],
        correctIndex: 1,
        emoji: '🇺🇸',
        imageUrl: IMG.sandinoEjercito,
      },
      {
        question: '¿En qué año fue asesinado Augusto C. Sandino?',
        options: ['1933', '1934', '1936', '1940'],
        correctIndex: 1,
        emoji: '🕊️',
        imageUrl: IMG.somozaDictadura,
      },
    ],
  },
  {
    id: 'batalla-san-jacinto',
    title: 'Batalla de San Jacinto',
    description: '14 de septiembre de 1856 — victoria nicaragüense',
    subjectId: 'identidad',
    emoji: '⚔️',
    color: '#FFCB77',
    difficulty: 2,
    xpReward: 80,
    questions: [
      {
        question: '¿En qué fecha se libró la Batalla de San Jacinto?',
        options: ['15 de septiembre de 1855', '14 de septiembre de 1856', '19 de julio de 1856', '1 de enero de 1857'],
        correctIndex: 1,
        emoji: '📅',
        imageUrl: IMG.multitudBandera,
      },
      {
        question: '¿Contra quiénes lucharon los nicaragüenses en San Jacinto?',
        options: ['El ejército español', 'Los filibusteros de William Walker', 'Las tropas inglesas', 'El ejército hondureño'],
        correctIndex: 1,
        emoji: '⚔️',
        imageUrl: IMG.uniformeMilitar,
      },
      {
        question: '¿Quién se hizo famoso por usar una piedra como arma en San Jacinto?',
        options: ['Augusto Sandino', 'Andrés Castro', 'José Dolores Estrada', 'Carlos Fonseca'],
        correctIndex: 1,
        emoji: '🪨',
        imageUrl: IMG.sandinoMonumento,
      },
      {
        question: '¿Por qué usó Andrés Castro una piedra en la batalla?',
        options: ['Era su arma favorita', 'Se le acabaron las balas', 'Su fusil estaba roto', 'Para hacer ruido'],
        correctIndex: 1,
        emoji: '🦸',
        imageUrl: IMG.paisajeNica,
      },
      {
        question: '¿Quién comandó las fuerzas nicaragüenses en la Batalla de San Jacinto?',
        options: ['Augusto Sandino', 'Andrés Castro', 'José Dolores Estrada', 'Rubén Darío'],
        correctIndex: 2,
        emoji: '🏅',
        imageUrl: IMG.catedralColonial,
      },
    ],
  },
  {
    id: 'proceres-independencia',
    title: '¡Viva la Independencia!',
    description: 'Los próceres que liberaron a Nicaragua',
    subjectId: 'identidad',
    emoji: '🇳🇮',
    color: '#FFCB77',
    difficulty: 2,
    xpReward: 80,
    questions: [
      {
        question: '¿En qué fecha Nicaragua declaró su independencia?',
        options: ['14 de septiembre de 1821', '15 de septiembre de 1821', '19 de julio de 1821', '1 de enero de 1822'],
        correctIndex: 1,
        emoji: '📜',
        imageUrl: IMG.multitudBandera,
      },
      {
        question: '¿De qué potencia se independizó Nicaragua en 1821?',
        options: ['Inglaterra', 'Francia', 'España', 'Portugal'],
        correctIndex: 2,
        emoji: '🏰',
        imageUrl: IMG.catedralColonial,
      },
      {
        question: '¿En qué ciudad se proclamó la independencia de Centroamérica en 1821?',
        options: ['Managua', 'Rivas', 'Granada', 'Guatemala'],
        correctIndex: 3,
        emoji: '🏙️',
        imageUrl: IMG.paisajeNica,
      },
      {
        question: '¿En qué año se disolvió la República Federal de Centroamérica y Nicaragua quedó como nación independiente?',
        options: ['1821', '1838', '1856', '1893'],
        correctIndex: 1,
        emoji: '📅',
        imageUrl: IMG.edificioBandera,
      },
      {
        question: '¿Cuántos países centroamericanos se independizaron juntos el 15 de septiembre de 1821?',
        options: ['3', '4', '5', '6'],
        correctIndex: 2,
        emoji: '🌎',
        imageUrl: IMG.multitudBandera,
      },
    ],
  },
  {
    id: 'revolucion-sandinista',
    title: 'La Revolución Sandinista',
    description: 'El triunfo del 19 de julio de 1979',
    subjectId: 'identidad',
    emoji: '🌟',
    color: '#FFCB77',
    difficulty: 3,
    xpReward: 100,
    questions: [
      {
        question: '¿En qué fecha triunfó la Revolución Popular Sandinista?',
        options: ['19 de julio de 1978', '19 de julio de 1979', '19 de julio de 1980', '14 de septiembre de 1979'],
        correctIndex: 1,
        emoji: '🎉',
        imageUrl: IMG.sandinoEstatua,
      },
      {
        question: '¿Quién fundó el Frente Sandinista de Liberación Nacional (FSLN)?',
        options: ['Augusto Sandino', 'Carlos Fonseca Amador', 'Daniel Ortega', 'Tomás Borge'],
        correctIndex: 1,
        emoji: '📖',
        imageUrl: IMG.sandinoRetrato,
      },
      {
        question: '¿En qué año fue fundado el FSLN?',
        options: ['1955', '1961', '1965', '1970'],
        correctIndex: 1,
        emoji: '🗓️',
        imageUrl: IMG.sandinoEjercito,
      },
      {
        question: '¿Qué dictador fue derrocado por la Revolución Sandinista en 1979?',
        options: ['Anastasio Somoza Debayle', 'Luis Somoza García', 'Anastasio Somoza García', 'William Walker'],
        correctIndex: 0,
        emoji: '🏛️',
        imageUrl: IMG.somozaDictadura,
      },
      {
        question: '¿Cómo se conoce a Carlos Fonseca Amador en la historia de Nicaragua?',
        options: ['El Héroe de San Jacinto', 'El Fundador', 'El Hombre Libre', 'El Príncipe'],
        correctIndex: 1,
        emoji: '🌹',
        imageUrl: IMG.sandinoRetrato,
      },
    ],
  },
  {
    id: 'martires-nicaragua',
    title: 'Héroes y Mártires',
    description: 'Quienes dieron su vida por la libertad de Nicaragua',
    subjectId: 'identidad',
    emoji: '🌹',
    color: '#FFCB77',
    difficulty: 2,
    xpReward: 80,
    questions: [
      {
        question: '¿Qué significa ser un "mártir"?',
        options: ['Un general victorioso', 'Alguien que muere por sus creencias o su pueblo', 'Un presidente famoso', 'Un poeta nacional'],
        correctIndex: 1,
        emoji: '🕊️',
        imageUrl: IMG.paisajeNica,
      },
      {
        question: '¿En qué año murió Carlos Fonseca Amador en combate?',
        options: ['1972', '1974', '1976', '1979'],
        correctIndex: 2,
        emoji: '📅',
        imageUrl: IMG.uniformeMilitar,
      },
      {
        question: '¿Con qué flor se asocia la memoria de los mártires de Nicaragua?',
        options: ['La palma real', 'La rosa roja', 'El sacuanjoche', 'La orquídea'],
        correctIndex: 1,
        emoji: '🌹',
        imageUrl: IMG.sandinoMonumento,
      },
      {
        question: '¿El movimiento de Sandino inspiró el nombre de qué organización política nicaragüense?',
        options: ['El Partido Liberal', 'El Partido Conservador', 'El FSLN (Frente Sandinista)', 'La Cruz Roja'],
        correctIndex: 2,
        emoji: '⭐',
        imageUrl: IMG.edificioBandera,
      },
      {
        question: '¿Qué monumento famoso de Sandino está ubicado en el cerro Tiscapa en Managua?',
        options: ['Una estatua de bronce', 'Una silueta de metal a contraluz', 'Un mural gigante', 'Una pirámide'],
        correctIndex: 1,
        emoji: '🗿',
        imageUrl: IMG.sandinoMonumento,
      },
    ],
  }
);

/* ═══════════════════════════════════════════════════════
   INTERACTIVE GAMES
═══════════════════════════════════════════════════════ */

import type { InteractiveGame, MaterialItem } from './types';

export const INTERACTIVE_GAMES: InteractiveGame[] = [
  {
    id: 'fraction-pizza',
    title: 'Pastel de Fracciones',
    description: 'Colorea las partes correctas del pastel',
    subjectId: 'matematica',
    emoji: '🍕',
    color: '#FE6D73',
    difficulty: 2,
    xpReward: 65,
    data: {
      type: 'fraction-pizza',
      rounds: [
        { numerator: 1, denominator: 2, question: 'Colorea 1/2 del pastel (la mitad)' },
        { numerator: 1, denominator: 4, question: 'Colorea 1/4 del pastel (un cuarto)' },
        { numerator: 3, denominator: 4, question: 'Colorea 3/4 del pastel' },
        { numerator: 3, denominator: 8, question: 'Colorea 3/8 del pastel' },
        { numerator: 5, denominator: 8, question: 'Colorea 5/8 del pastel' },
      ],
    },
  },
  {
    id: 'number-match',
    title: 'Asocia Números',
    description: 'Une cada número con el grupo correcto de objetos',
    subjectId: 'matematica',
    emoji: '🔢',
    color: '#FE6D73',
    difficulty: 1,
    xpReward: 50,
    data: {
      type: 'number-match',
      instruction: '¡Asocia cada número con el grupo correcto de objetos!',
      pairs: [
        { number: 3, emojis: '🍎🍎🍎', label: '3 manzanas' },
        { number: 5, emojis: '⭐⭐⭐⭐⭐', label: '5 estrellas' },
        { number: 2, emojis: '🐢🐢', label: '2 tortugas' },
        { number: 7, emojis: '🦋🦋🦋🦋🦋🦋🦋', label: '7 mariposas' },
        { number: 4, emojis: '🌺🌺🌺🌺', label: '4 flores' },
      ],
    },
  },
  {
    id: 'number-line',
    title: 'Recta Numérica',
    description: 'Toca donde va cada número en la recta',
    subjectId: 'matematica',
    emoji: '📏',
    color: '#FE6D73',
    difficulty: 2,
    xpReward: 60,
    data: {
      type: 'number-line',
      rounds: [
        { question: '¿Dónde va el número 7?', answer: 7, min: 0, max: 20 },
        { question: '¿Dónde va el número 13?', answer: 13, min: 0, max: 20 },
        { question: '¿Dónde va el número 4?', answer: 4, min: 0, max: 20 },
        { question: '¿Dónde va el número 18?', answer: 18, min: 0, max: 20 },
      ],
    },
  },
  {
    id: 'line-connect-historia',
    title: 'Une con Líneas: Historia',
    description: 'Conecta cada prócer con su logro histórico',
    subjectId: 'identidad',
    emoji: '🔗',
    color: '#FFCB77',
    difficulty: 2,
    xpReward: 70,
    data: {
      type: 'line-connect',
      instruction: 'Une cada figura histórica con su logro',
      left: ['Andrés Castro', 'Carlos Fonseca', 'Rubén Darío', 'Augusto Sandino'],
      right: ['Fundó el FSLN (1961)', 'Héroe de San Jacinto', 'Luchó contra la intervención yanqui', 'Padre del Modernismo'],
      correctPairs: [1, 0, 3, 2],
    },
  },
  {
    id: 'word-scramble',
    title: 'Ordena las Letras',
    description: 'Toca las letras en orden para formar la palabra',
    subjectId: 'lengua',
    emoji: '🔤',
    color: '#2584A7',
    difficulty: 1,
    xpReward: 55,
    data: {
      type: 'word-scramble',
      rounds: [
        { word: 'MARIPOSA', scrambled: ['R','O','S','A','M','I','P','A'], hint: 'Insecto con alas coloridas', emoji: '🦋' },
        { word: 'ESCUELA', scrambled: ['U','E','L','E','C','S','A'], hint: 'Lugar donde aprendo', emoji: '🏫' },
        { word: 'FAMILIA', scrambled: ['I','L','M','A','A','F','I'], hint: 'Papá, mamá y hermanos', emoji: '👨‍👩‍👧' },
        { word: 'COLIBRÍ', scrambled: ['O','L','R','Í','B','I','C'], hint: 'Pequeño pájaro de Nicaragua', emoji: '🐦' },
      ],
    },
  },
  {
    id: 'classify-seres-vivos',
    title: '¿Animal o Planta?',
    description: 'Clasifica cada ser vivo en su categoría',
    subjectId: 'ciencias',
    emoji: '🔬',
    color: '#6ECB7A',
    difficulty: 1,
    xpReward: 50,
    data: {
      type: 'classify',
      instruction: '¿Es un animal o una planta?',
      categories: ['🐾 Animal', '🌿 Planta'],
      items: [
        { text: 'León', emoji: '🦁', category: 0 },
        { text: 'Cactus', emoji: '🌵', category: 1 },
        { text: 'Elefante', emoji: '🐘', category: 0 },
        { text: 'Rosa', emoji: '🌹', category: 1 },
        { text: 'Rana', emoji: '🐸', category: 0 },
        { text: 'Pino', emoji: '🌲', category: 1 },
        { text: 'Mariposa', emoji: '🦋', category: 0 },
        { text: 'Girasol', emoji: '🌻', category: 1 },
      ],
    },
  },
];

/* ═══════════════════════════════════════════════════════
   MATERIAL DIDÁCTICO
═══════════════════════════════════════════════════════ */

export const MATERIALS: MaterialItem[] = [
  // Matemática
  { id: 'mat-libro-3', title: 'Matemática 3° Grado', description: 'Libro de texto oficial MINED Nicaragua', subjectId: 'matematica', grades: [3], type: 'libro', emoji: '📚', pages: 128 },
  { id: 'mat-ficha-tablas', title: 'Tablas de Multiplicar', description: 'Ficha de práctica con todas las tablas del 1 al 10', subjectId: 'matematica', grades: [2,3,4], type: 'ficha', emoji: '📄', pages: 4 },
  { id: 'mat-ficha-fracciones', title: 'Fracciones: Paso a Paso', description: 'Guía visual para entender fracciones simples', subjectId: 'matematica', grades: [3,4], type: 'ficha', emoji: '📄', pages: 6 },
  { id: 'mat-video-geometria', title: 'Figuras Geométricas', description: 'Video explicativo sobre formas básicas', subjectId: 'matematica', grades: [1,2,3], type: 'video', emoji: '🎬', duration: '8 min' },
  // Lengua
  { id: 'len-libro-lectura', title: 'Mi Libro de Lectura', description: 'Lecturas graduadas para primaria nicaragüense', subjectId: 'lengua', grades: [1,2,3,4,5,6], type: 'libro', emoji: '📚', pages: 96 },
  { id: 'len-ficha-ortografia', title: 'Reglas de Ortografía', description: 'Las reglas ortográficas más importantes del español', subjectId: 'lengua', grades: [3,4,5], type: 'ficha', emoji: '📄', pages: 5 },
  { id: 'len-formulario-comprension', title: 'Comprensión Lectora', description: 'Formulario de evaluación de comprensión', subjectId: 'lengua', grades: [2,3,4,5], type: 'formulario', emoji: '📝', pages: 3 },
  { id: 'len-libro-dario', title: 'Poemas de Rubén Darío', description: 'Selección de poemas del príncipe de las letras castellanas', subjectId: 'lengua', grades: [4,5,6], type: 'libro', emoji: '📖', pages: 48 },
  // Ciencias
  { id: 'cie-libro-3', title: 'Ciencias Naturales 3°', description: 'Libro oficial de ciencias para tercer grado', subjectId: 'ciencias', grades: [3], type: 'libro', emoji: '📚', pages: 112 },
  { id: 'cie-mapa-biomas', title: 'Biomas de Nicaragua', description: 'Mapa de los ecosistemas y biomas del país', subjectId: 'ciencias', grades: [3,4,5,6], type: 'mapa', emoji: '🗺️' },
  { id: 'cie-ficha-sistema-solar', title: 'El Sistema Solar', description: 'Ficha informativa con datos de los planetas', subjectId: 'ciencias', grades: [3,4,5], type: 'ficha', emoji: '📄', pages: 4 },
  { id: 'cie-video-fotosintesis', title: 'La Fotosíntesis', description: 'Animación educativa sobre cómo se alimentan las plantas', subjectId: 'ciencias', grades: [2,3,4], type: 'video', emoji: '🎬', duration: '6 min' },
  // Identidad
  { id: 'iden-libro-historia', title: 'Historia de Nicaragua', description: 'Desde la colonia hasta la actualidad', subjectId: 'identidad', grades: [4,5,6], type: 'libro', emoji: '📚', pages: 144 },
  { id: 'iden-mapa-departamentos', title: 'Mapa de Nicaragua', description: 'Departamentos, municipios y accidentes geográficos', subjectId: 'identidad', grades: [3,4,5,6], type: 'mapa', emoji: '🗺️' },
  { id: 'iden-ficha-heroes', title: 'Héroes y Mártires', description: 'Ficha sobre los principales héroes nacionales', subjectId: 'identidad', grades: [3,4,5,6], type: 'ficha', emoji: '📄', pages: 5 },
  { id: 'iden-formulario-simbolos', title: 'Símbolos Patrios', description: 'Cuestionario sobre los símbolos nacionales', subjectId: 'identidad', grades: [2,3,4], type: 'formulario', emoji: '📝', pages: 2 },
  // Valores
  { id: 'val-libro-valores', title: 'Creciendo en Valores', description: 'Libro de formación en valores para primaria', subjectId: 'valores', grades: [1,2,3,4,5,6], type: 'libro', emoji: '📚', pages: 80 },
  { id: 'val-ficha-familia', title: 'Mi Familia y Yo', description: 'Ficha de reflexión sobre los valores en familia', subjectId: 'valores', grades: [1,2,3], type: 'ficha', emoji: '📄', pages: 3 },
  { id: 'val-video-solidaridad', title: 'Solidaridad y Amistad', description: 'Video educativo sobre el valor de la solidaridad', subjectId: 'valores', grades: [1,2,3,4], type: 'video', emoji: '🎬', duration: '5 min' },
];

/* ═══════════════════════════════════════════════════════
   TEACHER DATA
═══════════════════════════════════════════════════════ */

import type { Teacher, StudentRecord, ClassUnit, MinedMaterial } from './types';

export const DEMO_TEACHER: Teacher = {
  name: 'Prof. Ana María Castro',
  username: 'prof.castro',
  email: 'acastro@mined.edu.ni',
  avatar: '👩‍🏫',
  grade: 3,
  school: 'Escuela Pública Rubén Darío, Managua',
};

export const STUDENTS: StudentRecord[] = [
  { id: 'st-01', name: 'María José Flores',    avatar: '🌸', xp: 1840, level: 10, streak: 14, gamesPlayed: 22, lastActive: 'Hoy',       progress: { matematica: 92, lengua: 88, valores: 95, identidad: 80, ciencias: 90 } },
  { id: 'st-02', name: 'Carlos Alberto Ruiz',  avatar: '⚽', xp: 1520, level: 8,  streak: 7,  gamesPlayed: 18, lastActive: 'Hoy',       progress: { matematica: 78, lengua: 70, valores: 80, identidad: 65, ciencias: 72 } },
  { id: 'st-03', name: 'Ana Lucía Pérez',      avatar: '🦋', xp: 1200, level: 7,  streak: 5,  gamesPlayed: 14, lastActive: 'Ayer',      progress: { matematica: 60, lengua: 68, valores: 72, identidad: 55, ciencias: 58 } },
  { id: 'st-04', name: 'Diego Andrés López',   avatar: '🚀', xp: 900,  level: 5,  streak: 2,  gamesPlayed: 9,  lastActive: 'Hace 3 días', progress: { matematica: 45, lengua: 50, valores: 55, identidad: 38, ciencias: 42 } },
  { id: 'st-05', name: 'Sofía Isabel Martínez',avatar: '🌻', xp: 1760, level: 9,  streak: 12, gamesPlayed: 20, lastActive: 'Hoy',       progress: { matematica: 88, lengua: 82, valores: 90, identidad: 78, ciencias: 85 } },
  { id: 'st-06', name: 'Jorge Luis Hernández', avatar: '🎸', xp: 1100, level: 6,  streak: 3,  gamesPlayed: 11, lastActive: 'Ayer',      progress: { matematica: 55, lengua: 60, valores: 65, identidad: 48, ciencias: 52 } },
  { id: 'st-07', name: 'Valentina Rodríguez',  avatar: '🌈', xp: 1430, level: 8,  streak: 8,  gamesPlayed: 16, lastActive: 'Hoy',       progress: { matematica: 72, lengua: 75, valores: 78, identidad: 68, ciencias: 70 } },
  { id: 'st-08', name: 'Alejandro García',     avatar: '🦁', xp: 1620, level: 9,  streak: 10, gamesPlayed: 19, lastActive: 'Hoy',       progress: { matematica: 82, lengua: 78, valores: 85, identidad: 74, ciencias: 80 } },
  { id: 'st-09', name: 'Gabriela Torres',      avatar: '🌺', xp: 1280, level: 7,  streak: 6,  gamesPlayed: 13, lastActive: 'Ayer',      progress: { matematica: 65, lengua: 70, valores: 68, identidad: 60, ciencias: 63 } },
  { id: 'st-10', name: 'Luis Fernando Ramos',  avatar: '🐢', xp: 780,  level: 4,  streak: 1,  gamesPlayed: 7,  lastActive: 'Hace 5 días', progress: { matematica: 38, lengua: 45, valores: 50, identidad: 32, ciencias: 40 } },
  { id: 'st-11', name: 'Paola Andrea Sánchez', avatar: '🦜', xp: 1380, level: 7,  streak: 9,  gamesPlayed: 15, lastActive: 'Hoy',       progress: { matematica: 70, lengua: 74, valores: 76, identidad: 66, ciencias: 68 } },
  { id: 'st-12', name: 'Roberto Manuel Díaz',  avatar: '⚡', xp: 1050, level: 6,  streak: 4,  gamesPlayed: 10, lastActive: 'Ayer',      progress: { matematica: 52, lengua: 58, valores: 62, identidad: 48, ciencias: 55 } },
  { id: 'st-13', name: 'Daniela Cruz',         avatar: '🌟', xp: 1790, level: 9,  streak: 15, gamesPlayed: 21, lastActive: 'Hoy',       progress: { matematica: 90, lengua: 86, valores: 92, identidad: 82, ciencias: 88 } },
  { id: 'st-14', name: 'Kevin Martínez',       avatar: '🎮', xp: 680,  level: 4,  streak: 0,  gamesPlayed: 6,  lastActive: 'Hace 1 sem', progress: { matematica: 32, lengua: 40, valores: 42, identidad: 28, ciencias: 35 } },
  { id: 'st-15', name: 'Nataly González',      avatar: '🦚', xp: 1250, level: 7,  streak: 5,  gamesPlayed: 12, lastActive: 'Ayer',      progress: { matematica: 62, lengua: 66, valores: 70, identidad: 58, ciencias: 60 } },
];

export const CLASS_UNITS: ClassUnit[] = [
  /* ── MATEMÁTICA ── */
  {
    id: 'u-mat-1', subjectId: 'matematica', order: 1,
    title: 'Números Naturales hasta 1000',
    weeks: 'Sem. 1 – 4',
    plans: [
      {
        id: 'p-mat-1-1', title: 'Los números del 100 al 500', date: '2024-02-05', totalDuration: 45,
        objectives: ['Leer y escribir números naturales hasta 500', 'Identificar el valor posicional de centenas, decenas y unidades'],
        activities: [
          { moment: 'inicio',     description: 'Dinámica con fichas numéricas: cada estudiante recibe un número y debe ordenarse de menor a mayor.', duration: 10 },
          { moment: 'desarrollo', description: 'Explicación del sistema de valor posicional usando el ábaco. Ejercicios en la pizarra con participación de estudiantes. Trabajo individual en cuaderno.', duration: 25 },
          { moment: 'cierre',     description: 'Juego "¿Qué número soy?" — el docente describe un número y los estudiantes escriben en su pizarrín.', duration: 10 },
        ],
        resources: ['Fichas numéricas', 'Ábaco', 'Pizarrín individual', 'Libro de Matemática 3° p. 12-18'],
        evaluation: 'Ejercicio de escritura de 10 números dictados. Criterio: 8/10 correctos.',
      },
      {
        id: 'p-mat-1-2', title: 'Los números del 500 al 1000', date: '2024-02-12', totalDuration: 45,
        objectives: ['Leer y escribir números hasta 1000', 'Comparar y ordenar números de tres cifras usando >, < e ='],
        activities: [
          { moment: 'inicio',     description: 'Repaso del contenido anterior mediante preguntas orales. Presentación de la meta de la clase.', duration: 8 },
          { moment: 'desarrollo', description: 'Uso de la recta numérica en la pizarra para ubicar números del 500 al 1000. Trabajo en pareja: cada pareja recibe tarjetas y debe ordenarlas. Socialización de resultados.', duration: 27 },
          { moment: 'cierre',     description: 'Autoevaluación: los estudiantes completan una tabla de comparación de 5 pares de números.', duration: 10 },
        ],
        resources: ['Recta numérica mural', 'Tarjetas numéricas', 'Libro p. 19-24'],
        evaluation: 'Tabla de comparación: 4 de 5 pares correctos.',
      },
    ],
  },
  {
    id: 'u-mat-2', subjectId: 'matematica', order: 2,
    title: 'Operaciones Básicas',
    weeks: 'Sem. 5 – 9',
    plans: [
      {
        id: 'p-mat-2-1', title: 'Suma y resta con reagrupación', date: '2024-03-04', totalDuration: 45,
        objectives: ['Resolver sumas con reagrupación de centenas', 'Aplicar la resta con reagrupación en situaciones cotidianas'],
        activities: [
          { moment: 'inicio',     description: 'Resolución de un problema de contexto real: "Si tienes 348 lempiras y gastas 179, ¿cuánto te queda?"', duration: 8 },
          { moment: 'desarrollo', description: 'Modelado en la pizarra del algoritmo de suma y resta con reagrupación. Trabajo individual con 6 ejercicios graduados.', duration: 27 },
          { moment: 'cierre',     description: 'Revisión colectiva. Los estudiantes explican el proceso realizado.', duration: 10 },
        ],
        resources: ['Libro p. 35-42', 'Fichas de ejercicios', 'Calculadora (para verificar)'],
        evaluation: 'Resolución de 6 operaciones. Criterio: mínimo 5 correctas.',
      },
      {
        id: 'p-mat-2-2', title: 'Introducción a la multiplicación', date: '2024-03-18', totalDuration: 45,
        objectives: ['Comprender la multiplicación como suma repetida', 'Construir las tablas del 2 y del 3'],
        activities: [
          { moment: 'inicio',     description: 'Actividad con grupos de objetos: "Tenemos 4 grupos de 3 botones, ¿cuántos hay en total?"', duration: 10 },
          { moment: 'desarrollo', description: 'Demostración concreta-pictórica-abstracta. Construcción participativa de las tablas del 2 y 3 en la pizarra. Memorización mediante rima.', duration: 25 },
          { moment: 'cierre',     description: 'Canción de las tablas. Mini-prueba oral.', duration: 10 },
        ],
        resources: ['Botones/objetos concretos', 'Carteles de tablas', 'Libro p. 50-56'],
        evaluation: 'Prueba oral: resolver 5 multiplicaciones de la tabla del 2 y 3.',
      },
    ],
  },
  {
    id: 'u-mat-3', subjectId: 'matematica', order: 3,
    title: 'Fracciones Simples',
    weeks: 'Sem. 10 – 14',
    plans: [
      {
        id: 'p-mat-3-1', title: '¿Qué es una fracción?', date: '2024-04-15', totalDuration: 45,
        objectives: ['Reconocer una fracción como parte de un todo', 'Identificar numerador y denominador'],
        activities: [
          { moment: 'inicio',     description: 'División de una pizza de papel entre el grupo. ¿Qué parte tocó a cada quien?', duration: 8 },
          { moment: 'desarrollo', description: 'Presentación del concepto con material concreto. Práctica de representación gráfica de fracciones simples.', duration: 27 },
          { moment: 'cierre',     description: 'Los estudiantes crean su propia fracción usando papel doblado y la presentan al grupo.', duration: 10 },
        ],
        resources: ['Círculos de papel', 'Tijeras', 'Libro p. 72-78'],
        evaluation: 'Representar 4 fracciones indicadas con material recortable.',
      },
      {
        id: 'p-mat-3-2', title: 'Fracciones equivalentes', date: '2024-04-29', totalDuration: 45,
        objectives: ['Comparar fracciones simples', 'Identificar fracciones equivalentes básicas'],
        activities: [
          { moment: 'inicio',     description: 'Comparación visual: ½ de un chocolate vs ¼ del mismo chocolate. ¿Cuál es mayor?', duration: 8 },
          { moment: 'desarrollo', description: 'Uso de tiras fraccionarias para encontrar equivalencias. Registro en cuaderno.', duration: 27 },
          { moment: 'cierre',     description: 'Juego de memoria con pares de fracciones equivalentes.', duration: 10 },
        ],
        resources: ['Tiras fraccionarias', 'Juego de memoria', 'Libro p. 79-84'],
        evaluation: 'Identificar 5 pares equivalentes del juego de memoria.',
      },
    ],
  },

  /* ── LENGUA Y LITERATURA ── */
  {
    id: 'u-len-1', subjectId: 'lengua', order: 1,
    title: 'Comprensión Lectora',
    weeks: 'Sem. 1 – 4',
    plans: [
      {
        id: 'p-len-1-1', title: 'Lectura de textos descriptivos', date: '2024-02-06', totalDuration: 45,
        objectives: ['Leer con fluidez y entonación textos descriptivos', 'Identificar las características de las personas y lugares descritos'],
        activities: [
          { moment: 'inicio',     description: 'Presentación de una imagen del lago Cocibolca. Los estudiantes describen oralmente lo que ven.', duration: 8 },
          { moment: 'desarrollo', description: 'Lectura grupal del texto "El Lago de Nicaragua". Subrayado de palabras descriptivas. Preguntas de comprensión.', duration: 27 },
          { moment: 'cierre',     description: 'Cada estudiante escribe 3 oraciones describiendo su lugar favorito de Nicaragua.', duration: 10 },
        ],
        resources: ['Texto fotocopiado', 'Imagen del Lago Cocibolca', 'Libro de Lectura p. 8-11'],
        evaluation: 'Responder 5 preguntas de comprensión lectora. Criterio: 4/5 correctas.',
      },
      {
        id: 'p-len-1-2', title: 'Ideas principales y secundarias', date: '2024-02-20', totalDuration: 45,
        objectives: ['Distinguir la idea principal de las ideas secundarias en un párrafo', 'Resumir un texto breve con sus propias palabras'],
        activities: [
          { moment: 'inicio',     description: 'Dinámica: el docente lee un párrafo y los estudiantes votan por cuál oración es la más importante.', duration: 10 },
          { moment: 'desarrollo', description: 'Técnica del subrayado: idea principal en rojo, secundarias en azul. Trabajo individual con texto del libro.', duration: 25 },
          { moment: 'cierre',     description: 'Compartir resúmenes en voz alta. Retroalimentación grupal.', duration: 10 },
        ],
        resources: ['Marcadores de colores', 'Libro de Lectura p. 14-17', 'Texto adicional fotocopiado'],
        evaluation: 'Subrayar correctamente idea principal y dos secundarias en un párrafo nuevo.',
      },
    ],
  },
  {
    id: 'u-len-2', subjectId: 'lengua', order: 2,
    title: 'Gramática y Ortografía',
    weeks: 'Sem. 5 – 9',
    plans: [
      {
        id: 'p-len-2-1', title: 'El sustantivo y sus clases', date: '2024-03-05', totalDuration: 45,
        objectives: ['Identificar sustantivos propios y comunes en oraciones', 'Clasificar sustantivos en individuales y colectivos'],
        activities: [
          { moment: 'inicio',     description: 'Juego "Digo una cosa": los estudiantes mencionan objetos del aula y el docente agrupa en común/propio.', duration: 8 },
          { moment: 'desarrollo', description: 'Explicación con ejemplos nicaragüenses (Managua/ciudad, Rubén Darío/poeta). Ejercicios de clasificación.', duration: 27 },
          { moment: 'cierre',     description: 'Los estudiantes buscan 5 sustantivos en un párrafo y los clasifican.', duration: 10 },
        ],
        resources: ['Libro de Lengua p. 28-33', 'Tarjetas de palabras'],
        evaluation: 'Clasificar correctamente 8 de 10 sustantivos en una lista dada.',
      },
      {
        id: 'p-len-2-2', title: 'Uso correcto de la coma', date: '2024-03-19', totalDuration: 45,
        objectives: ['Conocer los usos principales de la coma', 'Aplicar la coma en enumeraciones y vocativos'],
        activities: [
          { moment: 'inicio',     description: 'Lectura de dos oraciones idénticas, una con coma y otra sin ella, mostrando el cambio de significado.', duration: 8 },
          { moment: 'desarrollo', description: 'Presentación de reglas con ejemplos. Dictado de oraciones para practicar. Corrección en parejas.', duration: 27 },
          { moment: 'cierre',     description: 'Cada estudiante escribe 3 oraciones que requieran coma y las intercambia para revisión.', duration: 10 },
        ],
        resources: ['Libro p. 40-44', 'Fichas de dictado'],
        evaluation: 'Colocar comas correctamente en 8 de 10 oraciones.',
      },
    ],
  },
  {
    id: 'u-len-3', subjectId: 'lengua', order: 3,
    title: 'Producción Escrita',
    weeks: 'Sem. 10 – 14',
    plans: [
      {
        id: 'p-len-3-1', title: 'Escritura de cuentos cortos', date: '2024-04-16', totalDuration: 45,
        objectives: ['Planificar un cuento breve con inicio, nudo y desenlace', 'Escribir un cuento coherente de 5 a 8 oraciones'],
        activities: [
          { moment: 'inicio',     description: 'Lectura del cuento "El Güegüense" adaptado. Identificar sus tres partes.', duration: 10 },
          { moment: 'desarrollo', description: 'Uso de organizador gráfico (inicio/nudo/desenlace). Escritura individual del cuento con borrador.', duration: 25 },
          { moment: 'cierre',     description: 'Lectura voluntaria de cuentos. Aplausos y retroalimentación positiva.', duration: 10 },
        ],
        resources: ['Texto del Güegüense adaptado', 'Organizador gráfico fotocopiado', 'Cuaderno'],
        evaluation: 'Cuento con las tres partes identificables. Mínimo 5 oraciones con coherencia.',
      },
    ],
  },

  /* ── CIENCIAS NATURALES ── */
  {
    id: 'u-cie-1', subjectId: 'ciencias', order: 1,
    title: 'Los Seres Vivos',
    weeks: 'Sem. 1 – 4',
    plans: [
      {
        id: 'p-cie-1-1', title: 'Características de los seres vivos', date: '2024-02-07', totalDuration: 45,
        objectives: ['Mencionar las características básicas de los seres vivos', 'Distinguir seres vivos de objetos inertes'],
        activities: [
          { moment: 'inicio',     description: 'Presentación de imágenes mezcladas: una piedra, un perro, una flor, un automóvil. Los estudiantes votan cuáles son seres vivos.', duration: 8 },
          { moment: 'desarrollo', description: 'Construcción del concepto con 6 características (nacen, crecen, se reproducen...). Registro en cuaderno con esquema.', duration: 27 },
          { moment: 'cierre',     description: 'Salida al patio: observar y clasificar lo que encuentran como vivo/no vivo.', duration: 10 },
        ],
        resources: ['Imágenes laminadas', 'Libro de Ciencias p. 6-12'],
        evaluation: 'Clasificar correctamente 8 de 10 imágenes en un cuadro.',
      },
      {
        id: 'p-cie-1-2', title: 'Animales y plantas: sus diferencias', date: '2024-02-21', totalDuration: 45,
        objectives: ['Comparar características de animales y plantas', 'Identificar ejemplos nativos de Nicaragua'],
        activities: [
          { moment: 'inicio',     description: 'Canción "En el bosque de Nicaragua" con imágenes de fauna y flora local.', duration: 8 },
          { moment: 'desarrollo', description: 'Cuadro comparativo animales vs plantas. Trabajo grupal con imágenes de flora y fauna nicaragüense.', duration: 27 },
          { moment: 'cierre',     description: 'Presentación de los cuadros comparativos por grupos.', duration: 10 },
        ],
        resources: ['Imágenes de flora/fauna Nicaragua', 'Cartulinas', 'Libro p. 13-19'],
        evaluation: 'Cuadro comparativo con al menos 4 diferencias y 3 ejemplos de cada uno.',
      },
    ],
  },
  {
    id: 'u-cie-2', subjectId: 'ciencias', order: 2,
    title: 'El Cuerpo Humano y la Salud',
    weeks: 'Sem. 5 – 9',
    plans: [
      {
        id: 'p-cie-2-1', title: 'Los sistemas del cuerpo humano', date: '2024-03-06', totalDuration: 45,
        objectives: ['Identificar los principales sistemas del cuerpo humano', 'Describir la función básica de cada sistema'],
        activities: [
          { moment: 'inicio',     description: 'Silueta humana vacía en papel grande. Los estudiantes dibujan lo que creen que hay adentro.', duration: 10 },
          { moment: 'desarrollo', description: 'Presentación de los 5 sistemas principales con láminas. Completar la silueta correctamente.', duration: 25 },
          { moment: 'cierre',     description: 'Memoria de sistemas: cartas con nombre del sistema y función que deben emparejar.', duration: 10 },
        ],
        resources: ['Silueta humana lámina', 'Láminas de sistemas', 'Libro p. 32-40'],
        evaluation: 'Identificar y describir brevemente 4 de 5 sistemas.',
      },
    ],
  },
  {
    id: 'u-cie-3', subjectId: 'ciencias', order: 3,
    title: 'El Medio Ambiente de Nicaragua',
    weeks: 'Sem. 10 – 13',
    plans: [
      {
        id: 'p-cie-3-1', title: 'Ecosistemas de Nicaragua', date: '2024-04-17', totalDuration: 45,
        objectives: ['Describir los principales ecosistemas de Nicaragua', 'Reconocer la importancia de la biodiversidad nacional'],
        activities: [
          { moment: 'inicio',     description: 'Video corto (3 min) sobre los bosques y costas de Nicaragua. Preguntas detonadoras.', duration: 10 },
          { moment: 'desarrollo', description: 'Mapa de Nicaragua: ubicar los principales ecosistemas. Trabajo grupal asignando características.', duration: 25 },
          { moment: 'cierre',     description: 'Compromiso escrito: "Para cuidar el medio ambiente yo voy a…"', duration: 10 },
        ],
        resources: ['Mapa mural de Nicaragua', 'Video "Ecosistemas NI"', 'Libro p. 58-64'],
        evaluation: 'Ubicar y nombrar correctamente 3 ecosistemas en el mapa.',
      },
    ],
  },

  /* ── IDENTIDAD NACIONAL ── */
  {
    id: 'u-id-1', subjectId: 'identidad', order: 1,
    title: 'Historia y Cultura de Nicaragua',
    weeks: 'Sem. 1 – 4',
    plans: [
      {
        id: 'p-id-1-1', title: 'Pueblos indígenas de Nicaragua', date: '2024-02-08', totalDuration: 45,
        objectives: ['Identificar los principales pueblos indígenas de Nicaragua', 'Valorar el legado cultural de nuestros antepasados'],
        activities: [
          { moment: 'inicio',     description: 'Mostrar artesanías y vestimenta indígena. ¿Conocen de qué pueblo viene esto?', duration: 8 },
          { moment: 'desarrollo', description: 'Presentación de los pueblos Chorotegas, Miskitos y Ramas. Ubicación en mapa. Trabajo con ficha informativa.', duration: 27 },
          { moment: 'cierre',     description: 'Los estudiantes dibujan un símbolo cultural que les llamó la atención y explican por qué.', duration: 10 },
        ],
        resources: ['Artesanías (real o foto)', 'Mapa étnico de Nicaragua', 'Libro de Identidad p. 8-14'],
        evaluation: 'Mencionar 3 pueblos y 2 características de cada uno en forma oral.',
      },
    ],
  },
  {
    id: 'u-id-2', subjectId: 'identidad', order: 2,
    title: 'Geografía Nicaragüense',
    weeks: 'Sem. 5 – 9',
    plans: [
      {
        id: 'p-id-2-1', title: 'Departamentos y municipios', date: '2024-03-07', totalDuration: 45,
        objectives: ['Identificar los 15 departamentos y las 2 regiones autónomas', 'Ubicar los departamentos en el mapa nacional'],
        activities: [
          { moment: 'inicio',     description: 'Rompecabezas del mapa de Nicaragua en grupos. ¿Cuántas piezas hay?', duration: 10 },
          { moment: 'desarrollo', description: 'Presentación de departamentos por región (Pacífico, Norte/Centro, Caribe). Completar mapa mudo en cuaderno.', duration: 25 },
          { moment: 'cierre',     description: 'Quiz oral: el docente señala en el mapa y los estudiantes nombran el departamento.', duration: 10 },
        ],
        resources: ['Rompecabezas de Nicaragua', 'Mapa mudo fotocopiado', 'Libro p. 30-36'],
        evaluation: 'Nombrar correctamente 10 de 15 departamentos señalados en el mapa.',
      },
      {
        id: 'p-id-2-2', title: 'Accidentes geográficos de Nicaragua', date: '2024-03-21', totalDuration: 45,
        objectives: ['Nombrar lagos, volcanes y ríos principales de Nicaragua', 'Comprender la importancia geográfica del territorio nacional'],
        activities: [
          { moment: 'inicio',     description: 'Adivina el lugar: el docente da pistas y los estudiantes adivinan el accidente geográfico.', duration: 8 },
          { moment: 'desarrollo', description: 'Clasificación en tres grupos: lagos y lagunas, volcanes, ríos. Ubícalos en el mapa con color.', duration: 27 },
          { moment: 'cierre',     description: 'Escribir 3 datos curiosos sobre el Lago Cocibolca o el Volcán Masaya.', duration: 10 },
        ],
        resources: ['Mapa físico de Nicaragua', 'Fichas informativas', 'Libro p. 37-42'],
        evaluation: 'Identificar y ubicar 3 accidentes de cada categoría en el mapa.',
      },
    ],
  },
  {
    id: 'u-id-3', subjectId: 'identidad', order: 3,
    title: 'Símbolos y Celebraciones Patrias',
    weeks: 'Sem. 10 – 13',
    plans: [
      {
        id: 'p-id-3-1', title: 'Símbolos patrios de Nicaragua', date: '2024-04-18', totalDuration: 45,
        objectives: ['Identificar y describir los símbolos patrios oficiales', 'Expresar orgullo e identidad nacional'],
        activities: [
          { moment: 'inicio',     description: 'Audición del Himno Nacional de Nicaragua. Los estudiantes de pie.', duration: 5 },
          { moment: 'desarrollo', description: 'Presentación de cada símbolo (bandera, escudo, himno, ave, árbol, flor). Completar ficha descriptiva.', duration: 30 },
          { moment: 'cierre',     description: 'Dibujar y colorear la bandera y el escudo de Nicaragua correctamente.', duration: 10 },
        ],
        resources: ['Láminas de símbolos patrios', 'Himno Nacional (audio)', 'Libro p. 55-60'],
        evaluation: 'Identificar y describir correctamente 5 de los 6 símbolos patrios.',
      },
    ],
  },

  /* ── VALORES ── */
  {
    id: 'u-val-1', subjectId: 'valores', order: 1,
    title: 'Convivencia Escolar',
    weeks: 'Sem. 1 – 4',
    plans: [
      {
        id: 'p-val-1-1', title: 'El respeto en la escuela', date: '2024-02-09', totalDuration: 45,
        objectives: ['Comprender el valor del respeto hacia personas y objetos', 'Aplicar normas de convivencia en el aula'],
        activities: [
          { moment: 'inicio',     description: 'Escenificación: dos estudiantes representan una situación de irrespeto. ¿Cómo se sintieron? ¿Cómo mejorarlo?', duration: 10 },
          { moment: 'desarrollo', description: 'Construcción colectiva del "Código de convivencia del aula". Cada estudiante aporta una norma.', duration: 25 },
          { moment: 'cierre',     description: 'Firma del código de convivencia. Decoración del cartel para colocar en el aula.', duration: 10 },
        ],
        resources: ['Cartulina grande', 'Marcadores de colores'],
        evaluation: 'Participación activa y propuesta de al menos una norma de convivencia.',
      },
    ],
  },
  {
    id: 'u-val-2', subjectId: 'valores', order: 2,
    title: 'Mi Familia y Comunidad',
    weeks: 'Sem. 5 – 9',
    plans: [
      {
        id: 'p-val-2-1', title: 'Roles y responsabilidades en familia', date: '2024-03-08', totalDuration: 45,
        objectives: ['Reconocer los roles de cada miembro de la familia', 'Identificar sus responsabilidades en el hogar'],
        activities: [
          { moment: 'inicio',     description: 'Los estudiantes dibujan a su familia y la presentan brevemente.', duration: 10 },
          { moment: 'desarrollo', description: 'Análisis de una historia familiar ilustrada. Discusión sobre los roles y responsabilidades de cada personaje.', duration: 25 },
          { moment: 'cierre',     description: 'Lista personal: "Mis tres responsabilidades en casa". Compromiso en voz alta.', duration: 10 },
        ],
        resources: ['Historia familiar ilustrada', 'Libro de Valores p. 22-27'],
        evaluation: 'Identificar correctamente 3 roles familiares y 3 propias responsabilidades.',
      },
    ],
  },
  {
    id: 'u-val-3', subjectId: 'valores', order: 3,
    title: 'Ciudadanía y Responsabilidad',
    weeks: 'Sem. 10 – 13',
    plans: [
      {
        id: 'p-val-3-1', title: 'Mis derechos y deberes como niño/a', date: '2024-04-22', totalDuration: 45,
        objectives: ['Conocer los derechos fundamentales de la niñez nicaragüense', 'Relacionar derechos con deberes correspondientes'],
        activities: [
          { moment: 'inicio',     description: 'Video corto (2 min): "Los derechos del niño — UNICEF Nicaragua". Preguntas orales.', duration: 8 },
          { moment: 'desarrollo', description: 'Juego de cartas: emparejar cada derecho con su deber correspondiente. Discusión grupal.', duration: 27 },
          { moment: 'cierre',     description: '"Mi derecho favorito": cada estudiante escribe por qué ese derecho es importante para ellos.', duration: 10 },
        ],
        resources: ['Video UNICEF (corto)', 'Cartas de derechos/deberes', 'Libro p. 42-47'],
        evaluation: 'Emparejar correctamente 4 de 5 pares derecho-deber.',
      },
    ],
  },
];

export const MINED_MATERIALS: MinedMaterial[] = [
  {
    id: 'mn-01', title: 'Programa de Estudio 2024 — Primer Ciclo', type: 'programa',
    description: 'Programa oficial del MINED para 1°, 2° y 3° grado. Incluye competencias de grado, indicadores de logro y contenidos por disciplina.',
    grades: [1, 2, 3], date: '2024-01-15', pages: 186, emoji: '📘', isNew: false,
  },
  {
    id: 'mn-02', title: 'Guía Metodológica — Matemática 3° Grado', type: 'guia',
    description: 'Estrategias pedagógicas y secuencias didácticas para la enseñanza de Matemática en tercer grado según el currículo nacional.',
    subjectId: 'matematica', grades: [3], date: '2024-01-22', pages: 64, emoji: '📗', isNew: false,
  },
  {
    id: 'mn-03', title: 'Evaluaciones Nacionales — I Semestre 2024', type: 'evaluacion',
    description: 'Pruebas diagnósticas y formativas del primer semestre para todas las disciplinas del primer ciclo de primaria.',
    grades: [1, 2, 3, 4, 5, 6], date: '2024-02-01', pages: 48, emoji: '📋', isNew: false,
  },
  {
    id: 'mn-04', title: 'Circular N° 04-2024: Calendario Escolar Ajustado', type: 'circular',
    description: 'Ajustes al calendario escolar 2024 por actividades nacionales. Incluye cronograma de evaluaciones del segundo semestre.',
    grades: [1, 2, 3, 4, 5, 6], date: '2024-07-10', pages: 3, emoji: '📢', isNew: true,
  },
  {
    id: 'mn-05', title: 'Plan de Estudios Primaria 2024–2025', type: 'planificacion',
    description: 'Planificación anual oficial del MINED con distribución de unidades, semanas efectivas y períodos de evaluación por grado.',
    grades: [1, 2, 3, 4, 5, 6], date: '2024-07-15', pages: 28, emoji: '📅', isNew: true,
  },
  {
    id: 'mn-06', title: 'Guía Metodológica — Lengua y Literatura', type: 'guia',
    description: 'Orientaciones para desarrollar las habilidades comunicativas: lectura, escritura, oralidad y gramática en educación primaria.',
    subjectId: 'lengua', grades: [1, 2, 3, 4, 5, 6], date: '2024-01-25', pages: 72, emoji: '📕', isNew: false,
  },
  {
    id: 'mn-07', title: 'Indicadores de Logro — 3er Grado (Revisión)', type: 'evaluacion',
    description: 'Actualización de los indicadores de logro para tercer grado en todas las disciplinas. Documento de referencia para evaluación.',
    grades: [3], date: '2024-06-20', pages: 22, emoji: '✅', isNew: true,
  },
  {
    id: 'mn-08', title: 'Circular N° 03-2024: Protocolo de Evaluación', type: 'circular',
    description: 'Disposiciones del MINED sobre los instrumentos y criterios de evaluación para el año lectivo 2024.',
    grades: [1, 2, 3, 4, 5, 6], date: '2024-03-05', pages: 8, emoji: '📢', isNew: false,
  },
  {
    id: 'mn-09', title: 'Material de Apoyo — Ciencias Naturales', type: 'guia',
    description: 'Actividades experimentales y recursos didácticos para la enseñanza de Ciencias Naturales en el primer y segundo ciclo.',
    subjectId: 'ciencias', grades: [1, 2, 3, 4], date: '2024-02-10', pages: 55, emoji: '🔬', isNew: false,
  },
  {
    id: 'mn-10', title: 'Guía de Valores y Ciudadanía — Actualización', type: 'guia',
    description: 'Nueva versión de la guía para la formación en valores, ciudadanía y convivencia escolar pacífica.',
    subjectId: 'valores', grades: [1, 2, 3, 4, 5, 6], date: '2024-07-08', pages: 40, emoji: '💚', isNew: true,
  },
  {
    id: 'mn-11', title: 'Evaluaciones del II Semestre 2024', type: 'evaluacion',
    description: 'Pruebas sumativas y rúbricas de evaluación para el segundo semestre, todas las disciplinas y grados.',
    grades: [1, 2, 3, 4, 5, 6], date: '2024-07-01', pages: 52, emoji: '📝', isNew: true,
  },
  {
    id: 'mn-12', title: 'Programa Nacional de Educación Primaria', type: 'programa',
    description: 'Marco curricular general de la educación primaria nicaragüense. Fundamentos, enfoques pedagógicos y estructura del currículo.',
    grades: [1, 2, 3, 4, 5, 6], date: '2023-12-01', pages: 210, emoji: '🇳🇮', isNew: false,
  },
];

export function xpToLevel(xp: number): number {
  return Math.floor(xp / 200) + 1;
}

export function xpForNextLevel(level: number): number {
  return level * 200;
}

export function xpInCurrentLevel(xp: number): number {
  return xp % 200;
}

export function getSubjectProgress(subjectId: string, grade: number, completedLessons: string[]): number {
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  if (!subject) return 0;
  const lessons = subject.grades[grade] ?? [];
  if (lessons.length === 0) return 0;
  const done = lessons.filter((l) => completedLessons.includes(l.id)).length;
  return Math.round((done / lessons.length) * 100);
}
