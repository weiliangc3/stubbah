const spaceCherryColour = '#be2931';
const chromeColour = '#949398';
const luxeLemonColour = '#f5df4d';
const white = '#FFF';
const primaryFont = `
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  font-style: oblique;
`;
const secondaryFont = `
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
  font-style: oblique;
`;
const tertiaryFont = `
  font-family: 'ABeeZee', sans-serif;
  font-weight: normal;
  font-style: normal;
`;
const tableStyling = `
  width: 100%;

  & td, & th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  & tr:nth-child(even){
    background-color: #f2f2f2;
  }

  & tr:hover {
    background-color: ${chromeColour};
    color: ${white};
    & a {
      color: ${luxeLemonColour};
    }
  }

  & th {
    padding-top: 16px;
    padding-bottom: 16px;
    text-align: left;
    background-color: ${spaceCherryColour};
    color: ${white};
  }
  & a {
    color: ${spaceCherryColour};
  }
`;

const defaultTheme = {
  headerBackground: luxeLemonColour,
  headerFont: primaryFont,
  headerFontColour: spaceCherryColour,
  subheadingFont: secondaryFont,
  subheadingColour: chromeColour,
  titleColour: spaceCherryColour,
  mainFont: tertiaryFont,
  navBackground: white,
  navFont: secondaryFont,
  navFontColour: chromeColour,
  tableStyling,
  linkColour: chromeColour,
};

export default defaultTheme;
