
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SocialProof from '@/components/SocialProof';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      <Hero />
      <Features />
      <SocialProof />
      <Footer />
    </div>
  );
};

export default Index;
