import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
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

const LoginForm = ({ provider }) => {
  console.log(provider, "login form");
  const methods = useForm({ mode: "onSubmit" });
  const { handleSubmit, reset, setError } = methods;
  const { show: showForgotPassword } = useModal(MODALS.FORGOT_PASSWORD);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (data) => {
    setIsProcessing(true);
    const params = { ...data };

    try {
      const otpData = await checkOTPMutation({ username: data?.username });
      if (otpData.is_enabled) {
        showDoubleAuth({
          onSubmit: (check_otp) => login(check_otp, params, true),
          close: () => setIsProcessing(false),
        });
      } else {
        login(params);
      }
    } catch (error_) {
      if (isAxiosError(error_)) {
        const status = error_.response?.status;
        setIsProcessing(false);
        switch (status) {
          case 404: {
            setError("username", {
              message: "login_user_not_found_notification",
              type: "siteTextKey",
            });
            notify(t("login_user_not_found_notification"), "error");
            trackEvent({
              category: "Login form",
              action: "submit",
              name: "Error: login_user_not_found",
            });
            break;
          }
          default:
            notify("login_error_notification", "error");
            trackEvent({
              category: "Login form",
              action: "submit",
              name: "Error: unidentified error",
            });
        }
      }
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
          name="username"
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
      </S.Form>
    </FormProvider>
  );
};
export default LoginForm;
