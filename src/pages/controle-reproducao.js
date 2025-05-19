import Layout from "@/layout/Layout.js";
import styles from "@/styles/ControleReproducao.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import FilterTable from "@/components/ControleReproducao/FilterTable/FilterTable";
import StatusReprodutivo from "@/components/ControleReproducao/StatusReprodutivo/StatusReprodutivo";

export default function ControleReproducao() {
  return (
    <div className={styles.container}>
      {/* Indicadores da gestão da Reprodução */}
      <div className={styles.indicators}>
        <div>
          <h1 className={styles.title}>Gestão de Reprodução</h1>
          <p className={styles.description}>
            Monitore o status reprodutivo do seu rebanho e otimize o desempenho
            reprodutivo.
          </p>
        </div>
        <div className={styles.indicatorContainer}>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Total de Búfalas</h2>
            <p className={styles.indicatorSubtitle}>
              Monitoramento reprodutivo ativo
            </p>
            <p className={styles.indicatorValue}>10</p>
          </div>

          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Análise Financeira</h2>
            <p className={styles.indicatorSubtitle}>
              Búfalas com impacto financeiro negativo
            </p>

            <div className={styles.cardFooter}>
              <div className={styles.alertInfo}>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className={styles.iconAlert}
                  title="Essas búfalas não estão lactando nem entrando no cio."
                />
                <p className={styles.alertText}>
                  <strong>4 búfalas</strong>
                </p>
              </div>
              <span className={styles.financePercent}>57.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Registro Reprodutivo */}
      <div className={styles.containerTable}>
        <FilterTable />
        <div>
          <table className={styles.tabela}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>TAG</th>
                <th className={styles.th}>Vet Responsável</th>
                <th className={styles.th}>Última identificação</th>
                <th className={styles.th}>Tipo de Inseminação</th>
                <th className={styles.th}>Status Prenhez</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.trPar}>
                <td className={styles.td}>BF001</td>
                <td className={styles.td}>Dr. Carlos Mendes</td>
                <td className={styles.td}>09/12/2023</td>
                <td className={styles.td}>Artificial</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.lactando}`}>
                    Lactando
                  </span>
                </td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              <tr className={styles.trPar}>
                <td className={styles.td}>BF002</td>
                <td className={styles.td}>Dr. Maria Silva</td>
                <td className={styles.td}>19/11/2023</td>
                <td className={styles.td}>IATF</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.prenhez}`}>
                    Prenhez Confirmada
                  </span>
                </td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              <tr className={styles.trPar}>
                <td className={styles.td}>BF003</td>
                <td className={styles.td}>Dr. João Lima</td>
                <td className={styles.td}>14/12/2023</td>
                <td className={styles.td}>Monta Natural</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.cio}`}>
                    No cio
                  </span>
                </td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              <tr className={styles.trPar}>
                <td className={styles.td}>BF004</td>
                <td className={styles.td}>Dr. Ana Pereira</td>
                <td className={styles.td}>29/11/2023</td>
                <td className={styles.td}>Artificial</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.secagem}`}>
                    Em secagem
                  </span>
                </td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              {/* Repita os outros <tr> aqui */}
            </tbody>
          </table>
        </div>
      </div>
      <StatusReprodutivo />


    </div>
  );
}

ControleReproducao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
