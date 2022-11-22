import React from 'react';
import supabase from 'utils/supabase';

function useBooks(search: string) {
  const [books, setBooks] = React.useState<Array<any> | null>([]);

  React.useEffect(() => {
    const fetchBooks = async () => {
      let { data, error } = await supabase.from('books').select('*');

      if (data) {
        const dataFilter = data.filter(
          (book) =>
            book.active &&
            book.copies > 0 &&
            book.title.toLowerCase().indexOf(search.toLowerCase()) > -1
        );

        setBooks(dataFilter);
      }
    };
    fetchBooks();
  }, [search]);

  return { books };
}

export default useBooks;
