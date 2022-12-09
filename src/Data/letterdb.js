const allLeters = () => {
  const defineLetters = [
    { letter: "a", points: 1, quantity: 9 },
    { letter: "b", points: 3, quantity: 2 },
    { letter: "c", points: 3, quantity: 2 },
    { letter: "d", points: 2, quantity: 4 },
    { letter: "e", points: 1, quantity: 12 },
    { letter: "f", points: 4, quantity: 2 },
    { letter: "g", points: 2, quantity: 3 },
    { letter: "h", points: 4, quantity: 2 },
    { letter: "i", points: 1, quantity: 9 },
    { letter: "j", points: 8, quantity: 1 },
    { letter: "k", points: 5, quantity: 1 },
    { letter: "l", points: 1, quantity: 4 },
    { letter: "m", points: 3, quantity: 2 },
    { letter: "n", points: 1, quantity: 6 },
    { letter: "o", points: 1, quantity: 8 },
    { letter: "p", points: 3, quantity: 2 },
    { letter: "q", points: 10, quantity: 1 },
    { letter: "r", points: 1, quantity: 6 },
    { letter: "s", points: 1, quantity: 4 },
    { letter: "t", points: 1, quantity: 6 },
    { letter: "u", points: 1, quantity: 4 },
    { letter: "v", points: 4, quantity: 2 },
    { letter: "w", points: 4, quantity: 2 },
    { letter: "x", points: 8, quantity: 1 },
    { letter: "y", points: 4, quantity: 2 },
    { letter: "z", points: 10, quantity: 1 },
    { letter: "blank", points: 0, quantity: 2 },
  ];
  let allLetters = [];

  defineLetters.map((ell) => {
    let quantity = ell.quantity;
    while (quantity > 0) {
      allLetters.push(ell);
      quantity--;
    }
    return allLeters;
  });

  const randomize = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  randomize(allLetters);

  return allLetters;
};

export default allLeters;
