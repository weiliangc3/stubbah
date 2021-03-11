const spaceCherryColour = '#be2931';
const chromeColour = '#949398';
const luxeLemonColour = '#f5df4d';
const white = '#FFF';
const black = '#000';
const headerFont = `
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  font-style: oblique;
  color: ${spaceCherryColour};
`;
const subheadingFontColour = chromeColour;
const subheadingFont = `
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
  font-style: oblique;
  color: ${subheadingFontColour}
`;
const mainFont = `
  font-family: 'ABeeZee', sans-serif;
  font-weight: normal;
  font-style: normal;
  color: ${black};
`;
const formLabelFont = `
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
  font-style: oblique;
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
const tableCellStyling = `
  margin: 4px 0;
  background-color: ${spaceCherryColour};
  color: ${white};
`;
const selectedTableCellColour = chromeColour;
const selectedTableFontColour = white;
const selectedTableCellStyling = `
  background-color: ${selectedTableCellColour} !important;
  color: ${selectedTableFontColour};
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
const buttonStyling = `
  ${mainFont};
  padding: 8px;
  background-color: ${luxeLemonColour};
  border: 2px solid ${chromeColour};
  border-radius: 8px;
`;

const defaultTheme = {
  bodyBackground: white,
  headerFont,
  subheadingFont,
  subheadingFontColour,
  mainFont,
  navFont: subheadingFont,
  navFontColour: chromeColour,
  headerBackground: luxeLemonColour,
  titleColour: spaceCherryColour,
  navBackground: white,
  tableStyling,
  selectedTableCellStyling,
  selectedTableCellColour,
  selectedTableFontColour,
  tableCellStyling,
  linkColour: spaceCherryColour,
  jsonTheme,
  formLabelFont,
  errorColour: spaceCherryColour,
  buttonStyling,
};

export default defaultTheme;
