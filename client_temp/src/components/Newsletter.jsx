import React, { useState, useEffect } from 'react';
import './Newsletter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Portada');
  const [filteredMainNews, setFilteredMainNews] = useState([]);
  const [filteredSideNews, setFilteredSideNews] = useState([]);
  
  // Todas las categorías disponibles
  const categories = [
    'I + D', 'Salud', 'Ciencia', 'Legislación', 'Cultivo', 'Eventos', 'Comunidad'
  ];
  
  // Datos completos de noticias por categoría
  const allNewsData = {
    Portada: [
      {
        id: 1,
        category: 'CIENCIA',
        title: 'Nuevo estudio revela efectos del CBD en el tratamiento de la fibromialgia',
        excerpt: 'Investigación publicada en Nature muestra reducción del 40% en síntomas de dolor crónico con dosis controladas de extracto de cannabis rico en CBD.',
        date: '15 Mar 2023',
        readTime: '4 min',
        featured: true,
        image: 'https://images.unsplash.com/photo-1586081096476-4b7d5c1c6b64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        category: 'LEGISLACIÓN',
        title: 'Uruguay amplía acceso a cannabis medicinal en sistema de salud público',
        excerpt: 'El gobierno anuncia nueva regulación que permitirá a más pacientes acceder a tratamientos con cannabis sin costo.',
        date: '12 Mar 2023',
        readTime: '3 min',
        featured: true
      },
      {
        id: 3,
        category: 'SALUD',
        title: 'Avances en el tratamiento de epilepsia refractaria con cannabis',
        excerpt: 'Estudio clínico muestra reducción del 50% en convulsiones en pacientes pediátricos.',
        date: '10 Mar 2023',
        readTime: '5 min',
        featured: false
      }
    ],
    Salud: [
      {
        id: 101,
        category: 'SALUD',
        title: 'Cannabis en el manejo del dolor crónico: nueva guía clínica',
        excerpt: 'La asociación médica actualiza protocolos para el uso de cannabis en pacientes con dolor crónico.',
        date: '18 Mar 2023',
        readTime: '6 min',
        featured: true,
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 102,
        category: 'SALUD',
        title: 'CBD y ansiedad: mecanismos de acción descubiertos',
        excerpt: 'Investigadores identifican cómo el cannabidiol interactúa con receptores de serotonina.',
        date: '16 Mar 2023',
        readTime: '4 min',
        featured: true
      },
      {
        id: 103,
        category: 'SALUD',
        title: 'Cannabis en cuidados paliativos: mejora calidad de vida',
        excerpt: 'Estudio multicéntrico confirma beneficios en pacientes oncológicos.',
        date: '14 Mar 2023',
        readTime: '3 min',
        featured: false
      }
    ],
    Ciencia: [
      {
        id: 201,
        category: 'CIENCIA',
        title: 'Descubren nuevo cannabinoide con propiedades antiinflamatorias',
        excerpt: 'Investigadores aíslan CBDA-A, un compuesto con potencia 30 veces mayor que CBD convencional.',
        date: '20 Mar 2023',
        readTime: '7 min',
        featured: true,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 202,
        category: 'CIENCIA',
        title: 'Avances en la síntesis artificial de cannabinoides',
        excerpt: 'Nueva técnica permite producción sostenible sin necesidad de cultivo extensivo.',
        date: '17 Mar 2023',
        readTime: '5 min',
        featured: true
      },
      {
        id: 203,
        category: 'CIENCIA',
        title: 'Estudio genético revela variedades de cannabis con mayor potencial medicinal',
        excerpt: 'Secuenciación completa de 100 variedades identifica marcadores genéticos clave.',
        date: '13 Mar 2023',
        readTime: '6 min',
        featured: false
      }
    ],
    Legislación: [
      {
        id: 301,
        category: 'LEGISLACIÓN',
        title: 'Reforma legal permitirá autocultivo en México',
        excerpt: 'Senado aprueba modificación a ley general de salud para uso personal.',
        date: '19 Mar 2023',
        readTime: '4 min',
        featured: true,
        image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 302,
        category: 'LEGISLACIÓN',
        title: 'UE armoniza regulación de cannabis medicinal',
        excerpt: 'Nueva directiva establece estándares comunes para los 27 países miembros.',
        date: '15 Mar 2023',
        readTime: '5 min',
        featured: true
      }
    ],
    Cultivo: [
      {
        id: 401,
        category: 'CULTIVO',
        title: 'Nuevas técnicas de cultivo sostenible aumentan rendimiento 40%',
        excerpt: 'Sistemas aeropónicos reducen consumo de agua y aumentan producción de cannabinoides.',
        date: '22 Mar 2023',
        readTime: '6 min',
        featured: true,
        image: 'https://images.unsplash.com/photo-1511984804822-e16ba72fcf8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 402,
        category: 'CULTIVO',
        title: 'Guía completa para cultivo orgánico de cannabis medicinal',
        excerpt: 'Especialistas comparten técnicas certificadas para producción sin pesticidas.',
        date: '18 Mar 2023',
        readTime: '8 min',
        featured: true
      }
    ],
    Eventos: [
      {
        id: 501,
        category: 'EVENTOS',
        title: 'Expo Cannabis Argentina 2023: Todo lo que necesitas saber',
        excerpt: 'La feria más importante de Latinoamérica reunirá a expertos, pacientes y emprendedores.',
        date: '25 Mar 2023',
        readTime: '4 min',
        featured: true,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    Comunidad: [
      {
        id: 601,
        category: 'COMUNIDAD',
        title: 'Red de apoyo para pacientes: testimonios de sanación',
        excerpt: 'Comunidades locales comparten experiencias y recursos para acceder a tratamientos.',
        date: '21 Mar 2023',
        readTime: '5 min',
        featured: true,
        image: 'https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  };
  
  // Noticias laterales por categoría
  const allSideNewsData = {
    Portada: [
      { id: 1, title: 'Chile organiza primera feria internacional de cannabis medicinal', category: 'EVENTOS', date: 'Hoy' },
      { id: 2, title: 'APIDC lanza nuevo programa de capacitación', category: 'EDUCACIÓN', date: 'Ayer' },
      { id: 3, title: 'Estudio: CBD reduce ansiedad en pacientes oncológicos', category: 'INVESTIGACIÓN', date: '14 Mar' },
      { id: 4, title: 'Argentina aprueba nuevo medicamento a base de cannabis', category: 'SALUD', date: '13 Mar' },
      { id: 5, title: 'Foro internacional debate regulación del cannabis recreativo', category: 'POLÍTICA', date: '12 Mar' }
    ],
    Salud: [
      { id: 11, title: 'Nuevo protocolo para uso de cannabis en fibromialgia', category: 'SALUD', date: 'Hoy' },
      { id: 12, title: 'Guía actualizada: Dosis terapéuticas de CBD', category: 'SALUD', date: 'Ayer' },
      { id: 13, title: 'Hospitales incorporan cannabis en protocolos de dolor', category: 'SALUD', date: '17 Mar' },
      { id: 14, title: 'Estudio: Cannabis reduce uso de opioides en 45%', category: 'SALUD', date: '16 Mar' },
      { id: 15, title: 'Testimonios: Pacientes comparten sus experiencias', category: 'SALUD', date: '15 Mar' }
    ],
    Ciencia: [
      { id: 21, title: 'Descubren 3 nuevos cannabinoides en variedad autóctona', category: 'CIENCIA', date: 'Hoy' },
      { id: 22, title: 'Avances en investigación de cannabis y Alzheimer', category: 'CIENCIA', date: '19 Mar' },
      { id: 23, title: 'Nuevo método para medir potencia de cannabinoides', category: 'CIENCIA', date: '18 Mar' },
      { id: 24, title: 'Estudio: THC medicinal no afecta capacidades cognitivas', category: 'CIENCIA', date: '17 Mar' },
      { id: 25, title: 'Investigación sobre cannabis y enfermedades autoinmunes', category: 'CIENCIA', date: '16 Mar' }
    ],
    Legislación: [
      { id: 31, title: 'Congreso debate nueva ley de cannabis medicinal', category: 'LEGISLACIÓN', date: 'Hoy' },
      { id: 32, title: 'Regulación: Guía para importación de productos', category: 'LEGISLACIÓN', date: '20 Mar' },
      { id: 33, title: 'Nuevos requisitos para licencias de cultivo', category: 'LEGISLACIÓN', date: '19 Mar' },
      { id: 34, title: 'Análisis: Comparativa legislativa en Latinoamérica', category: 'LEGISLACIÓN', date: '18 Mar' },
      { id: 35, title: 'Reforma tributaria para productos cannábicos', category: 'LEGISLACIÓN', date: '17 Mar' }
    ],
    Cultivo: [
      { id: 41, title: 'Taller: Cultivo orgánico para principiantes', category: 'CULTIVO', date: 'Hoy' },
      { id: 42, title: 'Nuevas semillas certificadas disponibles', category: 'CULTIVO', date: '23 Mar' },
      { id: 43, title: 'Guía: Control de plagas de forma natural', category: 'CULTIVO', date: '22 Mar' },
      { id: 44, title: 'Técnicas de poda para aumentar producción', category: 'CULTIVO', date: '21 Mar' },
      { id: 45, title: 'Certificación orgánica para cultivadores', category: 'CULTIVO', date: '20 Mar' }
    ],
    Eventos: [
      { id: 51, title: 'Webinar gratuito: Cannabis y salud mental', category: 'EVENTOS', date: 'Hoy' },
      { id: 52, title: 'Expo Cannabis: Entradas con descuento', category: 'EVENTOS', date: '24 Mar' },
      { id: 53, title: 'Charla: Uso responsable de cannabis', category: 'EVENTOS', date: '23 Mar' },
      { id: 54, title: 'Workshop: Extracción de aceites medicinales', category: 'EVENTOS', date: '22 Mar' },
      { id: 55, title: 'Feria de emprendedores cannábicos', category: 'EVENTOS', date: '21 Mar' }
    ],
    Comunidad: [
      { id: 61, title: 'Grupo de apoyo: Nuevos miembros bienvenidos', category: 'COMUNIDAD', date: 'Hoy' },
      { id: 62, title: 'Encuesta: Necesidades de la comunidad', category: 'COMUNIDAD', date: '22 Mar' },
      { id: 63, title: 'Voluntariado: Buscamos colaboradores', category: 'COMUNIDAD', date: '21 Mar' },
      { id: 64, title: 'Testimonios: Historias de transformación', category: 'COMUNIDAD', date: '20 Mar' },
      { id: 65, title: 'Foro: Preguntas a expertos', category: 'COMUNIDAD', date: '19 Mar' }
    ]
  };
  
  // Secciones especiales por categoría
  const sectionsData = {
    Portada: [
      {
        id: 1,
        title: 'Cannabis y Salud',
        icon: '💚',
        content: '¿Sabías que el CBD en dosis bajas puede ayudar a reducir la ansiedad sin efectos psicoactivos significativos? Nuevos estudios confirman su potencial terapéutico.',
        link: '#'
      },
      {
        id: 2,
        title: 'Agenda Cannábica',
        icon: '📅',
        content: 'Próximos eventos: Expo Cannabis Argentina (25-27 Mar), Congreso Internacional de Medicina Cannábica (15 Abr), Taller de Cultivo Responsable (5 Abr).',
        link: '#'
      },
      {
        id: 3,
        title: 'Recurso del Mes',
        icon: '🎬',
        content: 'Documental "La planta prohibida" disponible en streaming. Una mirada histórica y científica sobre el cannabis medicinal.',
        link: '#'
      }
    ],
    Salud: [
      {
        id: 1,
        title: 'Guía de Dosificación',
        icon: '💊',
        content: 'Tabla completa de dosificación según condición médica, peso y experiencia previa con cannabis.',
        link: '#'
      },
      {
        id: 2,
        title: 'Interacciones Medicamentosas',
        icon: '⚠️',
        content: 'Información crucial sobre interacciones entre cannabinoides y medicamentos convencionales.',
        link: '#'
      },
      {
        id: 3,
        title: 'Directorio Médico',
        icon: '👨‍⚕️',
        content: 'Lista de profesionales de la salud especializados en cannabis medicinal en tu zona.',
        link: '#'
      }
    ],
    Ciencia: [
      {
        id: 1,
        title: 'Últimas Investigaciones',
        icon: '🔬',
        content: 'Resumen mensual de los estudios científicos más relevantes publicados en revistas indexadas.',
        link: '#'
      },
      {
        id: 2,
        title: 'Glosario Científico',
        icon: '📚',
        content: 'Definiciones claras de términos técnicos relacionados con la investigación cannábica.',
        link: '#'
      },
      {
        id: 3,
        title: 'Metodología de Ensayos',
        icon: '📊',
        content: 'Cómo se diseñan y ejecutan los ensayos clínicos con cannabis: guía para entender los resultados.',
        link: '#'
      }
    ]
  };

const handleCategoryChange = (category) => {
  if (category === activeCategory) {
    // Si ya está activa, no hacemos nada
    return;
  }
  
  setActiveCategory(category);
  
  // Solo hacemos scroll suave si el usuario está muy abajo en la página
  if (window.scrollY > 200) {
    const categoryIndicator = document.querySelector('.category-indicator');
    if (categoryIndicator) {
      const offsetTop = categoryIndicator.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 100, // 100px de margen
        behavior: 'smooth'
      });
    }
  }
};

  // Efecto para filtrar noticias cuando cambia la categoría activa
  useEffect(() => {
    // Obtener noticias principales para la categoría activa
    const mainNews = allNewsData[activeCategory] || [];
    setFilteredMainNews(mainNews);
    
    // Obtener noticias laterales para la categoría activa
    const sideNews = allSideNewsData[activeCategory] || allSideNewsData['Portada'];
    setFilteredSideNews(sideNews);
    
  }, [activeCategory]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Email suscrito:', email);
      setSubscribed(true);
      setEmail('');
      
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  // Obtener secciones especiales para la categoría activa
  const currentSections = sectionsData[activeCategory] || sectionsData['Portada'];

  return (
    <div className="newsletter-page">
      {/* Header tipo periódico */}
      <header className="newsletter-header">
        <div className="header-top">
          <span className="header-date">Febrero 206</span>
         </div>
        
        {/* <div className="header-main">
          <h1 className="header-title">PULSO CANNÁBICO</h1>
          <p className="header-subtitle">Cannabis, salud y comunidad. Lo que pasó, lo que se viene y lo que importa.</p>
        </div> */}
        
        <nav className="header-nav">
          {categories.map((category) => (
            <button 
              key={category}
              className={`nav-link ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </header>

      {/* Contenido principal en columnas */}
      <main className="newsletter-main">
        <div className="container">
          {/* Indicador de categoría activa */}
          <div className="category-indicator">
            <div className="category-badge">
              <span className="badge-text">{activeCategory}</span>
            </div>
            <h2 className="category-title">
              {activeCategory === 'Portada' ? 'Últimas Noticias' : `Noticias de ${activeCategory}`}
            </h2>
            <p className="category-description">
              {activeCategory === 'Portada' 
                ? 'Las noticias más importantes del mundo cannábico' 
                : `Información especializada sobre ${activeCategory.toLowerCase()} y cannabis`}
            </p>
          </div>
  

          <div className="news-columns">
            {/* Columna principal (noticias destacadas) */}
            <div className="main-column">
              {filteredMainNews.length > 0 ? (
                <>
                  <div className="section-label">
                    <span className="label-text">
                      {activeCategory === 'Portada' ? 'NOTICIA DESTACADA' : `NOTICIA DESTACADA DE ${activeCategory.toUpperCase()}`}
                    </span>
                    <div className="label-line"></div>
                  </div>
                  
                  {/* Mostrar la primera noticia como destacada */}
                  <article className="featured-article">
                    {filteredMainNews[0].image && (
                      <div className="featured-image">
                        <img src={filteredMainNews[0].image} alt={filteredMainNews[0].title} />
                        <div className="image-overlay">
                          <span className="image-category">{filteredMainNews[0].category}</span>
                        </div>
                      </div>
                    )}
                    <div className="featured-content">
                      <div className="article-meta">
                        <span className="article-category">{filteredMainNews[0].category}</span>
                        <span className="article-date">{filteredMainNews[0].date}</span>
                        <span className="article-read-time">{filteredMainNews[0].readTime} lectura</span>
                      </div>
                      <h2 className="article-title">{filteredMainNews[0].title}</h2>
                      <p className="article-excerpt">{filteredMainNews[0].excerpt}</p>
                      <div className="article-actions">
                        <a href="#" className="read-more">Leer artículo completo →</a>
                        <div className="article-share">
                          <span>Compartir:</span>
                          <button className="share-btn">📋</button>
                          <button className="share-btn">📧</button>
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Mostrar más noticias si hay más de una */}
                  {filteredMainNews.length > 1 && (
                    <>
                      <div className="section-label">
                        <span className="label-text">MÁS NOTICIAS DE {activeCategory.toUpperCase()}</span>
                        <div className="label-line"></div>
                      </div>
                      
                      <div className="secondary-articles">
                        {filteredMainNews.slice(1).map(news => (
                          <article key={news.id} className="secondary-article">
                            <div className="secondary-content">
                              <div className="article-meta">
                                <span className="article-category">{news.category}</span>
                                <span className="article-date">{news.date}</span>
                              </div>
                              <h3 className="article-title">{news.title}</h3>
                              <p className="article-excerpt">{news.excerpt}</p>
                              <a href="#" className="read-more">Leer más</a>
                            </div>
                          </article>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="no-news-message">
                  <h3>No hay noticias disponibles para esta categoría</h3>
                  <p>Próximamente agregaremos más contenido sobre {activeCategory.toLowerCase()}.</p>
                </div>
              )}

              {/* Secciones especiales */}
              <div className="special-sections">
                {currentSections.map(section => (
                  <div key={section.id} className="special-section">
                    <div className="section-header">
                      <span className="section-icon">{section.icon}</span>
                      <h3>{section.title}</h3>
                    </div>
                    <p>{section.content}</p>
                    <a href={section.link} className="section-link">Explorar →</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna lateral (noticias rápidas) */}
            <div className="side-column">
              <div className="side-header">
                <h3>ÚLTIMAS NOTICIAS</h3>
                <div className="header-line"></div>
              </div>
              
              <div className="breaking-news">
                <div className="breaking-label">ACTUALIDAD</div>
                <div className="breaking-content">
                  <h4>Noticias actualizadas de {activeCategory}</h4>
                  <p>Contenido especializado y de última hora</p>
                </div>
              </div>
              
              <div className="news-list">
                {filteredSideNews.map(news => (
                  <div key={news.id} className="news-item">
                    <div className="news-item-header">
                      <span className="news-category">{news.category}</span>
                      <span className="news-date">{news.date}</span>
                    </div>
                    <h4 className="news-title">{news.title}</h4>
                    <div className="news-item-footer">
                      <a href="#" className="news-link">↗</a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="side-widget">
                <div className="widget-header">
                  <h4>📊 ENCUESTA</h4>
                </div>
                <div className="widget-content">
                  <p>¿Qué tipo de contenido de {activeCategory.toLowerCase()} te interesa más?</p>
                  <div className="poll-options">
                    <button className="poll-btn">Artículos científicos</button>
                    <button className="poll-btn">Guías prácticas</button>
                    <button className="poll-btn">Testimonios</button>
                  </div>
                  <p className="poll-note">Votá y ayudanos a mejorar</p>
                </div>
              </div>
              
              <div className="side-widget">
                <div className="widget-header">
                  <h4>📅 EVENTOS PRÓXIMOS</h4>
                </div>
                <div className="widget-content">
                  <div className="event">
                    <div className="event-date">28 MAR</div>
                    <div className="event-details">
                      <h5>Webinar: {activeCategory} y cannabis</h5>
                      <p>18:00 hs • Online</p>
                    </div>
                  </div>
                  <div className="event">
                    <div className="event-date">5 ABR</div>
                    <div className="event-details">
                      <h5>Feria especializada en {activeCategory.toLowerCase()}</h5>
                      <p>Centro Costa Salguero</p>
                    </div>
                  </div>
                  <a href="#" className="view-all">Ver todos los eventos →</a>
                </div>
              </div>
              
              {/* Widget de categorías */}
              <div className="side-widget">
                <div className="widget-header">
                  <h4>📂 OTRAS CATEGORÍAS</h4>
                </div>
                <div className="widget-content">
                  <div className="categories-list">
                    {categories
                      .filter(cat => cat !== activeCategory)
                      .map(category => (
                        <button
                          key={category}
                          className="category-link"
                          onClick={() => handleCategoryChange(category)}
                        >
                          {category}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="newsletter-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>PULSO CANNÁBICO</h3>
            <p>Información confiable sobre cannabis, salud y comunidad.</p>
            <div className="footer-social">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📧</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>SECCIONES</h4>
              {categories.map(category => (
                <button 
                  key={category}
                  className="footer-nav-link"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="link-column">
              <h4>RECURSOS</h4>
              <a href="#">Estudios científicos</a>
              <a href="#">Guías de uso</a>
              <a href="#">Directorio médico</a>
              <a href="#">Biblioteca</a>
              <a href="#">FAQ</a>
            </div>
            <div className="link-column">
              <h4>APIDC</h4>
              <a href="#">Sobre nosotros</a>
              <a href="#">Proyectos</a>
              <a href="#">Capacitaciones</a>
              <a href="#">Donaciones</a>
              <a href="#">Contacto</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2023 Pulso Cannábico. Todos los derechos reservados. Este newsletter es producido por APIDC.</p>
          <p>La información proporcionada tiene fines educativos y no sustituye el consejo médico profesional.</p>
          <div className="footer-legal">
            <a href="#">Política de privacidad</a>
            <a href="#">Términos de uso</a>
            <a href="#">Archivo de newsletters</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsLetter;