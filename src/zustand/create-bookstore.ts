import { create } from 'zustand';

type PreparedBook = {
  id: string;
  title: string;
  publisher: string;
  authors: string;
  price: number;
  genre: string;
  archived: boolean;
}

type BookState = PreparedBook & {
  fillBookData: (bookData: Partial<BookState>) => void;
  fillMainData: (title: string, authors: string, price: number) => void;
  archive: () => void;
  getBookData: () => PreparedBook;
}

const useMyBookStore = create<BookState>((set, get) => ({
  archived: false,
  authors: "",
  genre: "",
  id: "",
  price: 0,
  publisher: "",
  title: "",

  fillBookData: (bookData: Partial<BookState>) => {
    set({ archived: false });
    set({ id: crypto.randomUUID() });
    set({ ...bookData });
  },
  fillMainData: (title: string, authors: string, price: number) => {
    set({ title, authors, price });
    set({ archived: false });
  },
  archive: () => {
    set({ archived: true });
  },
  getBookData: () => {
    return {
      archived: get().archived,
      authors: get().authors,
      genre: get().genre,
      id: get().id,
      price: get().price,
      publisher: get().publisher,
      title: get().title,
    } as PreparedBook
  },
}));

useMyBookStore.getState().fillBookData({
  title: 'Digital Control Engineering (Third Edition)',
  authors: 'M. Sami Fadali, Antonio Visioli',
  price: 34.63,
  genre: 'Horror',
  publisher: 'Apple Tree',
});

useMyBookStore.getState().archive();

const book = useMyBookStore.getState().getBookData();
console.log('finished book data ::: ', book);

useMyBookStore.getState().fillMainData('Physics I for Dummies', 'Angel Blue', 73.89);
const book2 = useMyBookStore.getState().getBookData();
console.log('refilled book data ::: ', book2);
