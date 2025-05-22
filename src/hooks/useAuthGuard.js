// src/hooks/useAuthGuard.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const publicPaths = ["/auth/login", "/auth/register", "/forgot-password"];

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    // Se rota atual for pública, não precisa checar token
    if (publicPaths.includes(router.pathname)) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth/login");
    }
  }, [router.pathname]);
}
