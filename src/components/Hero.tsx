
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-dark-primary py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-dark-secondary border border-border-dark rounded-full mb-8">
            <span className="text-tech-green text-sm font-medium">🚀 Trusted by 500+ companies</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            AI-Powered
            <span className="text-tech-green"> Technical </span>
            Interviews
          </h1>

          {/* Subtext */}
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Streamline your technical recruitment process with intelligent coding assessments, 
            real-time collaboration, and AI-driven candidate analysis.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold px-8 py-4 text-lg group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border-dark text-text-primary hover:bg-dark-secondary px-8 py-4 text-lg"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-dark-secondary border border-border-dark rounded-lg p-6 shadow-2xl">
              {/* Mock Terminal Window */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-tech-green rounded-full"></div>
                <span className="text-text-secondary text-sm ml-4 font-mono">interview-session.js</span>
              </div>
              
              {/* Mock Code */}
              <div className="text-left font-mono text-sm">
                <div className="text-text-secondary mb-2">// Real-time collaborative coding</div>
                <div className="text-blue-400">function <span className="text-tech-green">findOptimalSolution</span>() {</div>
                <div className="text-text-secondary ml-4">// Candidate writes code here...</div>
                <div className="text-yellow-400 ml-4">return <span className="text-tech-green">algorithmicApproach</span>();</div>
                <div className="text-blue-400">}</div>
                
                <div className="mt-4 p-3 bg-tech-green/10 border-l-4 border-tech-green rounded-r">
                  <span className="text-tech-green text-xs">✓ AI Analysis: Excellent time complexity - O(n log n)</span>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-tech-green text-dark-primary px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              Live Session
            </div>
            <div className="absolute -bottom-4 -left-4 bg-dark-secondary border border-border-dark px-4 py-2 rounded-lg text-text-secondary text-sm">
              <span className="text-tech-green">●</span> Recording in progress
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
