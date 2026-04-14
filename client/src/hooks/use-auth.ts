import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, LoginData, RegisterData } from "@shared/models/auth"; // تأكد من استيراد الأنواع الجديدة
import { useToast } from "@/hooks/use-toast"; // لإظهار تنبيهات النجاح والفشل

// 1. وظيفة جلب بيانات المستخدم (تبقى كما هي تقريباً)
async function fetchUser(): Promise<User | null> {
  const response = await fetch("/api/user");
  if (response.status === 401) return null;
  if (!response.ok) throw new Error("فشل في جلب بيانات المستخدم");
  return response.json();
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: fetchUser,
    retry: false,
  });

  // 2. إضافة وظيفة تسجيل الدخول (Login)
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
    },
    onError: (error: Error) => {
      toast({ title: "Login Problem", description: error.message, variant: "destructive" });
    }
  });

  // 3. تعديل وظيفة تسجيل الخروج (Logout) لتكون احترافية
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch("/api/logout", { method: "POST" });
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync, // ستستخدم هذا في صفحة Login.tsx
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
  };
}
