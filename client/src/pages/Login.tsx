import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null); // Clear previous errors

    let determinedRole: string | null = null;

    if (email === "admin@university.ru" && password === "admin") {
      determinedRole = "admin";
    } else if (email === "teacher@university.ru" && password === "teacher") {
      determinedRole = "teacher";
    } else if (email === "student@university.ru" && password === "student") {
      determinedRole = "student";
    }

    if (determinedRole) {
      // Store role in sessionStorage
      sessionStorage.setItem("userRole", determinedRole);
      sessionStorage.setItem("userName", email.split("@")[0]);
      
      // Navigate based on role
      if (determinedRole === "admin") {
        setLocation("/");
      } else if (determinedRole === "teacher") {
        setLocation("/teacher/disciplines");
      } else {
        setLocation("/student/profile");
      }
    } else {
      setLoginError("Неверный email или пароль. Пожалуйста, проверьте введенные данные.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-sidebar-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">CP</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Цифровой профиль</h1>
          <p className="text-muted-foreground">Система управления компетенциями студентов</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg" role="alert">
                {loginError}
              </div>
            )}
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@university.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Пароль
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>



            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-colors"
            >
              Войти
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Забыли пароль?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
