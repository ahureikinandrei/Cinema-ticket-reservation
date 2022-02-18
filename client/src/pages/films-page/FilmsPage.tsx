import React, { FC, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchInput from '../../components/search/search-input/SearchInput';
import Categories from '../../components/categories/Categories';
import Films from '../../components/films/Films';
import FilmService from '../../services/film.service';
import { IFilm } from '../../services/types';
import Pages from '../../components/pagination/Pages';
import { UNEXPECTED_ERROR } from '../../constants/messages';
import { FILMS_ON_PAGE } from '../../constants/filmConstants';
import style from './filmsPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { getSearchParams } from '../../redux/search-films/selectors';

const FilmsPage: FC = () => {
    const [films, setFilms] = useState<IFilm[]>([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useAppSelector(getSearchParams);

    const getFilms = async (): Promise<void> => {
        try {
            const { data } = await FilmService.getFilms(
                page,
                FILMS_ON_PAGE,
                searchParams
            );

            setFilms(data.films);
            setTotalPages(data.total);
        } catch (e) {
            if (e.response) {
                setError(e.response.data?.message || UNEXPECTED_ERROR);
            }
        }
    };

    useEffect(() => {
        console.log(123);
        getFilms();
    }, [searchParams, page]);

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
                                    <Films films={films} />
                                    <Row>
                                        <Pages
                                            filmsCount={totalPages}
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
