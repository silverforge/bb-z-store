import { produceWithPatches, enablePatches } from 'immer';

enablePatches();

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

const newTheBookMakesYouCry = produceWithPatches<Book>(theBookMakesYouCry, draft => {
  // draft.publisher.name = 'Green Lemon';
  draft.authors.push({ firstName: 'Caoimhe', lastName: 'Duggan' });
  draft.price = 67.99;
});

console.log('theBookMakesYouCry ::: ', theBookMakesYouCry);
console.log();
console.log('copyOfTheBookMakesYouCry ::: ', copyOfTheBookMakesYouCry);
console.log();
console.log('newTheBookMakesYouCry ::: ', newTheBookMakesYouCry[0]);
console.log();
console.log('theBookMakesYouCry == copyOfTheBookMakesYouCry ::: ', Object.is(theBookMakesYouCry, copyOfTheBookMakesYouCry));
console.log('theBookMakesYouCry == newTheBookMakesYouCry ::: ', Object.is(theBookMakesYouCry, newTheBookMakesYouCry[0]));
console.log('theBookMakesYouCry.publisher == newTheBookMakesYouCry.publisher ::: ', Object.is(theBookMakesYouCry.publisher, newTheBookMakesYouCry[0].publisher));
console.log('theBookMakesYouCry.authors == newTheBookMakesYouCry.authors ::: ', Object.is(theBookMakesYouCry.authors, newTheBookMakesYouCry[0].authors));
console.log('theBookMakesYouCry.authors[0] == newTheBookMakesYouCry.authors[0] ::: ', Object.is(theBookMakesYouCry.authors[0], newTheBookMakesYouCry[0].authors[0]));
console.log();

console.log('changes ::: ', newTheBookMakesYouCry[1]);
console.log('inverse ::: ', newTheBookMakesYouCry[2]);
