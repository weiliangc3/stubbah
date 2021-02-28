import Theme from './Theme';

const spaceCherryColour = '#be2931';
const chromeColour = '#949398';
const luxeLemonColour = '#f5df4d';
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
const primaryFontSize = '71px';

const defaultTheme: Theme = {
  headerBackground: luxeLemonColour,
  headerFont: primaryFont,
  headerFontColour: spaceCherryColour,
};

export default defaultTheme;
