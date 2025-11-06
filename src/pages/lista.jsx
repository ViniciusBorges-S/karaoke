import React, { useState, useEffect } from 'react';
import '../index.css';
import { Container, Row, Col, Spinner } from 'reactstrap';

export default function Lista() {
    const [musicas, setMusicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nacional, setNacional] = useState(true);
    const [internacionais, setInternacionais] = useState([]);
    const [musicasNac, setMusicasNac] = useState([]);

    const loadNacionais = async () => {
        setLoading(true);
        try {
            const res = await fetch('/musicList/musicas-nac.json');
            const data = await res.json();
            setMusicasNac(data);
            setMusicas(data);
        } catch (err) {
            console.error('Erro carregando músicas nacionais:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadInternacionais = async () => {
        setLoading(true);
        try {
            const res = await fetch('/musicList/musicas-inter.json');
            const data = await res.json();
            setInternacionais(data);
            setMusicas(data);
        } catch (err) {
            console.error('Erro carregando músicas internacionais:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Carrega nacionais ao montar
        loadNacionais();
    }, []);

    const handleSetNacional = () => {
        if (!nacional) {
            setNacional(true);
            if (musicasNac.length > 0) {
                setMusicas(musicasNac);
            } else {
                loadNacionais();
            }
        }
    };

    const handleSetInternacionais = () => {
        if (nacional) {
            setNacional(false);
            if (internacionais.length > 0) {
                setMusicas(internacionais);
            } else {
                loadInternacionais();
            }
        }
    };

    return (
        <Container className="h-100 text-center container mb-5" id="pesquisar">
            <Row className="mb-3">
                <Col md={12} xs={12}>
                    <h2>Lista de Músicas</h2>
                </Col>
            </Row>
            <div className='fixedFilter'>
                <div className={`buttonFilter ${nacional ? 'active' : ''}`} onClick={handleSetNacional}>
                    <p>Nacionais</p>
                </div>
                <div className={`buttonFilter ${!nacional ? 'active' : ''}`} onClick={handleSetInternacionais}>
                    <p>Internacionais</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-4"><Spinner color="white" /></div>
            ) : (
                musicas && musicas.map((m, index) => (
                    <div className="row no-gutters border-bottom align-items-center py-3" key={index}>
                        <div className="col-3 p-0">
                            <p className="m-0">{m['NUMERO'] || m['NÚMERO'] || m['numero']}</p>
                        </div>
                        <div className="col-9">
                            <p className="m-0">{m['MUSICA'] || m['MÚSICA'] || m['musica']}</p>
                            <small>{m['cantor'] || m['CANTOR'] || m['Cantor']}</small>
                        </div>
                    </div>
                ))
            )}
        </Container>
    );
}
