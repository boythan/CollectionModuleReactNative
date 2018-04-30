/**
 * App Theme - Fonts
 */
import {Platform} from 'react-native';

function lineHeight(fontSize) {
  const multiplier = (fontSize > 20)
    ? 0.1
    : 0.33;
  return parseInt(fontSize + (fontSize * multiplier), 10);
}

const base = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'Lato-Regular'
    },
    android: {
      family: 'LatoRegular'
    }
  })
};

const semibold = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'Lato-Semibold'
    },
    android: {
      family: 'LatoSemibold'
    }
  })
};

const boldItalic = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'Lato-BoldItalic'
    },
    android: {
      family: 'LatoSemibold'
    }
  })
}

const italic = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'Lato Italic'
    },
    android: {
      family: 'LatoItalic'
    }
  })
}

const bold = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'Lato-Bold'
    },
    android: {
      family: 'LatoBold'
    }
  })
};

const black = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'Lato-Black'
    },
    android: {
      family: 'LatoBlack'
    }
  })
};

const light = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'Lato-Light'
    },
    android: {
      family: 'LatoLight'
    }
  })
};

export default AppFonts = {
  base: {
    ...base
  },
  bold: {
    ...bold
  },
  semibold: {
    ...semibold
  },
  italic: {
    ...italic
  },
  boldItalic: {
    ...boldItalic
  },
  black: {
    ...black
  },
  light: {
    ...light
  },
  h1: {
    ...bold,
    size: base.size * 1.75,
    lineHeight: lineHeight(base.size * 2)
  },
  h2: {
    ...bold,
    size: base.size * 1.5,
    lineHeight: lineHeight(base.size * 1.75)
  },
  h3: {
    ...semibold,
    size: base.size * 1.25,
    lineHeight: lineHeight(base.size * 1.5)
  },
  h4: {
    ...base,
    size: base.size * 1.1,
    lineHeight: lineHeight(base.size * 1.25)
  },
  h5: {
    ...base
  },
  lineHeight: (fontSize) => lineHeight(fontSize)
}