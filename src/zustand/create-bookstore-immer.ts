import { create } from 'zustand';
import { produce } from 'immer';

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
    set(produce<BookState>(draft => {
      draft.archived = false;
      draft.id = crypto.randomUUID();
      // @ts-ignore
      Object.keys(bookData).forEach(k => draft[k] = bookData[k]);
    }));
  },
  fillMainData: (title: string, authors: string, price: number) => {
    set(produce<BookState>(draft => {
      draft.title = title;
      draft.authors = authors;
      draft.price = price;
      draft.archived = false;
    }));
  },
  archive: () => {
    const producedStateFunc = produce<BookState>(draft => {
      draft.archived = true;
    });
    // console.log('original state ::: ', get());
    // console.log('produced state - only archive got updated ::: ', producedState(get()));
    set(producedStateFunc);
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
