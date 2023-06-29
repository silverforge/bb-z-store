import { produce } from 'immer';

type Book = {
  title: string;
  authors: string;
  price: number;
}

const theBookMakesYouCry: Book = {
  title: 'Data Structures and Algorithms in Java (2nd edition)',
  authors: 'Martin Drummer, Kim Yu-son',
  price: 53.38,
}

const copyOfTheBookMakesYouCry = theBookMakesYouCry;
copyOfTheBookMakesYouCry.price = 45.59;

const newTheBookMakesYouCry = produce<Book>(theBookMakesYouCry, draft => {
  draft.authors = 'Julie Markus';
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
