/**
 * App Theme - Colors
 */
const app = {
  background: '#FFF',
  cardBackground: '#FFFFFF',
  listItemBackground: '#FFFFFF',
  imageBackground: '#d6d6d6',
  imageIconBackGround:'#A0ABBE',
  white: 'rgba(255,255,255,1)',
  black: 'rgba(0,0,0,1)',
  transparent: 'rgba(0,0,0,0)',
  green: '#6ACB40',
  pink: '#FF5656',
  orange: '#EE8432',
  blue: 'rgba(30, 160, 208, 1)',
  cerulean:'#009BD5',
  red: '#FF203B',
  lightgray: '#efefef',
  gray: '#999',
  darkgray: '#333',
  purple: '#DA439F',
  blueBackground: '#42A5F5',
  blueFacebook: '#366AA7',
  blueTwitter: '#55ACEE',
  redGoogle: '#D12122',
  divider: '#d3dfe4',
  iconGray: 'rgba(180,180,180,1)',
  lineGray: 'rgba(237,237,237,1)',
  statusbar: '#2b3545',
  sectionText: '#788793',
  addMoreButton: 'rgba(0, 0, 0, 0.2)',

  iconColor: '#9fadb4'
};

const brand = {
  brand: {
    primary: '#FFF',
    secondary: '#17233D',
  },
};

const text = {
  textNavbar: '#fff',
  textPrimary: '#131313',
  textSecondary: '#909090',
  textMinor: '#CCCCCC',
  textRed: '#F42F47',
  textBlue: '#00aedd',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
  textTitle: '#68737f',
  textContent: 'rgba(52, 64, 82, 1)',
  textSubContent: 'rgba(52, 64, 82, 0.5)',
  regular: '#344052',
  placeHolder: 'rgba(0,0,0,0.3)'
};

const borders = {
  border: '#DFDFDF',
};

const ticked = {
  ticked: '#39CE13',
};

const tabbar = {
  tabbar: {
    background: { active: '#f9f9f9', inactive: '#f9f9f9' },
  },
};

const navbar = {
  navbar: {
    background: '#343f51'
  }
}

const searchbar = {
  searchbar: {
    background: '#343f51',
    textInput: '#9FADB4',
    backgroundText: '#434F61',
  }
}

const dialog = {
  dialogBody: 'rgba(238, 241, 242, 1)',
  dialogDivider: 'rgba(205, 217, 223, 1)',
}

export default AppColors = {
  ...app,
  ...brand,
  ...text,
  ...borders,
  ...tabbar,
  ...navbar,
  ...dialog,
  ...searchbar,
  ...ticked,
};
