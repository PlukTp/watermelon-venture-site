
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sprout, Facebook, Instagram, Twitter, Mail, PhoneCall } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { text: "หน้าหลัก", path: "/" },
      { text: "เกี่ยวกับเรา", path: "/about" },
      { text: "สินค้าของเรา", path: "/products" },
      { text: "ติดต่อเรา", path: "/contact" },
    ],
    products: [
      { text: "เมล็ดแตงโม", path: "/products?category=watermelon" },
      { text: "เมล็ดพริก", path: "/products?category=pepper" },
      { text: "เมล็ดเมล่อน", path: "/products?category=melon" },
    ],
    support: [
      { text: "คำถามที่พบบ่อย", path: "/faq" },
      { text: "วิธีการเพาะปลูก", path: "/growing-guide" },
      { text: "นโยบายความเป็นส่วนตัว", path: "/privacy" },
      { text: "เงื่อนไขการใช้บริการ", path: "/terms" },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-white to-trima-50 pt-16 border-t border-trima-100">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 transition-custom hover:opacity-80">
              <Sprout className="h-8 w-8 text-trima-600" />
              <span className="text-2xl font-display font-semibold bg-clip-text text-transparent bg-gradient-to-r from-trima-800 to-trima-600">
              โกรเวอร์ แพลนท์
              </span>
            </Link>
            <p className="text-muted-foreground">
              ผู้นำด้านการวิจัย พัฒนา และจำหน่ายเมล็ดพันธุ์คุณภาพสูงสำหรับเกษตรกรไทย
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=100089172523384&locale=th_TH" 
                className={cn(
                  "bg-white p-2 rounded-full",
                  "border border-trima-100",
                  "text-trima-700 hover:text-trima-800",
                  "transition-all duration-300",
                  "hover:bg-trima-50 hover:shadow-sm"
                )}
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              {/* <a 
                href="#" 
                className={cn(
                  "bg-white p-2 rounded-full",
                  "border border-trima-100",
                  "text-trima-700 hover:text-trima-800",
                  "transition-all duration-300",
                  "hover:bg-trima-50 hover:shadow-sm"
                )}
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-trima-700 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">สินค้าของเรา</h3>
            <ul className="space-y-3">
              {links.products.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-trima-700 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ติดต่อ</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 text-trima-600 mr-3" />
                <a 
                  href="tel:+66870456926" 
                  className="text-muted-foreground hover:text-trima-700 transition-colors"
                >
                  (+66) 087-045-6926
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-trima-600 mr-3" />
                <a 
                  href="mailto:growerplant9@gmail.com" 
                  className="text-muted-foreground hover:text-trima-700 transition-colors"
                >
                  growerplant9@gmail.com
                </a>
              </li>
              <li className="pt-3">
                <Link 
                  to="/contact" 
                  className={cn(
                    "inline-flex items-center justify-center px-5 py-2 text-sm",
                    "bg-trima-600 text-white rounded-lg font-medium",
                    "transition-custom shadow-sm hover:shadow-md hover:bg-trima-700",
                    "hover-scale"
                  )}
                >
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-trima-100 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} โกรเวอร์แพลนท์. สงวนลิขสิทธิ์ทั้งหมด.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
