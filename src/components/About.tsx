
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sprout, Award, Star, Users } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.getElementById('about-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const features = [
    {
      icon: <Sprout className="h-10 w-10 text-trima-600" />,
      title: "พันธุ์คุณภาพ",
      description: "เมล็ดพันธุ์ของเราผ่านการคัดสรรและทดสอบอย่างพิถีพิถันเพื่อให้ได้ผลผลิตที่ดีที่สุด"
    },
    {
      icon: <Award className="h-10 w-10 text-trima-600" />,
      title: "รับรองมาตรฐาน",
      description: "ผลิตภัณฑ์ของเราได้รับการรับรองมาตรฐานทางการเกษตรที่เป็นที่ยอมรับในระดับประเทศ"
    },
    {
      icon: <Star className="h-10 w-10 text-trima-600" />,
      title: "นวัตกรรมใหม่",
      description: "เรามุ่งมั่นในการวิจัยและพัฒนาสายพันธุ์ใหม่ที่ให้ผลผลิตสูงและทนทานต่อสภาพแวดล้อม"
    },
    {
      icon: <Users className="h-10 w-10 text-trima-600" />,
      title: "บริการที่ใส่ใจ",
      description: "ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาและบริการหลังการขายที่ดีเยี่ยม"
    }
  ];

  return (
    <section id="about-section" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-trima-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-soil-50 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative">
              <div className="bg-gradient-to-tr from-trima-600 to-trima-400 rounded-3xl h-[500px] overflow-hidden shadow-xl">
                <img 
                  src="/images/d6ffddd0cb7e9e399362cb6873177bba_t.jpeg" 
                  alt="ฟาร์มโกรเวอร์แพลนท์" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg glass max-w-xs">
                <div className="flex items-start gap-4">
                  <div className="bg-trima-100 p-3 rounded-full">
                    <Sprout className="h-6 w-6 text-trima-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">10+ ปี</h4>
                    <p className="text-sm text-muted-foreground">ประสบการณ์ในการพัฒนาและจำหน่ายเมล็ดพันธุ์คุณภาพ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-trima-100 text-trima-800 border border-trima-200 mb-6">
              <Sprout className="h-4 w-4 mr-2 text-trima-600" />
              <span className="text-sm font-medium">เกี่ยวกับเรา</span>
            </div>

            <h2 className="text-4xl font-bold mb-6">เราคือผู้เชี่ยวชาญด้านเมล็ดพันธุ์คุณภาพ</h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              ตรีมาเขียวเป็นผู้นำในการวิจัย พัฒนา และจำหน่ายเมล็ดพันธุ์คุณภาพสูงสำหรับแตงโม พริก และเมล่อน 
              มานานกว่า 10 ปี เรามุ่งมั่นที่จะนำเสนอสายพันธุ์ที่ดีที่สุดเพื่อเกษตรกรไทย
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex flex-col gap-3",
                    "transform transition-all duration-700",
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                    `delay-${index * 100}`
                  )}
                >
                  <div className="bg-trima-50 p-3 rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <Link 
              to="/about" 
              className={cn(
                "inline-flex items-center justify-center px-6 py-3 text-base",
                "bg-trima-600 text-white rounded-lg font-medium",
                "transition-custom shadow-sm hover:shadow-md hover:bg-trima-700",
                "hover-scale mt-4"
              )}
            >
              เรียนรู้เพิ่มเติมเกี่ยวกับเรา
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
