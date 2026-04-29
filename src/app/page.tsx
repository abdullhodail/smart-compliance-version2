import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import StatsStrip from "@/components/landing/StatsStrip";
import TrustChips from "@/components/landing/TrustChips";
import Features from "@/components/landing/Features";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div id="about">
        <Hero />
      </div>
      <StatsStrip />
      <TrustChips />
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        {/* We can add a pricing section here later or just point to footer for now */}
      </div>
      <Footer />
    </main>
  );
}
