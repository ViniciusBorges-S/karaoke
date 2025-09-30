import React, { useState, useEffect } from 'react';
import '../index.css';
import { Container, Row, Col, Spinner } from 'reactstrap';

export default function Lista() {
    const [musicas, setMusicas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/musicList/musics.json')
            .then((res) => res.json())
            .then((data) => {
                setMusicas(data);
                setLoading(false);
            })
            .catch((err) => console.error('Erro carregando músicas:', err));
    }, []);


    return (
        <Container className="h-100 text-center container" id="pesquisar">
            <Row className="mb-3">
                <Col md={12} xs={12}>
                    <h2>Lista de Músicas</h2>
                </Col>
            </Row>

            {loading ? <Spinner color="white" /> : musicas && musicas.map((m, index) => (
                <div className="row no-gutters border-bottom align-items-center py-3" key={index}>
                    <div className="col-3 p-0">
                        <p className="m-0">{m['numero'] || m['NÚMERO']}</p>
                    </div>
                    <div className="col-9">
                        <p className="m-0">{m['musica'] || m['MÚSICA']}</p>
                        <small>{m['cantor'] || m['CANTOR']}</small>
                    </div>
                </div>
            ))}
        </Container>
    );
}
