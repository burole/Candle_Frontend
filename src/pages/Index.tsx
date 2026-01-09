import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CPFConsultForm from "@/components/CPFConsultForm";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <CPFConsultForm />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
