import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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

    const section = document.getElementById("contact-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
  
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw3PUl2naLnMTZ4eLtsbcIrLiIUIcr7XGPpizqHmlih9jb4TpBu8g8iZfnBKI18NBxDVw/exec",
        {
          method: "POST",
          mode: "no-cors", // ต้องใช้ no-cors สำหรับ Google Apps Script
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            ...formState,
            timestamp: new Date().toISOString(),
          }),
        }
      );
  
      console.log("Response status:", response.status);
      
      // เนื่องจากใช้ mode: "no-cors" เราจึงไม่สามารถอ่านค่า response ได้
      // ดังนั้นจึงถือว่าสำเร็จถ้าไม่มี error
      setFormStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
      
      toast({
        title: "ส่งข้อความสำเร็จ",
        description: "ข้อความของคุณถูกส่งเรียบร้อยแล้ว ขอบคุณที่ติดต่อเรา",
      });
      
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
      
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองอีกครั้งในภายหลัง",
        variant: "destructive",
      });
      
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }
  };

  const contactInfo = [
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
    <section
      id="contact-section"
      className="py-24 px-6 bg-gradient-to-b from-trima-50 to-white relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-trima-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-soil-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-trima-100 text-trima-800 border border-trima-200 mb-6">
            <Mail className="h-4 w-4 mr-2 text-trima-600" />
            <span className="text-sm font-medium">ติดต่อเรา</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            มีคำถามหรือต้องการข้อมูลเพิ่มเติม?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ทีมงานของเราพร้อมให้ความช่วยเหลือและตอบคำถามทุกข้อสงสัยของคุณเกี่ยวกับผลิตภัณฑ์ของเรา
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={cn(
              "bg-white rounded-2xl shadow-lg overflow-hidden border border-trima-100",
              "transition-all duration-1000 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            )}
          >
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-6">ส่งข้อความถึงเรา</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground/80"
                    >
                      ชื่อ
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "border border-border focus:border-trima-300",
                        "outline-none ring-0 focus:ring-2 focus:ring-trima-200",
                        "bg-background transition-all duration-300"
                      )}
                      placeholder="กรุณากรอกชื่อ"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground/80"
                    >
                      อีเมล
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "border border-border focus:border-trima-300",
                        "outline-none ring-0 focus:ring-2 focus:ring-trima-200",
                        "bg-background transition-all duration-300"
                      )}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-foreground/80"
                  >
                    หัวข้อ
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "border border-border focus:border-trima-300",
                      "outline-none ring-0 focus:ring-2 focus:ring-trima-200",
                      "bg-background transition-all duration-300"
                    )}
                    placeholder="กรุณากรอกหัวข้อ"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground/80"
                  >
                    ข้อความ
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "border border-border focus:border-trima-300",
                      "outline-none ring-0 focus:ring-2 focus:ring-trima-200",
                      "bg-background transition-all duration-300"
                    )}
                    placeholder="กรุณากรอกข้อความ"
                  />
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full py-4 px-6 rounded-lg",
                    "bg-trima-600 hover:bg-trima-700",
                    "text-white font-medium",
                    "inline-flex items-center justify-center",
                    "transition-all duration-300",
                    "shadow-sm hover:shadow",
                    formStatus === "success"
                      ? "bg-green-600 hover:bg-green-700"
                      : "",
                    formStatus === "error" ? "bg-red-600 hover:bg-red-700" : "",
                    formStatus === "sending"
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  )}
                  disabled={formStatus !== "idle"}
                >
                  {formStatus === "idle" && (
                    <>
                      ส่งข้อความ
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                  {formStatus === "sending" && "กำลังส่งข้อความ..."}
                  {formStatus === "success" && "ส่งข้อความสำเร็จ ✓"}
                  {formStatus === "error" && "เกิดข้อผิดพลาด โปรดลองอีกครั้ง"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className={cn(
              "space-y-8",
              "transition-all duration-1000 delay-300 transform",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            )}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">ข้อมูลการติดต่อ</h3>
              <p className="text-muted-foreground mb-8">
                ท่านสามารถติดต่อเราได้ทางช่องทางต่าง ๆ ด้านล่าง
                หรือเยี่ยมชมสำนักงานใหญ่ของเราในวันจันทร์ถึงเสาร์ เวลา 8:00 -
                17:00 น.
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
