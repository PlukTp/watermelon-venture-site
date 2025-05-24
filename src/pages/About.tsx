import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sprout, Award, Star, Users, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AboutPage = () => {
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
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const features = [
    {
      icon: <Sprout className="h-10 w-10 text-trima-600" />,
      title: "พันธุ์คุณภาพ",
      description:
        "เมล็ดพันธุ์ของเราผ่านการคัดสรรและทดสอบอย่างพิถีพิถันเพื่อให้ได้ผลผลิตที่ดีที่สุด",
    },
    {
      icon: <Award className="h-10 w-10 text-trima-600" />,
      title: "รับรองมาตรฐาน",
      description:
        "ผลิตภัณฑ์ของเราได้รับการรับรองมาตรฐานทางการเกษตรที่เป็นที่ยอมรับในระดับประเทศ",
    },
    {
      icon: <Star className="h-10 w-10 text-trima-600" />,
      title: "นวัตกรรมใหม่",
      description:
        "เรามุ่งมั่นในการวิจัยและพัฒนาสายพันธุ์ใหม่ที่ให้ผลผลิตสูงและทนทานต่อสภาพแวดล้อม",
    },
    {
      icon: <Users className="h-10 w-10 text-trima-600" />,
      title: "บริการที่ใส่ใจ",
      description:
        "ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาและบริการหลังการขายที่ดีเยี่ยม",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-trima-50 to-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-trima-50 rounded-full blur-3xl opacity-50 -z-10"></div>

        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-left mb-4">
              <Link
                to="/"
                className="inline-flex items-center text-trima-600 hover:text-trima-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                กลับสู่หน้าหลัก
              </Link>
            </div>

            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-trima-100 text-trima-800 border border-trima-200">
                <Sprout className="h-4 w-4 mr-2 text-trima-600" />
                <span className="text-sm font-medium">เกี่ยวกับเรา</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-6">
              เราคือผู้เชี่ยวชาญด้านเมล็ดพันธุ์คุณภาพ
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              โกรเวอร์แพลนท์เป็นผู้นำในการวิจัย พัฒนา
              และจำหน่ายเมล็ดพันธุ์คุณภาพสูงสำหรับแตงโม พริก และเมล่อน มานานกว่า
              10 ปี เรามุ่งมั่นที่จะนำเสนอสายพันธุ์ที่ดีที่สุดเพื่อเกษตรกรไทย
            </p>
          </div>
        </div>
      </section>

      <section
        id="about-section"
        className="py-24 px-6 bg-white relative overflow-hidden"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-20">
            <div
              className={`w-full lg:w-1/2 transition-all duration-1000 transform ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
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
                      <p className="text-sm text-muted-foreground">
                        ประสบการณ์ในการพัฒนาและจำหน่ายเมล็ดพันธุ์คุณภาพ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`w-full lg:w-1/2 transition-all duration-1000 transform ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <h2 className="text-4xl font-bold mb-6">ภารกิจของเรา</h2>

              <p className="text-lg text-muted-foreground mb-6">
                เรามุ่งมั่นที่จะเป็นผู้นำในการผลิตและจัดจำหน่ายเมล็ดพันธุ์คุณภาพสูง
                เพื่อสนับสนุนเกษตรกรไทยให้ได้ผลผลิตที่ดีและมีคุณภาพ
              </p>

              <p className="text-lg text-muted-foreground mb-8">
                ด้วยเทคโนโลยีการเพาะพันธุ์ที่ทันสมัยและการวิจัยพัฒนาอย่างต่อเนื่อง
                เราจึงสามารถผลิตเมล็ดพันธุ์ที่มีความแข็งแรง
                ทนทานต่อโรคและศัตรูพืช และให้ผลผลิตสูง
              </p>

              <Link
                to="/products"
                className={cn(
                  "inline-flex items-center justify-center px-6 py-3 text-base",
                  "bg-trima-600 text-white rounded-lg font-medium",
                  "transition-custom shadow-sm hover:shadow-md hover:bg-trima-700",
                  "hover-scale"
                )}
              >
                ดูสินค้าของเรา
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "text-center p-6 bg-white rounded-xl shadow-sm border border-trima-100",
                  "transform transition-all duration-700 hover:shadow-md",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                  `delay-${index * 100}`
                )}
              >
                <div className="bg-trima-50 p-4 rounded-full w-fit mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">ค่านิยมของเรา</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-trima-600">
                  คุณภาพ
                </h3>
                <p className="text-muted-foreground">
                  เราใส่ใจในทุกขั้นตอนการผลิตเพื่อให้ได้เมล็ดพันธุ์คุณภาพสูงสุด
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-trima-600">
                  นวัตกรรม
                </h3>
                <p className="text-muted-foreground">
                  เรานำเทคโนโลยีใหม่ๆ มาพัฒนาพันธุ์พืชให้ดีขึ้นอย่างต่อเนื่อง
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-trima-600">
                  ความไว้วางใจ
                </h3>
                <p className="text-muted-foreground">
                  เราสร้างความมั่นใจให้เกษตรกรด้วยผลิตภัณฑ์และบริการที่เชื่อถือได้
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
