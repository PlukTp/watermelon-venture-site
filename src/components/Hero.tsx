
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        // Parallax effect
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.15}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background image with parallax effect */}
      <div 
        ref={heroRef} 
        className="absolute inset-0 -z-10 bg-gradient-to-b from-trima-50 to-white"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[url('/images/DJI_0006.JPG')] bg-cover bg-center opacity-10"></div>
      </div>

      {/* Hero content */}
      <div className="container max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-3xl animation-delay-200 animate-fade-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-trima-100 text-trima-800 border border-trima-200 mb-6">
            <Leaf className="h-4 w-4 mr-2 text-trima-600" />
            <span className="text-sm font-medium">เมล็ดพันธุ์คุณภาพดีที่สุด</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight mb-6 text-shadow">
            เมล็ดพันธุ์คุณภาพ จาก<span className="text-trima-600">โกรเวอร์ แพลนท์</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
            เรานำเสนอเมล็ดพันธุ์คุณภาพสูงสำหรับแตงโม พริก และเมล่อน ที่ผ่านการคัดสรรมาอย่างดีเพื่อผลผลิตที่ดีที่สุดสำหรับเกษตรกร
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products" 
              className={cn(
                "inline-flex items-center justify-center px-8 py-4 text-lg",
                "bg-trima-600 text-white rounded-lg font-medium",
                "transition-custom shadow-sm hover:shadow-md hover:bg-trima-700",
                "hover-scale"
              )}
            >
              ดูสินค้าของเรา
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link 
              to="/contact" 
              className={cn(
                "inline-flex items-center justify-center px-8 py-4 text-lg",
                "bg-white text-trima-700 rounded-lg font-medium",
                "border border-trima-200 transition-custom",
                "hover:bg-trima-50 hover:border-trima-300",
                "hover-scale"
              )}
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent -z-10"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-trima-100 rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-soil-100 rounded-full blur-3xl opacity-40 -z-10"></div>
    </section>
  );
};

export default Hero;
