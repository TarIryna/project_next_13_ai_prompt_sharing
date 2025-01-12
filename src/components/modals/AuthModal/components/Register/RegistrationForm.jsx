import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { FormProvider, useForm } from "react-hook-form";
// import { patterns, ROUTES } from "~/common/constants";
import { useCommonStore, useProfile } from "~/common/contexts";
import { ECookie } from "~/common/enums";
import { useFormFieldNavigation, useTranslations } from "~/common/hooks";
import { Input, InputPassword, Select } from "~/ui";
import { useAuthModalContext } from "../../context/AuthModalContext";
import { AuthorizationMethod, Terms } from "../index";
import { useRegistration } from "./helpers";
import { CurrencyBox, Form, Row } from "./styles";

const RegistrationForm = () => {
  const { googleRegMethod, setGoogleRegMethod, res, openGame } =
    useAuthModalContext() || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const { isGiveaway } = useCommonStore();
  const { isAuth, userProfile } = useProfile();
  const { push } = useRouter();
  const recaptchaRef = useRef < ReCAPTCHA > null;
  const t = useTranslations();

  const methods = useForm < IRegistrationFormFields > { mode: "onSubmit" };

  const { handleSubmit, setError, watch, setValue } = methods;

  const usernameWatch = watch("username");
  const countryWatch = watch("country");
  const emailWatch = watch("email");

  const {
    getItemOrSetUndefined,
    onGoogleSubmit,
    registerHandler,
    signInGoogleHandler,
    onChangeUsername,
    onChangeEmail,
    resetState,
    onClose,
    showGiveaway,
    renderError,
    defCountry,
    currentLanguageID,
    isLoginWithGoogle,
  } = useRegistration({
    methods,
    countries,
    setGoogleRegMethod,
    setIsProcessing,
    res,
  });

  const onSubmit = async (data) => {
    const redirectUrl = getItemOrSetUndefined(ECookie.RedirectUrl);
    let registrationUrl;
    if (redirectUrl) {
      registrationUrl = decodeURIComponent(redirectUrl);
    }
    setIsProcessing(true);
    const captcha = await recaptchaRef?.current?.executeAsync();
    const generalData = {
      captcha,
      language: currentLanguageID,
      country: data.country.value.id,
      currency: data.currency.value,
      stag: getItemOrSetUndefined(ECookie.Stag),
      registration_url: registrationUrl,
    };

    if (googleRegMethod) {
      const params = {
        ...googleRegMethod,
        ...generalData,
        username: data.username,
      };
      const response = await signInGoogleHandler(params);
      renderError(response);
    } else {
      trackEvent({
        category: "Registration form",
        action: "submit",
      });
      try {
        const body = {
          ...data,
          ...generalData,
        };
        const error = await registerHandler(body);
        renderError(error);
        if (error) {
          resetState();
        } else {
          if (isAuth) {
            onClose();
            trackEvent({
              category: "Registration form",
              action: "submit",
              name: "Success",
            });
            if (isGiveaway) {
              showGiveaway();
            } else {
              await push(ROUTES.WALLET());
            }
          }
        }
        window.scrollTo(0, 0);
      } catch (error) {
        setIsProcessing(false);

        // TODO: Fix types
        // @ts-ignore
        const errorText = JSON.parse(error?.request?.response?.fields);
        if (errorText) {
          for (const key in errorText) {
            setError(key, {
              message: errorText?.[key]?.[0],
              type: "siteTextKey",
            });
            trackEvent({
              category: "Registration form",
              action: "submit",
              name: `Error: ${errorText?.[key]?.[0]}`,
            });
          }
        }
      }
    }
  };

  const getDefOptions = () => {
    const country = countryWatch || defCountry;

    return country.value.currency;
  };

  const { formInputs, handleKeyDown } = useFormFieldNavigation(
    4,
    handleSubmit(onSubmit)
  );

  useEffect(() => {
    if (isAuth) {
      onClose();
      if (isGiveaway) {
        showGiveaway();
      } else {
        if (isLoginWithGoogle) {
          openGame && openGame({ userInfo: userProfile });
        } else {
          push(ROUTES.WALLET());
        }
      }
    }
  }, [isAuth]);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {!googleRegMethod && (
          <Input
            name="email"
            placeholder={t("registration_form_email")}
            rules={{
              required: true,
              pattern: patterns?.email,
            }}
            enterKeyHint="next"
            tabIndex={1}
            inputMode="email"
            onKeyDown={(event) => handleKeyDown(event, 0)}
            inputId={formInputs[0]?.id}
            onChange={(e) => onChangeEmail(e)}
            isValidChecker={!!emailWatch}
          />
        )}
        <Input
          name="username"
          placeholder={t("registration_form_username")}
          rules={{
            required: true,
            minLength: 5,
            maxLength: 15,
            validate: (value) =>
              patterns.username.test(value) ||
              "registration_form_username_validation",
          }}
          onChange={(e) => onChangeUsername(e)}
          tabIndex={2}
          enterKeyHint="next"
          inputId={formInputs[1]?.id}
          onKeyDown={(event) => handleKeyDown(event, 1)}
          isValidChecker={!!usernameWatch}
          replaceErrorPart={{
            minLength: 5,
            maxLength: 15,
          }}
        />

        {!googleRegMethod && (
          <InputPassword
            name="password"
            placeholder={t("registration_form_password")}
            rules={{
              required: true,
            }}
            tabIndex={3}
            enterKeyHint="next"
          />
        )}
        <Row>
          <CurrencyBox>
            <Select
              name="currency"
              placeholder={t("registration_form_currency")}
              rules={{ required: true }}
              items={getDefOptions()}
              defaultValue={getDefCurrency()}
            />
          </CurrencyBox>
        </Row>
        <Terms />
        <AuthorizationMethod
          isLoading={isProcessing}
          submitButtonTitle={t("registration_form_button")}
          onGoogleSubmit={onGoogleSubmit}
          isGoogleRegister={!!googleRegMethod}
        />
        {!!process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA && (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA}
            size="invisible"
            theme="dark"
            ref={recaptchaRef}
          />
        )}
      </Form>
    </FormProvider>
  );
};

export default RegistrationForm;
