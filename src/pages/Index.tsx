
import { useEffect } from 'react';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Update page title
    document.title = "ตรีมาเขียว - เมล็ดพันธุ์คุณภาพสำหรับเกษตรกรไทย";
  }, []);

  return (
    
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <ProductShowcase />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
