import React, { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import style from './filmsPage.module.scss';
import SearchInput from '../../components/search/search-input/SearchInput';
import Categories from '../../components/categories/Categories';
import Films from '../../components/films/Films';

const FilmsPage: FC = () => {
    return (
        <main className={style.content}>
            <Container>
                <Row className="d-flex flex-column">
                    <Row className="d-flex justify-content-center">
                        <SearchInput />
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Categories />
                        </Col>
                        <Col md={9}>
                            <Films />
                        </Col>
                        <Row />
                    </Row>
                </Row>
            </Container>
        </main>
    );
};

export default FilmsPage;
