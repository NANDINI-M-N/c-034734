
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-dark-primary py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center animate-fade-in">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            AI-Powered
            <span className="block text-tech-green">Technical Interviews</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline your technical recruitment with real-time code collaboration, 
            AI-powered candidate analysis, and seamless video interviews.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold px-8 py-4 text-lg group transition-all duration-200"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-border-dark text-text-primary hover:bg-dark-secondary px-8 py-4 text-lg group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-green mb-2">10k+</div>
              <div className="text-text-secondary">Interviews Conducted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-green mb-2">500+</div>
              <div className="text-text-secondary">Companies Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-green mb-2">95%</div>
              <div className="text-text-secondary">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-primary via-dark-primary/95 to-dark-secondary pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-tech-green/5 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;
