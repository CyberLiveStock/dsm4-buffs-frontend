import { getAllProperties } from "@/services/propertyService";

export async function fetchPropertyStats() {
  try {
    const properties = await getAllProperties();

    if (!properties.length) {
      console.log("⚠️ Nenhuma propriedade encontrada");
      return {};
    }

    // Total de propriedades
    const totalProperties = properties.length;
    console.log(`🔹 Total de propriedades: ${totalProperties}`);

    // Contagem por finalidade
    const countByFinalidade = properties.reduce((acc, prop) => {
      const key = prop.finalidade || "Indefinido";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    console.log("🔹 Contagem por Finalidade:");
    Object.entries(countByFinalidade).forEach(([finalidade, count]) => {
      console.log(`  - ${finalidade}: ${count}`);
    });

    const countByTpManejo = properties.reduce((acc, prop) => {
      const key = prop.tpManejo || "Indefinido";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    console.log("🔹 Contagem por Tipo de Manejo:");
    Object.entries(countByTpManejo).forEach(([tpManejo, count]) => {
      console.log(`  - ${tpManejo}: ${count}`);
    });

    const estados = new Set();
    properties.forEach((prop, i) => {
      if (Array.isArray(prop.endereco)) {
        prop.endereco.forEach((end, j) => {
          if (end.estado) {
            estados.add(end.estado);
            console.log(`🔸 Propriedade ${i + 1}, endereço ${j + 1}: estado = ${end.estado}`);
          } else {
            console.log(`🔸 Propriedade ${i + 1}, endereço ${j + 1}: estado indefinido`);
          }
        });
      } else {
        console.log(`🔸 Propriedade ${i + 1}: sem endereços definidos`);
      }
    });
    const estadosArray = Array.from(estados);
    console.log(`🔹 Estados únicos encontrados: [${estadosArray.join(", ")}]`);

    const stats = {
      totalProperties,
      countByFinalidade,
      countByTpManejo,
      estados: estadosArray,
    };

    console.log("📊 Estatísticas completas de Propriedades:", stats);
    return stats;

  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas de propriedades:", error);
    return {};
  }
}
