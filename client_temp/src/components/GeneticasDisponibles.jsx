import React from 'react';
import './GeneticasDisponibles.css';

const imagenGenerica =
  'https://res.cloudinary.com/dqgjcfosx/image/upload/v1773073097/pexels-perfect-lens-8334638_ehbcol.jpg';

const geneticas = [
  {
    id: 1,
    nombre: 'Painted Lady',
    tipo: 'CBD',
    disponibilidad: 'Disponible',
    descripcion:
      'Genética de perfil orientado a CBD, con expresión más equilibrada y un carácter suave. Suele destacarse por su perfil aromático noble y una presencia más funcional dentro del catálogo.'
  },
  {
    id: 2,
    nombre: 'Bhutan Glory',
    tipo: 'CBD',
    disponibilidad: 'Disponible',
    descripcion:
      'Variedad de perfil mixto, con una identidad marcada y buena complejidad aromática. Se presenta como una genética versátil, con estructura equilibrada y personalidad definida.'
  },
  {
    id: 3,
    nombre: 'THC',
    tipo: 'Sativa dominante',
    disponibilidad: 'Stock limitado',
    descripcion:
      'Perfil terpénico intenso y expresión más sativa. Se reconoce por su impronta aromática activa, fresca y marcada, con un carácter moderno y bien diferenciado.'
  },
  {
    id: 4,
    nombre: 'Flynn Paff',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Genética de perfil contemporáneo, con una identidad intensa y presencia aromática envolvente. Suele destacar por su combinación de notas dulces, densas y fondo terroso.'
  },
  {
    id: 5,
    nombre: 'Tropical Kush',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Variedad de perfil exótico, con notas tropicales maduras y un fondo kush profundo. Se distingue por su aroma intenso, cálido y persistente, con impronta pesada y resinosa.'
  },
  {
    id: 6,
    nombre: 'Bitter Orange',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Genética de fuerte presencia cítrica, con protagonismo de naranja amarga, frescura y un perfil vibrante. Muy expresiva en nariz, con una identidad aromática filosa y reconocible.'
  },
  {
    id: 7,
    nombre: 'Grasa de Mono',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Variedad de carácter denso y resinoso, con notas profundas, terrosas y un fondo especiado. Se percibe robusta, intensa y de perfil pesado dentro del catálogo.'
  },
  {
    id: 8,
    nombre: 'Peanut Butter Breath',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Genética muy buscada por su perfil complejo, con notas cremosas, terrosas, nuez y fondo kush. Aroma grueso, elegante y persistente, con gran personalidad.'
  },
  {
    id: 9,
    nombre: 'Monkey Mintz x Toronja',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Cruza con perfil fresco y frutado, donde se combinan matices mentolados con el carácter cítrico de la toronja. Presenta una expresión moderna, intensa y bien equilibrada.'
  },
  {
    id: 10,
    nombre: "Mokum's Tulip x Mimosin",
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Cruza de impronta aromática fuerte, floral y cítrica, con una expresión más sativa. Se destaca por su potencia terpénica y una presencia muy viva en nariz.'
  },
  {
    id: 11,
    nombre: 'Zaza',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Genética de perfil moderno, llamativa y de alta intensidad aromática. Suele asociarse a flores vistosas, dulzor marcado y una presencia premium dentro del catálogo.'
  },
  {
    id: 12,
    nombre: 'Choco OG',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Variedad con fondo OG y matices tostados que recuerdan a cacao, madera y tierra húmeda. Perfil clásico, profundo y envolvente, con impronta kush bien definida.'
  },
  {
    id: 13,
    nombre: 'Business Key',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Genética de perfil elegante, con presencia aromática compleja y estructura bien armada. Se muestra como una variedad moderna, sólida y con carácter propio.'
  },
  {
    id: 14,
    nombre: 'Gorila Glue x Sunset Sherbet',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Cruza que une densidad resinosa con un costado dulce y cremoso. Combina notas intensas, terrosas y golosas, con una expresión muy atractiva y moderna.'
  },
  {
    id: 15,
    nombre: 'Runtz x Layercake',
    tipo: 'THC',
    disponibilidad: 'Disponible',
    descripcion:
      'Variedad de perfil dulce, postre y muy expresivo. Su identidad suele ir hacia notas cremosas, frutales y pesadas, con una presencia comercial fuerte.'
  },
  {
    id: 16,
    nombre: 'Banana Mac',
    tipo: 'Híbrida frutada',
    disponibilidad: 'Disponible',
    descripcion:
      'Genética con perfil frutal marcado, donde aparecen notas de banana madura, crema y fondo intenso. Muy aromática, moderna y de carácter llamativo.'
  },
  {
    id: 17,
    nombre: 'Red Monster',
    tipo: 'Híbrida potente',
    disponibilidad: 'Disponible',
    descripcion:
      'Variedad de gran presencia visual y aromática, con un perfil robusto, profundo y dominante. Se percibe intensa, compacta y de fuerte personalidad.'
  }
];

const GeneticasDisponibles = () => {
  return (
    <section className="genetics-section">
      <div className="genetics-container">
        <h1 className="genetics-title">Genéticas disponibles</h1>
        <p className="genetics-subtitle">
          Espacio exclusivo para socios APIDC.
        </p>

        <div className="genetics-grid">
          {geneticas.map((genetica) => (
            <article key={genetica.id} className="genetics-card">
              <div className="card-image-wrapper">
                <img
                  src={imagenGenerica}
                  alt={genetica.nombre}
                  className="card-image"
                />
              </div>

              <div className="card-content">
                <h3 className="card-title">{genetica.nombre}</h3>

                <div className="card-detail">
                  <span className="detail-label">Tipo:</span>
                  <span>{genetica.tipo}</span>
                </div>

                <div className="card-detail">
                  <span className="detail-label">Estado:</span>
                  <span
                    className={`status-badge status-${genetica.disponibilidad
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    {genetica.disponibilidad}
                  </span>
                </div>

                <p className="card-description">{genetica.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeneticasDisponibles;