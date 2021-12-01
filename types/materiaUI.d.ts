import * as createPalette from '@mui/material/styles/createPalette';
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    postThemeA?: PaletteColorOptions;
    postThemeB?: PaletteColorOptions;
    postThemeC?: PaletteColorOptions;
    postThemeD?: PaletteColorOptions;
    postThemeE?: PaletteColorOptions;
  }
  interface Palette {
    postThemeA: PaletteColor;
    postThemeB: PaletteColor;
    postThemeC: PaletteColor;
    postThemeD: PaletteColor;
    postThemeE: PaletteColor;
  }
}

declare module '@mui/material/Radio' {
  interface RadioPropsColorOverrides {
    postThemeA, postThemeB, postThemeC, postThemeD, postThemeE 
  }
}
