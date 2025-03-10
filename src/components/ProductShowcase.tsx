
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard, { ProductProps } from './ProductCard';

const products: ProductProps[] = [
  {
    id: "watermelon-1",
    name: "เมล็ดแตงโมพันธุ์หวานฉ่ำ",
    description: "เมล็ดแตงโมคุณภาพสูง ให้ผลผลิตที่หวานฉ่ำ เนื้อแน่น สีแดงสด เหมาะสำหรับการเพาะปลูกในทุกภูมิภาค",
    image: "https://www.disthai.com/images/editor/%E0%B9%81%E0%B8%95%E0%B8%87%E0%B9%82%E0%B8%A14.jpg",
    category: "แตงโม",
    popular: true,
  },
  {
    id: "pepper-1",
    name: "เมล็ดพริกพันธุ์เผ็ดจัด",
    description: "เมล็ดพริกที่ให้ความเผ็ดจัดถึงใจ ทนทานต่อโรค ให้ผลผลิตสูง เก็บเกี่ยวได้นาน",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "พริก",
    popular: true,
  },
  {
    id: "melon-1",
    name: "เมล็ดเมล่อนพันธุ์หอมหวาน",
    description: "เมล็ดเมล่อนคุณภาพดี ให้ผลผลิตที่หอมหวาน เนื้อนุ่ม ละมุน เหมาะสำหรับการเพาะปลูกเชิงพาณิชย์",
    image: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "เมล่อน",
  },
];

const ProductShowcase = () => {
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

    const section = document.getElementById('product-showcase');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="product-showcase" className="py-24 px-6 bg-gradient-to-b from-white to-trima-50">
      <div className="container max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-4">สินค้าของเรา</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            เมล็ดพันธุ์คุณภาพสูงที่คัดสรรมาเพื่อเกษตรกรไทย ให้ผลผลิตที่ดีที่สุด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`transition-all duration-700 delay-${index * 100} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link 
            to="/products" 
            className="inline-flex items-center font-medium text-trima-600 hover:text-trima-800 transition-colors"
          >
            ดูสินค้าทั้งหมด
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
