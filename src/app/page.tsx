import React from 'react'
import type { Book } from '@/types';
import dynamic from 'next/dynamic';
import IndexLoading from './loading';

const IndexClientPage = dynamic(() => import("./client"), { ssr: false, loading: IndexLoading });

export default async function IndexPage() {

  const api = {
    book: {
      list: async (): Promise<Book[]> => {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(import("./books.json").then((data) => data.library.map((datamap) => datamap.book)))
          }, 3000)
        })
      }
    }
  }

  const books: Book[] = await api.book.list();

  const genres: string[] = Array.from(new Set(books.map(book => book.genre)));
  return <IndexClientPage books={books} genres={genres} />
}
