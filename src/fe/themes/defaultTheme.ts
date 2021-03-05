const spaceCherryColour = '#be2931';
const chromeColour = '#949398';
const luxeLemonColour = '#f5df4d';
const white = '#FFF';
const black = '#000';
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
const jsonGreen = '#24803c';
const jsonYellow = '#968d0f';
const jsonBlue = '#0d58ba';
const jsonTheme = `
  font-family: 'Courier New', 'Courier', monospace;
  line-height: 1.3;
  color: ${black};
  font-weight: 400;
  font-size: 14px;
  white-space: pre-wrap;
  word-wrap: break-word

  & .__json-key__{
    color: ${jsonGreen};
  }

  & .__json-value__ {
    font-weight: 600;
    color: ${jsonBlue};
  }

  & .__json-string__ {
    font-weight: 600;
    color: ${spaceCherryColour};
  }

  & .__json-boolean__ {
    font-weight: 600;
    color: ${jsonYellow};
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
  jsonTheme,
};

export default defaultTheme;
