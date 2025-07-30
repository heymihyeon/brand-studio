import { SvgIcon, SvgIconProps } from "@mui/material";

export const CarIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <path d="M20 10H22V17H20V20H14V17H10V20H4V17H2V10H4L6 4H18L20 10ZM8 10V12H16V10H8Z" fill="currentColor"/>
    </SvgIcon>
  );
};