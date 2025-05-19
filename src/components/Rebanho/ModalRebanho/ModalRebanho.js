import React, { useState } from "react";
import styles from "@/components/Rebanho/ModalRebanho/ModalRebanho.module.css";

export default function ModalRebanho({ isOpen, onClose, bufalo }) {
  const [abaAtiva, setAbaAtiva] = useState("zootecnico"); // 'zootecnico' ou 'sanitario'

  if (!isOpen || !bufalo) return null;

  // Filtra histórico de acordo com a aba ativa
  const historicoFiltrado = bufalo.historico.filter(
    (item) => item.tipo === abaAtiva
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>
          Prontuário: <span>{bufalo.nome}</span> ({bufalo.tag})
        </h2>
        <p className={styles.modalSubtitle}>
          Informações detalhadas e histórico animal
        </p>

        <div className={styles.modalContent}>
          {/* Informações gerais */}
          <div className={styles.infoBox}>
            <h3 className={styles.cardTitle}>Informações gerais</h3>
            <p>
              <strong>TAG:</strong> {bufalo.tag}
            </p>
            <p>
              <strong>Nome:</strong> {bufalo.nome}
            </p>
            <p>
              <strong>Raça:</strong> {bufalo.raca}
            </p>
            <p>
              <strong>Sexo:</strong> {bufalo.sexo}
            </p>
            <p>
              <strong>Estágio:</strong> {bufalo.estagio}
            </p>
            <p>
              <strong>Peso atual:</strong> {bufalo.peso} kg
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={styles.statusAtivo}>{bufalo.status}</span>
            </p>
            <p>
              <strong>Última Atualização:</strong> {bufalo.ultimaAtualizacao}
            </p>
            <p>
              <strong>Localização:</strong> {bufalo.localizacao}
            </p>
          </div>

          {/* Histórico de registros */}
          <div className={styles.historicoBox}>
            <div className={styles.headerHistorico}>
              <h3 className={styles.cardTitle}>Históricos de Registros</h3>
              <div className={styles.tabs}>
                <span
                  className={
                    abaAtiva === "zootecnico"
                      ? styles.tabActive
                      : styles.tabInactive
                  }
                  onClick={() => setAbaAtiva("zootecnico")}
                >
                  Zootécnico
                </span>
                <span
                  className={
                    abaAtiva === "sanitario"
                      ? styles.tabActive
                      : styles.tabInactive
                  }
                  onClick={() => setAbaAtiva("sanitario")}
                >
                  Sanitário
                </span>
              </div>
            </div>

            {historicoFiltrado.length > 0 ? (
              historicoFiltrado.map((item, index) => (
                <div key={index} className={styles.registroCard}>
                  <div className={styles.registroHeader}>
                    <span>{item.data}</span>
                    <strong>{item.profissional}</strong>
                  </div>

                  {item.tipo === "zootecnico" ? (
                    <>
                      <p>
                        <strong>Peso:</strong> {item.peso} kg
                      </p>
                      <p>
                        <strong>Condição corporal:</strong>{" "}
                        {item.condicaoCorporal}
                      </p>
                      <p>
                        <strong>Alimentação:</strong> {item.alimentacao}
                      </p>
                      <p>
                        <strong>Observação:</strong> {item.observacao}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Medicamento:</strong> {item.medicamento}
                      </p>
                      <p>
                        <strong>Dosagem:</strong> {item.dosagem}
                      </p>
                      <p>
                        <strong>Doença:</strong> {item.doença}
                      </p>
                      <p>
                        <strong>Data de Retorno:</strong> {item.dataRetorno}
                      </p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p style={{ padding: "8px", color: "#777" }}>
                Nenhum registro encontrado.
              </p>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.closeButton} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
