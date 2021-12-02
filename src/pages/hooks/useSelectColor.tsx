import theme from "src/color/Theme"

const useSelectColor = (props: string) => {
  let postColor
  if(props === 'a') return postColor = theme.palette.postThemeA
  if(props === 'b') return postColor = theme.palette.postThemeB
  if(props === 'C') return postColor = theme.palette.postThemeC
  if(props === 'd') return postColor = theme.palette.postThemeD
  if(props === 'e') return postColor = theme.palette.postThemeE
  return postColor = theme.palette.primary
}

export default useSelectColor