import { useRouter } from 'next/router'

export function useActiveLink(path) {
  const { pathname } = useRouter()
  return pathname.startsWith(path) ? 'active' : ''
}
