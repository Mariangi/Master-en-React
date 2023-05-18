import React from 'react'

export const Curriculum = () => {
  return (
    <div className='page'>
      <h2>Curriculum</h2>
    
      <section className='wrap-curriculum'>
        <div>
          <article>
            <h2>Precentacion</h2>
            <p>Soy programadora, estoy buscando
                mi primera experiencia laboral en el
                mundo de la programación. Tengo una
                gran predisposición para trabajar en
                equipo, soy dedicada, responsable y
                me gusta aprender. Estoy abierta a
                nuevas experiencias y desafíos. Busco
                crecer profesional y personalmente.
            </p>
          </article>
          <article>
            <h2>Preparacion Academica</h2>
            <p>Un año y medio de la Tecnicatura Universitaria en
                Desarrollo de Aplicaciones Informáticas en la Universidad
                Nacional Del Centro de la Provincia de Buenos Aires.
                Actualmente continúo adquiriendo habilidades y
                conocimiento como autodidacta.
            </p>
          </article>
        </div>
        <div>
          <article>
            <h2>Lenguajes</h2>
            <div>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>Node.js</li>
                <li>JAVA <p className='aclaracion'>(POO)</p></li>
              </ul>  
              <ul>  
                <li>PHP <p className='aclaracion'>(conocimientos en MVC y Smarty)</p></li>
                <li>SQL <p className='aclaracion'>(conocimientos en PosgresSQL, MySQL y mongoDB)</p></li>
                <li>JavaScript <p className='aclaracion'>(conocimientos en AJAX, SPA, API Rest y Partial Render)</p></li>
              </ul>
            </div>
          </article>

          <article>
            <h2>Manejo de herramientas</h2>
            <ul>
              <li>Git</li>
              <li>Postman</li>
              <li>DataGrip</li>
              <li>VirtualBox</li>
              <li>Draw.io</li>
              <li>WordPress</li>
              <li>Figma</li>
              <li>Trello</li>
              <li>Photoshop</li>
              <li>Excel</li>
              <li>Word</li>
              <li>Power Point</li>
            </ul>
          </article>
        </div>
        <div>
          <article>
            <h2>Frameworks</h2>
            <ul>
              <li>Vue</li>
              <li>Sass</li>
              <li>React</li>
              <li>Less</li>
              <li>Bootstrap</li>
              <li>Express</li>
            </ul>
          </article>

          <article>
            <h2>Idiomas</h2>
            <ul>
              <li>Español</li>
              <li>Ingles</li>
            </ul>
          </article>
        </div>
          
          
      </section>
    </div>
  )
}
