import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input/Input";
import * as S from "./styles";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { useModal } from "@ebay/nice-modal-react/lib/esm";
import { useFormFieldNavigation } from "@/hooks";
import { MODALS } from "@/constants/constants";

registerDynamicModal(
  MODALS.FORGOT_PASSWORD,
  import("../../ForgotPassword/ForgotPasswordModal")
);

const LoginForm = () => {
  const methods = useForm({ mode: "onSubmit" });
  const { handleSubmit, reset, setError } = methods;
  const { show: showForgotPassword } = useModal(MODALS.FORGOT_PASSWORD);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (e) => {
    const { email, password } = e;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result?.error) {
      router.push("/dashboard"); // Перенаправление после входа
    } else {
      alert("Ошибка: " + result.error);
    }
  };

  const { formInputs, handleKeyDown } = useFormFieldNavigation(
    2,
    handleSubmit(onSubmit)
  );

  return (
    <FormProvider {...methods}>
      <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input
          name="email"
          placeholder="e-mail"
          rules={{
            required: true,
          }}
          inputMode="email"
          tabIndex={1}
          enterKeyHint="next"
          inputId={formInputs[0]?.id}
          onKeyDown={(event) => handleKeyDown(event, 0)}
        />
        <Input
          name="password"
          placeholder="пароль"
          rules={{
            required: true,
          }}
          tabIndex={2}
          enterKeyHint="done"
          type="password"
          inputId={formInputs[1]?.id}
          onKeyDown={(event) => handleKeyDown(event, 1)}
        />
        <S.ForgotPassButton onClick={() => showForgotPassword()} type="button">
          Забули пароль?
        </S.ForgotPassButton>
        <S.SubmitButton type="submit">OK</S.SubmitButton>
      </S.Form>
    </FormProvider>
  );
};
export default LoginForm;
