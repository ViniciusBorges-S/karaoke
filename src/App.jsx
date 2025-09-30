import { useEffect, useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Input, Row, Table } from 'reactstrap';


function App() {
  const [musicas, setMusicas] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch('/musicList/musics.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setMusicas(data);
      });
  }, []);

  let filtradas = [];
  const buscaLower = busca.toLowerCase();
  const minBusca = buscaLower.length >= 3;

  const removerAcentos = (str) => {
    return str
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, ""); 
  };
  if (minBusca) {
  const buscaNormalizada = removerAcentos(buscaLower);

  filtradas = musicas.filter((m) => {
    const musica = removerAcentos(
      (typeof m['musica'] === 'string' ? m['musica'] : String(m['musica'] || '')).toLowerCase()
    );
    const cantor = removerAcentos(
      (typeof m['cantor'] === 'string' ? m['cantor'] : String(m['cantor'] || '')).toLowerCase()
    );

    return musica.includes(buscaNormalizada) || cantor.includes(buscaNormalizada);
  });
}

  return (
    <>
      <Container className="h-100 text-center container" id='pesquisar'>
        <Row className="mb-3">
          <Col md={12} xs={12}>
            <Input
              placeholder="Buscar música ou cantor"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </Col>
        </Row>

        {minBusca ? (
          filtradas.length > 0 ? (
            <>
              <div className='row no-gutters'>
                <div className='col-3 p-0 border-bottom'>
                  <h5>Número</h5>
                </div>
                <div className='col-9 border-bottom'>
                  <h5>Música</h5>
                </div>

              </div>

              {filtradas.map((m, idx) => (
                <div className='row no-gutters border-bottom align-items-center py-3' key={idx}>
                  <div className='col-3 p-0'>
                    <p className='m-0'>{m['numero']}</p>
                  </div>
                  <div className='col-9'>
                    <p className='m-0'>{m['musica']}</p>
                    <small>{m['cantor']}</small>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="mt-4">Nenhuma música encontrada.</div>
          )
        ) : (
          <div className="mt-4">Digite ao menos 3 caracteres para buscar.</div>
        )}
      </Container>
    </>
  );
}

export default App;
