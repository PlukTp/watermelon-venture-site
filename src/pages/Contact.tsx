
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6 bg-gradient-to-b from-trima-50 to-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-trima-600 hover:text-trima-700 mb-8 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              กลับสู่หน้าหลัก
            </Link>
            
            <h1 className="text-5xl font-bold mb-6">ติดต่อเรา</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ทีมงานของเราพร้อมให้ความช่วยเหลือและตอบคำถามทุกข้อสงสัยของคุณ
            </p>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;