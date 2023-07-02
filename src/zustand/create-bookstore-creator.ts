import { Draft, produce } from "immer";
import { StateCreator, create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

type SetState<T> = (stateRecipeFunc: (state: Draft<T>) => void) => void;

const createZedStore = <T>(stateDef: (setState: SetState<T>, getState: () => T) => T) => {
  const stateCreatorDefinition: StateCreator<T, [], []> = (set, get) => {
    const setStateFunc = (stateRecipeFunc: (state: Draft<T>) => void) => set(produce<T>(stateRecipeFunc));
    const getStateFunc = () => get();

    return stateDef(setStateFunc, getStateFunc);
  }

  return create<T>(stateCreatorDefinition);
}

// -----------------------------------------------------------------------------

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

const useMyBookStore = createZedStore<BookState>((set, get) => ({
  archived: false,
  authors: "",
  genre: "",
  id: "",
  price: 0,
  publisher: "",
  title: "",

  fillBookData: (bookData: Partial<BookState>) => {
    set(draft => {
      draft.archived = false;
      draft.id = uuidv4();
      // @ts-ignore
      Object.keys(bookData).forEach(k => draft[k] = bookData[k]);
    });
  },
  fillMainData: (title: string, authors: string, price: number) => {
    set(draft => {
      draft.title = title;
      draft.authors = authors;
      draft.price = price;
      draft.archived = false;
    });
  },
  archive: () => {
    set(draft => {
      draft.archived = true;
    });
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
