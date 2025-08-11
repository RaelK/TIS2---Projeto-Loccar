import React, { useEffect, useState } from "react";
import axios from "axios";

const BuscarVeiculo = () => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [dataDesejada, setDataDesejada] = useState("");
  const [tipoVeiculo, setTipoVeiculo] = useState("");
  const [veiculos, setVeiculos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [resultado, setResultado] = useState([]);

  // Carrega veículos disponíveis
  useEffect(() => {
    axios.get("http://localhost:8080/api/veiculos/disponiveis")
      .then(response => setVeiculos(response.data))
      .catch(error => console.error("Erro ao buscar veículos disponíveis:", error));
  }, []);

  // Carrega categorias reais do banco
  useEffect(() => {
    axios.get("http://localhost:8080/api/veiculos/categorias")
      .then(response => setCategorias(response.data))
      .catch(error => console.error("Erro ao buscar categorias:", error));
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();

    if (!nomeCliente || !dataDesejada) {
      alert("Preencha o nome do cliente e a data desejada.");
      return;
    }

    const filtrados = tipoVeiculo
      ? veiculos.filter(v => v.categoria === tipoVeiculo)
      : veiculos;

    setResultado(filtrados);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>Buscar Veículos</h2>

      <form onSubmit={handleBuscar}>
        <div style={{ marginBottom: 12 }}>
          <label>Nome do Cliente:</label><br />
          <input
            type="text"
            value={nomeCliente}
            onChange={e => setNomeCliente(e.target.value)}
            placeholder="Digite seu nome"
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Data Desejada:</label><br />
          <input
            type="date"
            value={dataDesejada}
            onChange={e => setDataDesejada(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Tipo de Veículo:</label><br />
          <select
            value={tipoVeiculo}
            onChange={e => setTipoVeiculo(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="">Selecione o tipo</option>
            {categorias.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">🔍 Buscar</button>
      </form>

      <hr />

      <h3>Veículos Disponíveis</h3>
      {resultado.length === 0 ? (
        <p>Nenhum veículo encontrado.</p>
      ) : (
        <ul>
          {resultado.map((v, index) => (
            <li key={index} style={{ marginBottom: "16px" }}>
              <strong>{v.marca}</strong><br />
              Placa: {v.placa}<br />
              Diária: R$ {v.diaria.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscarVeiculo;