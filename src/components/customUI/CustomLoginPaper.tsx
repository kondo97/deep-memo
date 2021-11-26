import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomLoginPaper = styled(Paper)({
  width: 350,
  padding: 50,
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
});

export default CustomLoginPaper;
