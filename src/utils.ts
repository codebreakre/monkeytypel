export const getClassName = (originalCharacter?: string, userCharacter?: string): string => {

    if (!originalCharacter) { // Extra bichigdsen uyed iishee orno
        return 'text-yellow-500';
    }

    if (!userCharacter) { // hereglech bichij amjaagui bgaa characteruud ingej render hiigdene
        return ''
    }

    if (originalCharacter === userCharacter) { // zuv bichigdsen character
        return 'text-white';
    }

    // buruu bichigdsen
    return 'text-red-500'


}




export const getLongest = (aWord: string, bWord: string) => {
  if (aWord.length >= bWord.length) {
    return aWord;
  }
  return bWord;
}

