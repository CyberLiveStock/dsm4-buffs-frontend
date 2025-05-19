import ModalRebanho from "@/components/Rebanho/ModalRebanho/ModalRebanho";
import Layout from "@/layout/Layout.js";
import styles from "@/styles/Rebanho.module.css";
import React, { useState } from "react";

export default function Rebanho() {
  const [modalAberto, setModalAberto] = useState(false);

  const bufaloSelecionado = {
    tag: "BF001",
    nome: "Aurora",
    raca: "Murrah",
    sexo: "Fêmea",
    estagio: "Vaca",
    peso: 650,
    status: "Ativo",
    ultimaAtualizacao: "14/11/2023",
    localizacao: "Piquete 01",
    historico: [
      {
        data: "14/11/2023",
        peso: 640,
        condicaoCorporal: "4/5",
        alimentacao: "Pasto + Ração",
        observacao: "Condição física excelente",
        profissional: "Dr. Carlos Silva",
        tipo: "zootecnico",
      },
      {
        data: "14/10/2023",
        peso: 640,
        condicaoCorporal: "4/5",
        alimentacao: "Pasto + Ração",
        observacao: "Ganho de peso estável",
        profissional: "Dr. Carlos Silva",
        tipo: "zootecnico",
      },
      {
        data: "10/10/2023",
        medicamento: "Vacina contra Febre Aftosa",
        doença: "Febre Aftosa",
        dataRetorno: "10/04/2024",
        dosagem: "5 ml",
        profissional: "Dra. Fernanda",
        tipo: "sanitario",
      },
      {
        data: "10/04/2024",
        medicamento: "Vacina contra Febre Aftosa",
        doença: "Febre Aftosa",
        dataRetorno: "10/10/2024",
        dosagem: "5 ml",
        profissional: "Dra. Fernanda",
        tipo: "sanitario",
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerTable}>
        <div>
          <h1 className={styles.title}>Registro de Búfalos</h1>
          <p className={styles.description}>
            {" "}
            {/*Fazer o contador de bufalos */}
            Lista completa do rebanho com 7 búfalos(as).
          </p>
        </div>
        <div>
          <table className={styles.tabela}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>TAG</th>
                <th className={styles.th}>Nome</th>
                <th className={styles.th}>Peso(kg)</th>
                <th className={styles.th}>Raça</th>
                <th className={styles.th}>Sexo</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Última Atualização</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.trPar}>
                <td className={styles.td}>BF001</td>
                <td className={styles.td}>Aurora</td>
                <td className={styles.td}>650</td>
                <td className={styles.td}>Murrah</td>
                <td className={styles.td}>Fêmea</td>
                <td className={styles.td}>14/11/2023</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.ativo}`}>
                    Ativo
                  </span>
                </td>
                <td className={styles.td}>
                  <button
                    onClick={() => setModalAberto(true)}
                    className={styles.btnDetalhes}
                  >
                    Ver detalhes
                  </button>
                  <ModalRebanho
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    bufalo={bufaloSelecionado}
                  />
                </td>
              </tr>

              <tr className={styles.trPar}>
                <td className={styles.td}>BF002</td>
                <td className={styles.td}>Mel</td>
                <td className={styles.td}>480</td>
                <td className={styles.td}>Mediterrâneo</td>
                <td className={styles.td}>Fêmea</td>
                <td className={styles.td}>05/11/2023</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.inativo}`}>
                    Inativo
                  </span>
                </td>
                <td className={styles.td}>
                  <button
                    onClick={() => setModalAberto(true)}
                    className={styles.btnDetalhes}
                  >
                    Ver detalhes
                  </button>
                  <ModalRebanho
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    bufalo={bufaloSelecionado}
                  />
                </td>
              </tr>
              {/* Repita os outros <tr> aqui */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Rebanho.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
