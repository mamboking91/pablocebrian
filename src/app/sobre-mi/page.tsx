import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Sobre mí | Pablo Cebrián",
};

function K({ children }: { children: React.ReactNode }) {
  return <strong className="text-accent font-semibold">{children}</strong>;
}

export default function SobreMiPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-[400px_1fr] gap-10 md:gap-16 items-start">
          <div className="relative w-full aspect-[4/5] bg-background-elevated border border-border overflow-hidden">
            <Image
              src="/pablo-cebrian-sobre-mi.jpg"
              alt="Pablo Cebrián"
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-5 text-[15px] sm:text-base leading-relaxed text-foreground/85 text-center">
            <p>
              Soy un músico, compositor y productor canario afincado en
              Madrid desde 2001. Mi relación con la música comenzó desde muy
              joven, pero mi primer trabajo profesional llegó a los 19
              años, cuando el productor canario <K>Kike Perdomo</K> me dio
              la oportunidad de colaborar como guitarrista y autor en uno
              de los discos que estaba produciendo.
            </p>

            <p>
              Aquella experiencia marcó el inicio de un camino que
              continuó en los estudios Multitrack de <K>Paco Chinea</K>,
              donde desempeñé múltiples funciones: técnico de sonido,
              guitarrista, programador y productor. Fue una etapa
              apasionante, coincidiendo con la revolución de la
              informática musical, que me permitió desarrollar una visión
              amplia y profunda del proceso creativo y de producción.
            </p>

            <p>
              Poco después me trasladé a Madrid junto a <K>Iván Mur</K>{" "}
              para perseguir nuestro sueño con <K>Fábula</K>. Gracias al
              apoyo y la confianza del mánager <K>Vicente Mañó</K>,
              conseguimos fichar por <K>Warner Music</K>. Durante esa
              etapa publicamos dos álbumes y ofrecimos más de 80
              conciertos, entre ellos una gira por toda España como
              teloneros de la mítica banda estadounidense <K>R.E.M.</K>
            </p>

            <p>
              Tras la disolución de Fábula en 2008, decidí dar un paso
              atrás en los escenarios para centrarme en dos de mis
              grandes pasiones: la composición y la producción musical.
              Desde entonces, he tenido la oportunidad de trabajar con
              algunos de los artistas más relevantes del panorama
              nacional e internacional, desarrollando una carrera marcada
              por la búsqueda constante de la belleza y la autenticidad.
            </p>

            <p>
              He sido nominado en cinco ocasiones a los{" "}
              <K>Latin Grammy</K> y he participado en proyectos
              reconocidos con <K>Premios Ondas</K>, además de recibir el
              premio a la Mejor Canción en los{" "}
              <K>Premios 40 Principales</K>, el <K>Premio Apolo</K> a la
              Mejor Sintonía de Televisión y el{" "}
              <K>Premio Click &amp; Roll</K> al Mejor Productor, entre
              otros reconocimientos. Mis producciones y composiciones han
              alcanzado múltiples discos de platino, consolidando una
              trayectoria que combina el éxito comercial con el
              compromiso creativo.
            </p>

            <p>
              A lo largo de los años he compaginado mi labor como
              productor y compositor con la dirección artística de
              grandes eventos musicales. Tuve el honor de ser director
              artístico de la visita del <K>Papa León XIV</K> a España,
              coordinando la producción del evento junto a{" "}
              <K>Javier Llano</K> y participando en la composición y
              produciendo el himno oficial, <K>«Alza la Mirada»</K>,
              concebido como el eje musical y emocional de una
              celebración histórica.
            </p>

            <p>
              Asimismo, tuve la oportunidad de dirigir artísticamente,
              junto a <K>Carlos Narea</K>, la gala de los Latin Grammy
              dedicada a la celebración de Andalucía. También he dirigido
              el concierto del 30.º aniversario de <K>Cadena 100</K> en
              el Estadio Wanda Metropolitano, así como numerosas
              ediciones de <K>Por Ellas</K>, uno de los eventos benéficos
              más importantes del panorama musical en España. También
              dirigí artísticamente la tercera edición de Los Premios de
              la Academia de la Música española en el año 2026.
            </p>

            <p>
              En 2022 fundé <K>Halley Music</K>, un hub artístico de
              referencia en Madrid concebido como un espacio para la
              creación, la colaboración y el encuentro entre artistas.
              Con nueve estudios de grabación y un enfoque profundamente
              humano, Halley Music se ha convertido en un punto de
              encuentro para compositores, productores e intérpretes que
              buscan desarrollar su trabajo en un entorno cercano,
              inspirador y al servicio de la música.
            </p>

            <p>
              Más de dos décadas después de mi llegada a Madrid, sigo
              afrontando cada proyecto con la misma ilusión que aquel
              joven de 19 años que entró por primera vez en un estudio de
              grabación convencido de que la música sería el viaje de su
              vida.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
