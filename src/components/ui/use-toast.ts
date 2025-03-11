
import { useToast } from "@/hooks/use-toast";

// Define the toast function
const toast = ({ title, description, variant }: { 
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}) => {
  const { toast: originalToast } = useToast();
  return originalToast({ title, description, variant });
};

export { useToast, toast };
