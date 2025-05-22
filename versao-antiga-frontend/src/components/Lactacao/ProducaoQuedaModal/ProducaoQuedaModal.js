"use client"

import { useEffect } from "react"
import styles from "./ProducaoQuedaModal.module.css"

// Dados das búfalas com queda na produção conforme a imagem
const bufalasComQueda = [
  {
    tag: "BF005",
    nome: "Amélia",
    variacao: "5.50 %",
    ultimaOrdenha: "05/04/2024",
  },
  {
    tag: "BF006",
    nome: "Mimosa",
    variacao: "6.0 %",
    ultimaOrdenha: "30/04/2024",
  },
  {
    tag: "BF009",
    nome: "Claudia",
    variacao: "2.80 %",
    ultimaOrdenha: "10/04/2024",
  },
  {
    tag: "BF012",
    nome: "Linda",
    variacao: "10.50 %",
    ultimaOrdenha: "14/04/2024",
  },
  {
    tag: "BF045",
    nome: "Mila",
    variacao: "4.80 %",
    ultimaOrdenha: "02/04/2024",
  },
  {
    tag: "BF056",
    nome: "Augusta",
    variacao: "3.84 %",
    ultimaOrdenha: "14/04/2024",
  },
]

export default function ProducaoQuedaModal({ isOpen, onClose }) {
  // Previne o scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>TAG</th>
                <th>NOME</th>
                <th>Variação</th>
                <th>Última ordenha</th>
              </tr>
            </thead>
            <tbody>
              {bufalasComQueda.map((bufala) => (
                <tr key={bufala.tag}>
                  <td>{bufala.tag}</td>
                  <td>{bufala.nome}</td>
                  <td>
                    <span className={styles.negativeChange}>{bufala.variacao}</span>
                  </td>
                  <td>{bufala.ultimaOrdenha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.footer}>
          <button className={styles.closeButton} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
