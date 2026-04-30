import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import Features from "@/components/landing/Features";
import PricingSection from "@/components/landing/PricingSection";
import OutcomeSection from "@/components/landing/OutcomeSection";
import TrustChips from "@/components/landing/TrustChips";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <div className="space-y-0">
        <ProblemSection />
        <Features />
        <OutcomeSection />
        <PricingSection />
        <TrustChips />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
