import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contacto | Pablo Cebrián",
};

export default function VersionBlancoContactoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 pb-24">
        <p className="font-display italic text-lg sm:text-xl text-foreground/85 text-center mb-12">
          &ldquo;Hago, produzco, toco y escucho canciones.&rdquo;
        </p>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
