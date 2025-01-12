import { forwardRef } from "react";
import Spinner from "~/assets/icons/circle-loader.svg";
import { StyledButton } from "./styles";

const Button = forwardRef(
  (
    {
      variant = "black",
      size = "md",
      isLoading = false,
      disabled = false,
      fullWidth = false,
      rightIcon,
      leftIcon,
      children,
      ...props
    },
    ref
  ) => (
    <StyledButton
      ref={ref}
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      isLoading={isLoading}
      isIcon={Boolean(rightIcon || leftIcon)}
      disabled={isLoading || disabled}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
      {isLoading && <Spinner />}
    </StyledButton>
  )
);

Button.displayName = "Button";

export default Button;
