
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactInfoItem {
  icon: JSX.Element;
  title: string;
  content: string;
  link: string;
}

const ContactInfo = () => {
  const contactInfo: ContactInfoItem[] = [
    {
      icon: <Phone className="h-6 w-6 text-trima-600" />,
      title: "โทรศัพท์",
      content: "(+66) 087-045-6926",
      link: "tel:+66870456926",
    },
    {
      icon: <Mail className="h-6 w-6 text-trima-600" />,
      title: "อีเมล",
      content: "growerplant9@gmail.com",
      link: "mailto:growerplant9@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-trima-600" />,
      title: "ที่อยู่",
      content: "167 หมู่ 12 ต.แพง อ.โกสุมพิสัย จ.มหาสารคาม 44140",
      link: "https://maps.app.goo.gl/889HC3J93k94nUh28",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-6">ข้อมูลการติดต่อ</h3>
        <p className="text-muted-foreground mb-8">
          ท่านสามารถติดต่อเราได้ทางช่องทางต่าง ๆ ด้านล่าง หรือเยี่ยมชมสำนักงานใหญ่ของเราในวันจันทร์ถึงศุกร์ เวลา 8:00 - 17:00 น.
        </p>
        
        <div className="space-y-6">
          {contactInfo.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-start p-6 rounded-xl",
                "bg-white border border-trima-100",
                "transition-all duration-300 hover:shadow-md hover:border-trima-200",
                "hover:bg-trima-50/50",
                "group"
              )}
            >
              <div className="bg-trima-100 p-3 rounded-lg group-hover:bg-trima-200 transition-colors">
                {item.icon}
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium mb-1 group-hover:text-trima-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-muted-foreground">{item.content}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6">ชั่วโมงทำการ</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">จันทร์ - เสาร์:</span>
            <span className="font-medium">8:00 - 17:00 น.</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">อาทิตย์:</span>
            <span className="font-medium">ปิดทำการ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
