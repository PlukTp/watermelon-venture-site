
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ProductCard, { ProductProps } from '../components/ProductCard';
import { Leaf, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const allProducts: ProductProps[] = [
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
  }
];

const categories = [
  { value: "all", label: "ทั้งหมด" },
  { value: "แตงโม", label: "แตงโม" },
  { value: "พริก", label: "พริก" },
  { value: "เมล่อน", label: "เมล่อน" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(allProducts);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "สินค้าของเรา - โกรเวอร์แพลนท์";

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {

    if (selectedCategory === "all") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    

    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
    

    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false);
    }
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24">

        <section className="bg-gradient-to-b from-trima-50 to-white py-16 px-6">
          <div className="container max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-trima-100 text-trima-800 border border-trima-200 mb-6 mx-auto">
              <Leaf className="h-4 w-4 mr-2 text-trima-600" />
              <span className="text-sm font-medium">สินค้าของเรา</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow">เมล็ดพันธุ์คุณภาพ<span className="text-trima-600">จากโกรเวอร์แพลนท์</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-0">
              เราคัดสรรเมล็ดพันธุ์คุณภาพดีที่สุดสำหรับเกษตรกรไทย ทั้งแตงโม พริก และเมล่อน รับประกันผลผลิตที่ดีเยี่ยม
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="w-full md:hidden mb-4">
                <button 
                  onClick={toggleMobileFilter}
                  className={cn(
                    "w-full py-3 px-4 rounded-lg",
                    "bg-white border border-trima-200",
                    "text-foreground font-medium",
                    "inline-flex items-center justify-center",
                    "transition-all duration-300",
                    "hover:border-trima-300"
                  )}
                >
                  <Filter className="h-5 w-5 mr-2" />
                  กรองสินค้า
                </button>
              </div>
              
              <div 
                className={cn(
                  "fixed inset-x-0 top-16 bg-white shadow-lg z-30 p-6 border-t border-trima-100",
                  "transition-all duration-300 transform md:hidden",
                  isMobileFilterOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
                )}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">หมวดหมู่</h3>
                  <button 
                    onClick={toggleMobileFilter}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleCategoryChange(category.value)}
                      className={cn(
                        "w-full py-3 px-4 rounded-md text-left",
                        "transition-all duration-300",
                        selectedCategory === category.value 
                          ? "bg-trima-100 text-trima-800 font-medium" 
                          : "bg-white text-foreground hover:bg-gray-50"
                      )}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="hidden md:block w-1/4 min-w-60 bg-white rounded-xl border border-trima-100 overflow-hidden sticky top-24">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">หมวดหมู่</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleCategoryChange(category.value)}
                        className={cn(
                          "w-full py-3 px-4 rounded-md text-left",
                          "transition-all duration-300",
                          selectedCategory === category.value 
                            ? "bg-trima-100 text-trima-800 font-medium" 
                            : "bg-white text-foreground hover:bg-gray-50"
                        )}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-3/4">
                <div className="mb-8 flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">
                    {selectedCategory === "all" ? "สินค้าทั้งหมด" : `เมล็ด${selectedCategory}`}
                  </h2>
                  <p className="text-muted-foreground">
                    แสดง {filteredProducts.length} รายการ
                  </p>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-trima-50 rounded-xl">
                    <p className="text-lg text-muted-foreground">ไม่พบสินค้าในหมวดหมู่นี้</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
