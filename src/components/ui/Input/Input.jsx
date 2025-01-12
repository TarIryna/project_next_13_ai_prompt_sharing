import React, { useState } from "react";
import { Controller } from "react-hook-form";
import IconEyeClose from "@/assets/icons/eye-close.svg";
import IconEyeOpen from "@/assets/icons/eye-open.svg";
import {
  InputElement,
  InputWrapper,
  RightIconWrapper,
  ShowPass,
  Text,
  Wrapper,
} from "./styles";

const Input = (props) => {
  const {
    type,
    rightIcon,
    placeholder,
    name,
    inputId,
    rules,
    helperText,
    isValidChecker,
    replaceErrorPart,
    onChange,
    hasError = true,
    defaultValue,
    isLightDisabled,
    className,
    ...rest
  } = props;
  const isPasswordField = type === "password";
  const [isShowPass, setIsShowPass] = useState(false);

  const getErrorMassage = (error) => {
    if (!error) {
      return helperText;
    }
    const message = renderInputError(error);
    return replaceErrorPart
      ? message?.replace("NUMBER", replaceErrorPart[error.type] || "")
      : rules
      ? message.replace("NUMBER", rules[error.type] || "")
      : message;
  };

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <Wrapper hasError={hasError} className={className}>
          <InputWrapper>
            <InputElement
              isError={!!fieldState.error}
              isLightDisabled={isLightDisabled}
              hasRightIcon={Boolean(rightIcon || isPasswordField)}
              isShowSuccess={isValidChecker && !fieldState.error}
              placeholder={placeholder}
              type={isShowPass ? "text" : type}
              id={inputId || ""}
              {...field}
              {...rest}
              onChange={(e) => {
                field.onChange(e);
                if (typeof onChange === "function") {
                  onChange(e);
                }
              }}
            />
            {/* {isPasswordField && (
              <ShowPass onClick={() => setIsShowPass((prev) => !prev)}>
                {isShowPass ? <IconEyeOpen /> : <IconEyeClose />}
              </ShowPass>
            )} */}

            {/* {Boolean(rightIcon) && !isPasswordField && (
              <RightIconWrapper className="input__icon-right">
                {rightIcon}
              </RightIconWrapper>
            )} */}
          </InputWrapper>
          {/* {(fieldState.error || helperText) && hasError && (
            <Text isError={Boolean(fieldState.error)}>
              {getErrorMassage(fieldState.error)}
            </Text>
          )} */}
        </Wrapper>
      )}
    ></Controller>
  );
};

export default Input;
