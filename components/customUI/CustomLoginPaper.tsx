import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "styles/Home.module.css";

const CustomLoginPaper = styled(Paper)({
  width: 500,
  padding: 50,
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translateX(-50%) translateY(-50%)'
});

export default CustomLoginPaper