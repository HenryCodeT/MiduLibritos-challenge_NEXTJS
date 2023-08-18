'use client';

import type { Book } from '@/types';
import { useState, useMemo, useEffect } from 'react';

export default function IndexClientPage({ books, genres }: { books: Book[], genres: Book["genre"][] }) {
  const [genre, setGenre] = useState<Book['genre']>("");
  const [readList, setReadList] = useState<Book["ISBN"][]>([]);

  const matches = useMemo(() => {
    if (!genre) return books;
    return books.filter((book) => book.genre === genre);
  }, [genre, books])

  const api = {
    readList: {
      update: (readList: Book["ISBN"][]) => localStorage.setItem("readList", JSON.stringify(readList)),
      onchange: (callback: (readList: Book["ISBN"][]) => void) => {
        function getReadList() {
          const readList = JSON.parse(localStorage.getItem("readList") ?? "[]") as Book["ISBN"][];
          callback(readList);
        }
        window.addEventListener("storage", getReadList);
        getReadList();

        return () => window.removeEventListener("storage", getReadList)
      }
    }
  }
  function handleBookClick(bookISBN: Book['ISBN']) {
    const draft = readList.includes(bookISBN)
      ? readList.filter(readBook => readBook !== bookISBN)
      : [...readList, bookISBN]
    setReadList(draft);
    api.readList.update(draft);
  }
  useEffect(() => {
    const unsuscribe = api.readList.onchange(setReadList);
    return () => unsuscribe();
  }, [])


  return (
    <article>
      <nav>
        <select value={genre} onChange={(event) => setGenre(event.target.value)}>
          <option value="" >Todos</option>
          {genres.map((genre, id) => (
            <option key={id} value={genre} >{genre}</option>
          )
          )}
        </select>
      </nav>
      <ul className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
        {matches.map((book) => (
          <li key={book.ISBN} className='grid gap-2' onClick={() => handleBookClick(book.ISBN)}>
            <img alt={book.title} src={book.cover} className='aspect-[9/14] object-cover' />
            <p>
              {readList.includes(book.ISBN) && <span>⭐</span>}
              {book.title}
            </p>
          </li>
        ))}
      </ul>
    </article >
  )
}
