import React, { useState } from "react";
import styles from "@/components/ControleReproducao/FilterTable.module.css";

export default function FilterTable() {

const [showModal, setShowModal] = useState(false);

  return (
    <div class={styles.filtrosContainer}>
      <div className={styles.filtroGroup}>
        <label className={styles.filtroLabel}>Buscar por Tag</label>

        <input
          type="text"
          class={styles.filtroInput}
          placeholder="Digite a tag"
        />
      </div>

      <div className={styles.filtroGroup}>
        <label className={styles.filtroLabel}>Filtrar por Vet</label>
        <select class={styles.filtroSelect}>
          <option>Filtrar por Vet</option>
          <option>Dr. Carlos Mendes</option>
          <option>Dr. Maria Silva</option>
          <option>Dr. João Lima</option>
          <option>Dr. Ana Pereira</option>
        </select>
      </div>

      <div className={styles.filtroGroup}>
        <label className={styles.filtroLabel}>Tipo de Inseminação</label>
        <select className={styles.filtroSelect}>
          <option>Tipo de Inseminação</option>
          <option>Artificial</option>
          <option>IATF</option>
          <option>Monta Natural</option>
          <option>Transferência de Embrião</option>
        </select>
      </div>

      <div className={styles.filtroGroup}>
        <label className={styles.filtroLabel}>Status</label>
        <select className={styles.filtroSelect}>
          <option>Status</option>
          <option>Lactando</option>
          <option>Prenhez Confirmada</option>
          <option>Em Secagem</option>
          <option>No cio</option>
        </select>
      </div>

 {/* <button class={styles.filtroBtn}>Filtrar por período</button> */}


  <div className={styles.filtrosContainer}>
      {/* Botão para abrir o modal */}
      <button onClick={() => setShowModal(true)} className={styles.filtroBtn}>
        Filtrar por período
      </button>

      {/* Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2>Filtrar por período</h2>
            <label>Data Inicial:</label>
            <input type="date" className={styles.modalInput} />
            <label>Data Final:</label>
            <input type="date" className={styles.modalInput} />
            <button className={styles.modalButton}>Aplicar Filtro</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
