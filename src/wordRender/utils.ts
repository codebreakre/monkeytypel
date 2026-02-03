export const getClassName = (
  originalCharacter?: string,
  userCharacter?: string,
): string => {
  let style: string = "";

  if (!originalCharacter) {
    // Extra bichigdsen uyed iishee orno
    style = "text-[#ff3333]";
  } else if (!userCharacter) {
    // hereglech bichij amjaagui bgaa characteruud ingej render hiigdene
    style = "";
  } else if (originalCharacter === userCharacter) {
    // zuv bichigdsen character
    style = "text-[#ffffff]";
  } else {
    //  buyu buruu bichsn uyd
    style = "text-[#ef4444]";
  }
  return style;
};

export const getLongest = (aWord: string, bWord: string) => {
  if (aWord.length >= bWord.length) {
    return aWord;
  }
  return bWord;
};
