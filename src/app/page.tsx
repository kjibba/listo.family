import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StoreModeShowcase from "@/components/StoreModeShowcase";
import HowItWorks from "@/components/HowItWorks";
import IosWaitlist from "@/components/IosWaitlist";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import BlogPreview from "@/components/BlogPreview";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <StoreModeShowcase />
      <HowItWorks />
      <IosWaitlist />
      <Testimonials />
      <Pricing />
      <BlogPreview />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
