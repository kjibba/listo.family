import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AiShowcase from "@/components/AiShowcase";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <AiShowcase />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
