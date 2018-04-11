export default {
  indexOfSubString(text, subText) {
    let positons = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === subText[0]) {
        let checkIndex = true;
        for (let j = 0; j < subText.length; j++) {
          if (!text[i + j] || subText[j] !== text[i + j]) {
            checkIndex = false;
          }

        }
        if (checkIndex) {
          positons.push(i + 1);
        }
      }
    }
    return positons;
  }
}