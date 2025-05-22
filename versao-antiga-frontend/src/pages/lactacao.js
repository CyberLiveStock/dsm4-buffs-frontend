import MilkProduction from "@/components/Home/MilkProduction/MilkProduction";
import TopBuffaloesChart from "@/components/Home/TopBuffaloesChart/TopBuffaloesChart";
import ProducaoQueda from "@/components/Lactacao/ProducaoQueda/ProducaoQueda";
import Layout from "@/layout/Layout.js";
import styles from "@/styles/Lactacao.module.css";

export default function Lactacao() {
  return (
    <div className={styles.container}>
      {/* indicadores de produção diária, semanal, mensal e anual */}
      <div className={styles.indicators}>
        <div className={styles.indicatorContainer}>
          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Produção Diária</h2>
            <p className={styles.indicatorValue}>245 L</p>
            <p className={styles.indicatorTitle}>+12% em relação a ontem</p>
          </div>

          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Produção Semanal</h2>
            <p className={styles.indicatorValue}>1,680 L</p>
            <p className={styles.indicatorTitle}>
              +5% em relação à semana anterior
            </p>
          </div>

          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Produção Mensal</h2>
            <p className={styles.indicatorValue}>7,245 L</p>
            <p className={styles.indicatorTitle}>
              +8% em relação ao mês anterior
            </p>
          </div>

          <div className={styles.indicatorCard}>
            <h2 className={styles.indicatorTitle}>Produção Anual</h2>
            <p className={styles.indicatorValue}>86,420 L</p>
            <p className={styles.indicatorTitle}>
              +15% em relação ao ano anterior
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico da Lactação mensal, semanal e anual */}
      <div className={styles.graph}>
        <div className={styles.graphContainer}>
          <MilkProduction />
        </div>
        <div className={styles.graphContainer}>
          <ProducaoQueda />
        </div>
      </div>
      {/* Inicio da Tabela*/}
      <div className={styles.containerTable}>
        {/* Barra de pesquisa e filtros */}
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
            <label className={styles.filtroLabel}>Status de lactação</label>
            <select class={styles.filtroSelect}>
              <option>Status de lactação</option>
              <option>Ativa</option>
              <option>Em queda</option>
              <option>Secando</option>
            </select>
          </div>

          <div className={styles.filtroGroup}>
            <label className={styles.filtroLabel}>Localização</label>
            <select className={styles.filtroSelect}>
              <option>Piquete</option>
              <option>Piquete 1</option>
              <option>Piquete 2</option>
            </select>
          </div>

          <button class={styles.filtroBtn}>Limpar filtros</button>
        </div>
        {/* Tabela com informações sobre a média e ordenha  */}
        <div>
          <table className={styles.tabela}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>TAG</th>
                <th className={styles.th}>Nome</th>
                <th className={styles.th}>Média diária(7d)</th>
                <th className={styles.th}>Média Semanal</th>
                <th className={styles.th}>Última Ordenha</th>
                <th className={styles.th}>Variação</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.trPar}>
                <td className={styles.td}>BF001</td>
                <td className={styles.td}>Aurora</td>
                <td className={styles.td}>9.50 L</td>
                <td className={styles.td}>66.50 L</td>
                <td className={styles.td}>14/11/2023</td>
                <td className={styles.td}>3.20 %</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.ativo}`}>
                    Ativo
                  </span>
                </td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              <tr className={styles.trPar}>
                <td className={styles.td}>BF002</td>
                <td className={styles.td}>Beleza</td>
                <td className={styles.td}>7.60 L</td>
                <td className={styles.td}>52.50 L</td>
                <td className={styles.td}>11/11/2023</td>
                <td className={styles.td}>5.80 %</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.queda}`}>
                    Em queda
                  </span>
                </td>
                <td className={styles.td}>
                  <button className={styles.btnDetalhes}>Ver detalhes</button>
                </td>
              </tr>

              <tr className={styles.trPar}>
                <td className={styles.td}>BF003</td>
                <td className={styles.td}>Beleza</td>
                <td className={styles.td}>7.60 L</td>
                <td className={styles.td}>52.50 L</td>
                <td className={styles.td}>11/11/2023</td>
                <td className={styles.td}>5.80 %</td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${styles.secando}`}>
                    Secando
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
    </div>
  );
}

Lactacao.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
