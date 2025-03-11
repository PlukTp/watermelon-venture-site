
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { submitToGoogleSheets } from '@/utils/googleSheets';
import { toast } from '@/hooks/use-toast';

interface ContactFormProps {
  googleScriptUrl: string;
  setGoogleScriptUrl: (url: string) => void;
  showScriptInput: boolean;
  setShowScriptInput: (show: boolean) => void;
}

const ContactForm = ({ 
  googleScriptUrl, 
  setGoogleScriptUrl, 
  showScriptInput, 
  setShowScriptInput 
}: ContactFormProps) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleScriptUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setGoogleScriptUrl(url);
    localStorage.setItem('googleScriptUrl', url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!googleScriptUrl) {
      toast.error("กรุณาตั้งค่า Google Sheets URL ก่อนส่งข้อมูล");
      setShowScriptInput(true);
      return;
    }
    
    setFormStatus('loading');
    
    try {
      const result = await submitToGoogleSheets(formState, googleScriptUrl);
      
      if (result.success) {
        setFormStatus('success');
        toast.success(result.message);
        
        // Reset form after success
        setTimeout(() => {
          setFormState({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
          setFormStatus('idle');
        }, 3000);
      } else {
        setFormStatus('error');
        toast.error(result.message);
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('error');
      toast.error("เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองอีกครั้งในภายหลัง");
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-trima-100">
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-6">ส่งข้อความถึงเรา</h3>
        
        {/* Google Sheet Script URL Input */}
        {showScriptInput && (
          <div className="mb-6 p-4 border border-trima-200 rounded-lg bg-trima-50">
            <label htmlFor="googleScriptUrl" className="block text-sm font-medium text-foreground mb-2">
              Google Apps Script URL
            </label>
            <input
              id="googleScriptUrl"
              type="url"
              value={googleScriptUrl}
              onChange={handleScriptUrlChange}
              className={cn(
                "w-full px-4 py-3 rounded-lg",
                "border border-border focus:border-trima-300",
                "outline-none ring-0 focus:ring-2 focus:ring-trima-200",
                "bg-background transition-all duration-300"
              )}
              placeholder="https://script.google.com/macros/s/your-script-id/exec"
            />
            <p className="text-xs text-muted-foreground mt-2">
              ใส่ URL ของ Google Apps Script Web App ที่เชื่อมต่อกับ Google Sheets ของคุณ
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground/80">
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
              <label htmlFor="email" className="text-sm font-medium text-foreground/80">
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
            <label htmlFor="subject" className="text-sm font-medium text-foreground/80">
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
            <label htmlFor="message" className="text-sm font-medium text-foreground/80">
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
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowScriptInput(!showScriptInput)}
              className="text-sm text-trima-600 hover:text-trima-700 underline"
            >
              {showScriptInput ? 'ซ่อนการตั้งค่า' : 'ตั้งค่า Google Sheets'}
            </button>
            
            <button
              type="submit"
              className={cn(
                "py-4 px-6 rounded-lg",
                "bg-trima-600 hover:bg-trima-700",
                "text-white font-medium",
                "inline-flex items-center justify-center",
                "transition-all duration-300",
                "shadow-sm hover:shadow",
                formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : '',
                formStatus === 'success' ? 'bg-green-600 hover:bg-green-700' : '',
                formStatus === 'error' ? 'bg-red-600 hover:bg-red-700' : '',
              )}
              disabled={formStatus === 'loading'}
            >
              {formStatus === 'idle' && (
                <>
                  ส่งข้อความ
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
              {formStatus === 'loading' && 'กำลังส่ง...'}
              {formStatus === 'success' && 'ส่งข้อความสำเร็จ ✓'}
              {formStatus === 'error' && 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
