"use client"

import { useState } from "react"
import Layout from "@/layout/Layout"

export default function Rebanho() {
  const [modalAberto, setModalAberto] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState("zootecnico")

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
  }

  return (
      <div className="p-6 flex flex-col items-center gap-8">
        {/* Gestão do rebanho section */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
  <div className="mb-4">
    <h1 className="text-2xl font-bold m-0 leading-tight text-black">Gestão do rebanho</h1>
    <p className="mt-1 text-base text-black">
      Gerencie seu rebanho de búfalos, registre informações zootecnicas e sanitárias.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Maturidade do rebanho */}
    <div className="bg-white rounded-lg shadow border border-[#e0e0e0] h-full">
      <div className="p-4 pb-2">
        <h2 className="text-lg font-medium m-0 text-black">Maturidade do rebanho</h2>
        <p className="text-sm text-black mt-1">Distribuição por estágio</p>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-black">Novilhas</span>
              <span className="font-medium text-black">5</span>
            </div>
            <div className="w-full h-2.5 bg-black-100 rounded-full mt-2">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-black">Vacas</span>
              <span className="font-medium text-black">3</span>
            </div>
            <div className="w-full h-2.5 bg-black-100 rounded-full mt-2">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "40%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-black">Touros</span>
              <span className="font-medium text-black">2</span>
            </div>
            <div className="w-full h-2.5 bg-black-100 rounded-full mt-2">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "25%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-black">Bezerros</span>
              <span className="font-medium text-black">1</span>
            </div>
            <div className="w-full h-2.5 bg-black-100 rounded-full mt-2">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "15%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Sexo */}
    <div className="bg-white rounded-lg shadow border border-[#e0e0e0] h-full">
      <div className="p-4 pb-2">
        <h2 className="text-lg font-medium m-0 text-black">Sexo</h2>
        <p className="text-sm text-black mt-1">Distribuição por sexo</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-black">4</div>
            <div className="text-sm text-black">Fêmeas</div>
            <div className="text-sm text-black">57% do rebanho</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-black">3</div>
            <div className="text-sm text-black">Machos</div>
            <div className="text-sm text-black">43% do rebanho</div>
          </div>
        </div>
      </div>
    </div>

    {/* Raças */}
    <div className="bg-white rounded-lg shadow border border-[#e0e0e0] h-full">
      <div className="p-4 pb-2">
        <h2 className="text-lg font-medium m-0 text-black">Raças</h2>
        <p className="text-sm text-black mt-1">Distribuição do rebanho</p>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-black">Murrah</span>
              <span className="font-medium text-black">3</span>
            </div>
            <div className="w-full h-2.5 bg-black-100 rounded-full mt-2">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "50%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-black">Mediterrâneo</span>
              <span className="font-medium text-black">2</span>
            </div>
            <div className="w-full h-2.5 bg-black-100 rounded-full mt-2">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "35%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-black">Jafabadi</span>
              <span className="font-medium text-black">1</span>
            </div>
            <div className="w-full h-2.5 bg-black-100 rounded-full mt-2">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "20%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-black">Carabao</span>
              <span className="font-medium text-black">1</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full mt-2">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "20%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Buffalo Records section */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
  <div>
    <h1 className="text-2xl font-bold text-black">Registro de Búfalos</h1>
    <p className="text-black">Lista completa do rebanho com 7 búfalos(as).</p>
  </div>
  <div className="overflow-x-auto w-full">
  <table className="w-full border-collapse min-w-[650px] bg-white rounded-lg overflow-hidden shadow-sm">
  <thead className="bg-[#f0f0f0]">
    <tr>
      <th className="p-3 text-center font-medium text-black text-base">TAG</th>
      <th className="p-3 text-center font-medium text-black text-base">Nome</th>
      <th className="p-3 text-center font-medium text-black text-base">Peso (kg)</th>
      <th className="p-3 text-center font-medium text-black text-base">Raça</th>
      <th className="p-3 text-center font-medium text-black text-base">Sexo</th>
      <th className="p-3 text-center font-medium text-black text-base">Última Atualização</th>
      <th className="p-3 text-center font-medium text-black text-base">Status</th>
      <th className="p-3 text-center font-medium text-black text-base">Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr className="bg-[#fafafa]">
      <td className="p-3 text-center text-black text-base">BF001</td>
      <td className="p-3 text-center text-black text-base">Aurora</td>
      <td className="p-3 text-center text-black text-base">650</td>
      <td className="p-3 text-center text-black text-base">Murrah</td>
      <td className="p-3 text-center text-black text-base">Fêmea</td>
      <td className="p-3 text-center text-black text-base">14/11/2023</td>
      <td className="p-3 text-center text-black text-base">
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Ativo</span>
      </td>
      <td className="p-3 text-center text-base">
        <button
          onClick={() => setModalAberto(true)}
          className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors"
        >
          Ver detalhes
        </button>
      </td>
    </tr>

    <tr className="bg-white">
      <td className="p-3 text-center text-black text-base">BF002</td>
      <td className="p-3 text-center text-black text-base">Mel</td>
      <td className="p-3 text-center text-black text-base">480</td>
      <td className="p-3 text-center text-black text-base">Mediterrâneo</td>
      <td className="p-3 text-center text-black text-base">Fêmea</td>
      <td className="p-3 text-center text-black text-base">05/11/2023</td>
      <td className="p-3 text-center text-black text-base">
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Inativo</span>
      </td>
      <td className="p-3 text-center text-base">
        <button
          onClick={() => setModalAberto(true)}
          className="bg-[#FFCF78] border-none text-black py-2 px-3.5 rounded-lg cursor-pointer text-sm font-bold hover:bg-[#f39c12] transition-colors"
        >
          Ver detalhes
        </button>
      </td>
    </tr>

  </tbody>
</table>

  </div>
</div>


        {/* Doenças Recorrentes section */}
        <div className="w-full max-w-[1200px] flex flex-col bg-white rounded-xl p-5 gap-4 box-border border border-[#e0e0e0] shadow-sm">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Doenças recorrentes */}
    <div className="bg-white rounded-lg shadow border border-[#e0e0e0] p-5">
      <h2 className="text-xl font-semibold text-black m-0">Doenças recorrentes</h2>
      <p className="text-sm text-black mt-1 mb-6">Doenças recorrentes registradas</p>

      <div className="flex flex-col gap-4">
        {[
          { nome: "Brucelose", percentual: 14.2 },
          { nome: "Mastite", percentual: 11.8 },
          { nome: "Febre Aftosa", percentual: 9.5 },
          { nome: "Tuberculose", percentual: 7.3 },
          { nome: "Dermatite", percentual: 6.1 },
        ].map((doenca, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-black">{doenca.nome}</span>
              <span className="text-sm font-medium text-black">{doenca.percentual.toFixed(1)}%</span>
            </div>
            <div className="w-full h-6 bg-black-100 rounded overflow-hidden">
              <div
                className="h-full bg-[#f59e0b] rounded flex items-center justify-end pr-2"
                style={{ width: `${doenca.percentual}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Doenças recorrentes por nível de maturidade */}
    <div className="bg-white rounded-lg shadow border border-[#e0e0e0] p-5">
      <h2 className="text-xl font-semibold text-black m-0">Doenças recorrentes por nível de maturidade</h2>
      <p className="text-sm text-black mt-1 mb-6">Doenças recorrentes registradas</p>

      <div className="flex flex-col gap-4">
        {[
          { categoria: "Bezerros", percentual: 45.0 },
          { categoria: "Novilhos", percentual: 20.0 },
          { categoria: "Adultos", percentual: 30.0 },
          { categoria: "Idosos", percentual: 5.0 },
        ].map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-black">{item.categoria}</span>
              <span className="text-sm font-medium text-black">{item.percentual.toFixed(2)}%</span>
            </div>
            <div className="w-full h-6 bg-black-100 rounded overflow-hidden">
              <div
                className="h-full bg-[#f59e0b] rounded flex items-center justify-end pr-2"
                style={{ width: `${item.percentual}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


        {/* Modal */}
        {modalAberto && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-4">
    <div className="bg-[#f8fbf7] rounded-lg p-6 w-full max-w-[1000px] max-h-[90vh] overflow-y-auto shadow-xl text-black">
      <h2 className="text-2xl font-bold mb-1">
        Prontuário: <span>{bufaloSelecionado.nome}</span> ({bufaloSelecionado.tag})
      </h2>
      <p className="text-base mb-5">Informações detalhadas e histórico animal</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Informações gerais */}
        <div className="bg-white p-5 rounded-xl shadow border border-[#e0e0e0] w-full md:w-auto text-black">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-black-100">
            Informações gerais
          </h3>
          <p className="text-left text-[0.95rem] mb-2.5 leading-relaxed">
            <strong className="text-black">TAG:</strong> {bufaloSelecionado.tag}
          </p>
          <p className="text-left text-[0.95rem] mb-2.5 leading-relaxed">
            <strong className="text-black">Nome:</strong> {bufaloSelecionado.nome}
          </p>
          <p className="text-left text-[0.95rem] mb-2.5 leading-relaxed">
            <strong className="text-black">Raça:</strong> {bufaloSelecionado.raca}
          </p>
          <p className="text-left text-[0.95rem] mb-2.5 leading-relaxed">
            <strong className="text-black">Sexo:</strong> {bufaloSelecionado.sexo}
          </p>
          <p className="text-left text-[0.95rem] mb-2.5 leading-relaxed">
            <strong className="text-black">Estágio:</strong> {bufaloSelecionado.estagio}
          </p>
          <p className="text-left text-[0.95rem] mb-2.5 leading-relaxed">
            <strong className="text-black">Peso atual:</strong> {bufaloSelecionado.peso} kg
          </p>
          <p className="text-left text-[0.95rem] mb-2.5 leading-relaxed">
            <strong className="text-black">Status:</strong>{" "}
            <span className="text-green-600 font-semibold">{bufaloSelecionado.status}</span>
          </p>
          <p className="text-left text-[0.95rem] mb-2.5 leading-relaxed">
            <strong className="text-black">Última Atualização:</strong> {bufaloSelecionado.ultimaAtualizacao}
          </p>
          <p className="text-left text-[0.95rem] mb-2.5 leading-relaxed">
            <strong className="text-black">Localização:</strong> {bufaloSelecionado.localizacao}
          </p>
        </div>

        {/* Histórico de registros */}
        <div className="bg-white rounded-lg p-5 flex-1 shadow border border-[#e0e0e0] text-black">
          <div className="flex justify-between items-center mb-4 border-b border-black-100 pb-2">
            <h3 className="text-lg font-semibold">Históricos de Registros</h3>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  abaAtiva === "zootecnico"
                    ? "bg-[#f2b84d] text-[#5c4b35]"
                    : "bg-black-100 text-black hover:bg-black-200"
                }`}
                onClick={() => setAbaAtiva("zootecnico")}
              >
                Zootécnico
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  abaAtiva === "sanitario"
                    ? "bg-[#f2b84d] text-[#5c4b35]"
                    : "bg-black-100 text-black hover:bg-black-200"
                }`}
                onClick={() => setAbaAtiva("sanitario")}
              >
                Sanitário
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[350px] pr-1">
            {bufaloSelecionado.historico
              .filter((item) => item.tipo === abaAtiva)
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-black-200 mb-4 shadow-sm text-left text-black"
                >
                  <div className="flex justify-between items-center mb-2 text-[0.9rem] border-b border-black-100 pb-2">
                    <span>{item.data}</span>
                    <strong>{item.profissional}</strong>
                  </div>

                  {item.tipo === "zootecnico" ? (
                    <>
                      <p className="my-1.5 text-[0.95rem]">
                        <strong>Peso:</strong> {item.peso} kg
                      </p>
                      <p className="my-1.5 text-[0.95rem]">
                        <strong>Condição corporal:</strong> {item.condicaoCorporal}
                      </p>
                      <p className="my-1.5 text-[0.95rem]">
                        <strong>Alimentação:</strong> {item.alimentacao}
                      </p>
                      <p className="my-1.5 text-[0.95rem]">
                        <strong>Observação:</strong> {item.observacao}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="my-1.5 text-[0.95rem]">
                        <strong>Medicamento:</strong> {item.medicamento}
                      </p>
                      <p className="my-1.5 text-[0.95rem]">
                        <strong>Dosagem:</strong> {item.dosagem}
                      </p>
                      <p className="my-1.5 text-[0.95rem]">
                        <strong>Doença:</strong> {item.doença}
                      </p>
                      <p className="my-1.5 text-[0.95rem]">
                        <strong>Data de Retorno:</strong> {item.dataRetorno}
                      </p>
                    </>
                  )}
                </div>
              ))}
            {bufaloSelecionado.historico.filter((item) => item.tipo === abaAtiva).length === 0 && (
              <p className="p-2">Nenhum registro encontrado.</p>
            )}
          </div>
        </div>
      </div>

      <div className="text-right mt-6">
        <button
          className="bg-[#fae7d6] text-[#5c4b35] px-5 py-2.5 rounded-md text-base font-bold cursor-pointer hover:bg-[#f2b84d] transition-colors"
          onClick={() => setModalAberto(false)}
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
)}

      </div>
  )
}

Rebanho.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};