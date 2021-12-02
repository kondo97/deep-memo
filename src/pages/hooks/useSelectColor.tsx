import theme from "src/color/Theme"

const useSelectColor = (props: string) => {
  if(props === 'a') return theme.palette.postThemeA
  if(props === 'b') return theme.palette.postThemeB
  if(props === 'C') return theme.palette.postThemeC
  if(props === 'd') return theme.palette.postThemeD
  if(props === 'e') return theme.palette.postThemeE
  return theme.palette.primary
}

export default useSelectColor