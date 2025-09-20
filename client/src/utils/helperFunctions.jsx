export const trimmedAbout = (str) => {
    const strArr = str.split(" ");

    if (strArr.length > 30) {
      str = strArr.slice(0, 30).join(" ") + "...";
    }
    return str;
  };

export const capitalize = (str) => {
    const capLetter = str[0].toUpperCase();
    const restLetters = str.slice(1)
    return capLetter + restLetters
  }