import { produce } from 'immer';

type Book = {
  title: string;
  publisher: {
    name: string;
  }
  authors: {
    firstName: string;
    lastName: string;
  }[];
  price: number;
}

const theBookMakesYouCry: Book = {
  title: 'Data Structures and Algorithms in Java (2nd edition)',
  publisher: {
    name: 'Blue Algae'
  },
  authors: [{ firstName: 'Martin', lastName: 'Drummer' }, { firstName: 'Kim', lastName: 'Yu-son' }],
  price: 53.38,
}

const copyOfTheBookMakesYouCry = theBookMakesYouCry;
copyOfTheBookMakesYouCry.price = 45.59;
copyOfTheBookMakesYouCry.publisher.name = 'Red Ant';

const newTheBookMakesYouCry = produce<Book>(theBookMakesYouCry, draft => {
  // draft.publisher.name = 'Green Lemon';
  draft.authors.push({ firstName: 'Caoimhe', lastName: 'Duggan' });
  draft.price = 67.99;
});

console.log('theBookMakesYouCry ::: ', theBookMakesYouCry);
console.log();
console.log('copyOfTheBookMakesYouCry ::: ', copyOfTheBookMakesYouCry);
console.log();
console.log('newTheBookMakesYouCry ::: ', newTheBookMakesYouCry);
console.log();
console.log('theBookMakesYouCry == copyOfTheBookMakesYouCry ::: ', Object.is(theBookMakesYouCry, copyOfTheBookMakesYouCry));
console.log('theBookMakesYouCry == newTheBookMakesYouCry ::: ', Object.is(theBookMakesYouCry, newTheBookMakesYouCry));
console.log('theBookMakesYouCry.publisher == newTheBookMakesYouCry.publisher ::: ', Object.is(theBookMakesYouCry.publisher, newTheBookMakesYouCry.publisher));
console.log('theBookMakesYouCry.authors == newTheBookMakesYouCry.authors ::: ', Object.is(theBookMakesYouCry.authors, newTheBookMakesYouCry.authors));
console.log('theBookMakesYouCry.authors[0] == newTheBookMakesYouCry.authors[0] ::: ', Object.is(theBookMakesYouCry.authors[0], newTheBookMakesYouCry.authors[0]));
