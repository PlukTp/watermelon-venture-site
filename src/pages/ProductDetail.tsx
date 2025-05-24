
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ProductProps } from '@/components/ProductCard';

// This would normally come from an API or database
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

const productExtendedInfo = {
  "watermelon-1": {
    fullDescription: "เมล็ดแตงโมพันธุ์หวานฉ่ำ คัดสรรมาเพื่อเกษตรกรชาวไทยโดยเฉพาะ ให้ผลผลิตที่มีรสชาติหวานฉ่ำ เนื้อแน่น สีแดงสด น้ำหนักผลเฉลี่ย 5-7 กิโลกรัม อายุการเก็บเกี่ยว 60-70 วันหลังปลูก ทนทานต่อโรคที่พบบ่อยในแตงโม เช่น โรคราน้ำค้าง โรคเหี่ยว เหมาะสำหรับการเพาะปลูกในทุกภูมิภาคของประเทศไทย",
    reviews: [
      { rating: 5, comment: "คุณภาพดีมาก ผลผลิตออกดกและหวานอร่อย", author: "นายสมชาย" },
      { rating: 5, comment: "เคยปลูกหลายพันธุ์ พันธุ์นี้ขายได้ราคาดีที่สุด", author: "นางนิภา" },
      { rating: 4, comment: "โตเร็ว ทนโรค แนะนำสำหรับมือใหม่", author: "นายวิชัย" }
    ]
  },
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const foundProduct = allProducts.find(p => p.id === productId);
    
    setTimeout(() => {
      if (foundProduct) {
        setProduct(foundProduct);
        
        const related = allProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3);
        
        setRelatedProducts(related);
        document.title = `${foundProduct.name} - โกรเวอร์แพลนท์`;
      }
      setLoading(false);
    }, 300);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      toast({
        title: "เพิ่มลงตะกร้าแล้ว",
        description: `${product.name} จำนวน ${quantity} รายการ`,
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-24 px-6">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="animate-pulse space-y-6 w-full max-w-3xl">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-80 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-6 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-24 px-6">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <h2 className="text-2xl font-semibold mb-4">ไม่พบสินค้า</h2>
              <p className="text-muted-foreground mb-6">
                ขออภัย ไม่พบสินค้าที่คุณกำลังค้นหา
              </p>
              <Link 
                to="/products"
                className="inline-flex items-center text-trima-600 hover:text-trima-800 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                กลับไปยังหน้าสินค้าทั้งหมด
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const extendedInfo = (productId && productId in productExtendedInfo) 
    ? productExtendedInfo[productId as keyof typeof productExtendedInfo]
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="bg-muted/50 py-3 mb-8">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">หน้าหลัก</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-foreground transition-colors">สินค้าทั้งหมด</Link>
              <span className="mx-2">/</span>
              <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </div>
          </div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-white border border-border shadow-sm aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1 rounded-full bg-white/90 text-trima-800 text-xs font-medium flex items-center shadow-sm">
                  <Leaf className="h-3 w-3 mr-1 text-trima-600" />
                  {product.category}
                </div>
              </div>
              
              {product.popular && (
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-soil-500 text-white text-xs font-medium shadow-sm">
                    ยอดนิยม
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <Link 
                to="/products"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors w-fit"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                กลับไปยังสินค้าทั้งหมด
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                {extendedInfo && extendedInfo.reviews ? (
                  <>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={cn(
                            "h-5 w-5 mr-0.5",
                            i < Math.round(extendedInfo.reviews.reduce((acc, r) => acc + r.rating, 0) / extendedInfo.reviews.length)
                              ? "text-amber-500 fill-amber-500"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({extendedInfo.reviews.length} รีวิว)
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">ยังไม่มีรีวิว</span>
                )}
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">รายละเอียด</h2>
                <p className="text-muted-foreground mb-4">
                  {extendedInfo ? extendedInfo.fullDescription : product.description}
                </p>
                
                {/* {extendedInfo && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <span className="text-sm font-medium">ระยะเวลาเก็บเกี่ยว</span>
                      <p className="text-foreground">{extendedInfo.harvestTime}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <span className="text-sm font-medium">ผลผลิตเฉลี่ย</span>
                      <p className="text-foreground">{extendedInfo.yield}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg sm:col-span-2">
                      <span className="text-sm font-medium">วิธีการปลูก</span>
                      <p className="text-foreground">{extendedInfo.plantingInstructions}</p>
                    </div>
                  </div>
                )} */}
              </div>
              
              {/* {extendedInfo && (
                <div className="mb-8">
                  <div className="flex items-baseline mb-6">
                    <span className="text-2xl font-bold text-trima-700">{extendedInfo.price}</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      สถานะ: <span className={cn(
                        "font-medium",
                        extendedInfo.stock > 0 ? "text-green-600" : "text-red-500"
                      )}>
                        {extendedInfo.stock > 0 ? 'มีสินค้า' : 'สินค้าหมด'}
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-4 border border-input rounded-md">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-3 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 w-12 text-center">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        +
                      </button>
                    </div>
                    
                    <Button 
                      onClick={handleAddToCart}
                      disabled={extendedInfo.stock <= 0}
                      className="bg-trima-600 hover:bg-trima-700 text-white"
                    >
                      เพิ่มลงตะกร้า
                    </Button>
                  </div>
                </div>
              )} */}
              
              <div className="mt-auto">
                <Link 
                  to="/contact"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  สนใจสั่งซื้อจำนวนมาก? <span className="ml-1 text-trima-600 font-medium">ติดต่อเรา</span>
                </Link>
              </div>
            </div>
          </div>
          
          {extendedInfo && extendedInfo.reviews && extendedInfo.reviews.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">รีวิวจากลูกค้า</h2>
              
              <div className="space-y-6">
                {extendedInfo.reviews.map((review, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-border">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={cn(
                              "h-4 w-4 mr-0.5",
                              i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">{review.author}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">สินค้าที่เกี่ยวข้อง</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id}>
                    <Link to={`/products/${relatedProduct.id}`}>
                      <div className="group relative bg-white rounded-2xl overflow-hidden border border-border hover:border-trima-200 transition-custom shadow-sm hover:shadow-md">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={relatedProduct.image} 
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium mb-2 group-hover:text-trima-700 transition-colors">{relatedProduct.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{relatedProduct.description}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
