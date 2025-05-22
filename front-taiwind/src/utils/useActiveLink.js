// utils/useActiveLink.js
import { useRouter } from "next/router";

export function useActiveLink(path) {
  const { pathname } = useRouter();
  return pathname === path ? "active" : "";
}
