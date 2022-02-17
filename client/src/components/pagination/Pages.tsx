import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';
import { FILMS_ON_PAGE } from '../../constants/filmConstants';

interface IPagesProps {
    filmsCount: number;
    currentPage: number;
    setPage: (page: number) => void;
}

const Pages: FC<IPagesProps> = ({ filmsCount, currentPage, setPage }) => {
    const pageCount: number = Math.ceil(filmsCount / FILMS_ON_PAGE);
    const pages = [];

    for (let i = 0; i < pageCount; i += 1) {
        pages.push(i + 1);
    }

    return (
        <Pagination className="mt-3">
            {pages.map((page) => (
                <Pagination.Item
                    key={page}
                    active={currentPage === page}
                    onClick={() => {
                        setPage(page);
                    }}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};

export default Pages;
