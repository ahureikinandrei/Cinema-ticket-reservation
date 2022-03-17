import React, { FC, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchInput from '../../components/search/search-input/SearchInput';
import Categories from '../../components/categories/Categories';
import Films from '../../components/films/Films';
import Pages from '../../components/pagination/Pages';
import FilmService from '../../services/film.service';
import { IFilm } from '../../services/types';
import { useAppSelector } from '../../hooks/redux';
import { getSearchParams } from '../../redux/search-films/selectors';
import { NO_RESULT, UNEXPECTED_ERROR } from '../../constants/messages';
import { FILMS_ON_PAGE } from '../../constants/filmConstants';
import style from './filmsPage.module.scss';

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

            if (data.films.length) {
                setError('');
                setFilms(data.films);
                setTotalPages(data.total);
                return;
            }

            setError(NO_RESULT);
        } catch (e) {
            if (e.response) {
                setError(e.response.data?.message || UNEXPECTED_ERROR);
            }
        }
    };

    useEffect(() => {
        getFilms();
    }, [searchParams, page]);

    return (
        <main className={style.wrapper}>
            <Container className={style.content}>
                <Row className="d-flex justify-content-center">
                    <SearchInput />
                </Row>
                <Row>
                    <Col md={3}>
                        <Categories />
                    </Col>
                    <Col md={9} className="d-flex flex-column text-light">
                        {error || (
                            <>
                                <Films films={films} />
                                <Pages
                                    filmsCount={totalPages}
                                    currentPage={page}
                                    setPage={setPage}
                                />
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default FilmsPage;
