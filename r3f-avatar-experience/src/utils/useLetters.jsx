/**
 * To separate letters and wrap it into RigidBody
 */

const useLetters = (obj) => {
  const letters = [];

  for (let key in obj) {
    if (key.startsWith('Text')) {
      let letter = obj[key];
      letters.push(letter);
    }
  }

  return letters;
};

export default useLetters;
