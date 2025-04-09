import React, { useEffect } from "react";
import "./TermsAndPrivacy.css";

const TermsAndPrivacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Política de Privacidad y Términos de Servicio | APIDC";
  }, []);
  
  return (
    <main className="terms-privacy-container">
      <h1>Política de Privacidad y Términos de Servicio</h1>

      <section className="privacy-policy">
        <h2>Política de Privacidad</h2>
        <p>
          En APIDC, nos comprometemos a proteger tu privacidad y asegurar que tu
          experiencia con nosotros sea segura y confiable. Esta Política de
          Privacidad describe cómo recopilamos, usamos y protegemos tus datos
          personales.
        </p>

        <h3>1. Información que Recopilamos</h3>
        <p>
          Recopilamos información personal que decides proporcionarnos al
          registrarte o comunicarte con nosotros. Esto puede incluir tu nombre,
          número de teléfono, correo electrónico y cualquier otra información
          relevante para nuestros servicios.
        </p>

        <h3>2. Uso de la Información</h3>
        <p>Utilizamos tus datos para:</p>
        <ul>
          <li>
            Proporcionar información sobre nuestros servicios de cannabis
            medicinal.
          </li>
          <li>
            Facilitar la comunicación y coordinación a través de WhatsApp.
          </li>
          <li>
            Enviarte actualizaciones sobre nuestras actividades, eventos o
            avances en la asociación.
          </li>
        </ul>

        <h3>3. Protección de Datos</h3>
        <p>
          Implementamos medidas de seguridad para proteger tus datos personales
          de accesos no autorizados o divulgación indebida. Sin embargo, ten en
          cuenta que ningún sistema de transmisión o almacenamiento de datos es
          100% seguro.
        </p>

        <h3>4. Cookies y Tecnologías de Seguimiento</h3>
        <p>
          En nuestro sitio web, utilizamos cookies para mejorar tu experiencia.
          Estas cookies nos permiten analizar el tráfico web y personalizar la
          información mostrada. Si no deseas que se usen cookies, puedes
          configurarlas en tu navegador.
        </p>

        <h3>5. Derechos del Usuario</h3>
        <p>
          Como usuario, tienes el derecho a acceder, corregir o eliminar tus
          datos personales en cualquier momento. Si deseas ejercer estos
          derechos, contáctanos a través de los medios disponibles.
        </p>
      </section>

      <section className="terms-of-service">
        <h2>Términos de Servicio</h2>
        <p>
          Estos términos y condiciones regulan el uso de los servicios ofrecidos
          por APIDC, una organización sin fines de lucro dedicada a la
          investigación y cultivo de cannabis medicinal. Al registrarte o
          utilizar nuestros servicios, aceptas cumplir con estos términos.
        </p>

        <h3>1. Uso de los Servicios</h3>
        <p>
          APIDC ofrece servicios relacionados con el cultivo y distribución de
          cannabis medicinal a pacientes y miembros de la comunidad. El contacto
          con nosotros se realiza principalmente a través de WhatsApp, donde
          proporcionamos información sobre el proceso y condiciones para acceder
          al cultivo de cannabis medicinal.
        </p>

        <h3>2. Legalidad</h3>
        <p>
          El acceso y uso de nuestros servicios está sujeto a las leyes locales
          y nacionales relacionadas con el cultivo y uso de cannabis medicinal.
          El usuario debe asegurarse de que cumple con todas las leyes vigentes
          en su país o región.
        </p>

        <h3>3. Responsabilidad</h3>
        <p>
          APIDC no se hace responsable del uso indebido de los productos que
          distribuimos, ni de las consecuencias derivadas de su consumo.
          Recomendamos siempre consultar con un profesional médico antes de
          utilizar cualquier producto relacionado con cannabis medicinal.
        </p>

        <h3>4. Modificaciones en los Términos</h3>
        <p>
          Nos reservamos el derecho de modificar estos términos de servicio en
          cualquier momento. Las modificaciones serán publicadas en esta página,
          y es responsabilidad del usuario revisar regularmente estos términos
          para estar al tanto de cualquier cambio.
        </p>

        <h3>5. Contacto</h3>
        <p>
          Si tienes preguntas sobre nuestra política de privacidad o los
          términos de servicio, no dudes en contactarnos a través de los canales
          de comunicación disponibles, como WhatsApp o correo electrónico.
        </p>
      </section>
    </main>
  );
};

export default TermsAndPrivacy;
