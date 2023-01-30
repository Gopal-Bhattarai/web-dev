import { Paper, styled, Typography } from "@mui/material";
import { Name } from "./OwnerDetail";

const FooterSection = styled(Paper)`
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 5px;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterSection>
      <Typography sx={{mx:2}}>{Name}</Typography>
    </FooterSection>
  );
};

export default Footer;
