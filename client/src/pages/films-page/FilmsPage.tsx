import React, { FC, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchInput from '../../components/search/search-input/SearchInput';
import Categories from '../../components/categories/Categories';
import Films from '../../components/films/Films';
import FilmService from '../../services/film.service';
import style from './filmsPage.module.scss';
import { IFilm } from '../../services/types';
import Pages from '../../components/pagination/Pages';
import { UNEXPECTED_ERROR } from '../../constants/messages';
import { FILMS_ON_PAGE } from '../../constants/filmConstants';

const filmsOnCurrentPage = (
    films: IFilm[],
    currentPage: number,
    filmsOnPage: number
): IFilm[] => {
    return films.slice(
        (currentPage - 1) * filmsOnPage,
        currentPage * filmsOnPage
    );
};

const FilmsPage: FC = () => {
    const [films, setFilms] = useState<IFilm[]>([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);

    const getFilms = async (): Promise<void> => {
        try {
            const response = await FilmService.getFilms();
            setFilms(response.data);
        } catch (e) {
            if (e.response) {
                setError(e.response.data?.message || UNEXPECTED_ERROR);
            }
        }
    };

    useEffect(() => {
        getFilms();
    }, []);

    return (
        <main className={style.content}>
            <Container className="d-flex flex-grow-1 flex-column">
                <Row className="d-flex flex-column flex-grow-1">
                    <Row className="d-flex justify-content-center">
                        <SearchInput />
                    </Row>
                    <Row className="flex-grow-1">
                        <Col md={3}>
                            <Categories />
                        </Col>
                        <Col md={9} className="d-flex flex-column text-light">
                            {error || (
                                <>
                                    <Films
                                        films={filmsOnCurrentPage(
                                            films,
                                            page,
                                            FILMS_ON_PAGE
                                        )}
                                    />
                                    <Row>
                                        <Pages
                                            filmsCount={films.length}
                                            currentPage={page}
                                            setPage={setPage}
                                        />
                                    </Row>
                                </>
                            )}
                        </Col>
                    </Row>
                </Row>
            </Container>
        </main>
    );
};

export default FilmsPage;
