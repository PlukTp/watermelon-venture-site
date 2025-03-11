
import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [googleScriptUrl, setGoogleScriptUrl] = useState(
    localStorage.getItem('googleScriptUrl') || ''
  );
  const [showScriptInput, setShowScriptInput] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const section = document.getElementById('contact-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="contact-section" className="py-24 px-6 bg-gradient-to-b from-trima-50 to-white relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-trima-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-soil-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-trima-100 text-trima-800 border border-trima-200 mb-6">
            <Mail className="h-4 w-4 mr-2 text-trima-600" />
            <span className="text-sm font-medium">ติดต่อเรา</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">มีคำถามหรือต้องการข้อมูลเพิ่มเติม?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ทีมงานของเราพร้อมให้ความช่วยเหลือและตอบคำถามทุกข้อสงสัยของคุณเกี่ยวกับผลิตภัณฑ์ของเรา
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            className={cn(
              "transition-all duration-1000 transform",
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            )}
          >
            <ContactForm 
              googleScriptUrl={googleScriptUrl}
              setGoogleScriptUrl={setGoogleScriptUrl}
              showScriptInput={showScriptInput}
              setShowScriptInput={setShowScriptInput}
            />
          </div>

          {/* Contact Information */}
          <div 
            className={cn(
              "transition-all duration-1000 delay-300 transform",
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            )}
          >
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
