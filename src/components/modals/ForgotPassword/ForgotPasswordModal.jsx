import { create, useModal } from "@ebay/nice-modal-react";

import React, { useEffect, useState } from "react";
import ReactModal from "@/components/modals/ReactModal";
import { useMediaQuery } from "@/helpers/useMediaQuery";
import { LOGIN, MODALS } from "@/constants/constants";
import { AuthModalContext } from "../AuthModal/contexts/authContext";
import * as S from "./styles";

const AuthorizationModal = create(({ id, mode, res }) => {
  const [activeTab, setActiveTab] = useState(mode);
  const [googleRegMethod, setGoogleRegMethod] = useState(null);
  const isTablet = useMediaQuery({ maxWidth: 900 });
  const { visible } = useModal(id);
  const { visible: isVisibleForgotPass } = useModal(MODALS.FORGOT_PASSWORD);
  const isHiddenModal = isVisibleForgotPass;

  useEffect(() => {
    if (visible) {
      setActiveTab(mode);
    }
  }, [mode, visible]);

  return (
    <ReactModal id={id} closeOnClickOutside={false} isHidden={isHiddenModal}>
      <AuthModalContext.Provider
        value={{
          res,
          openGame,
          activeTab,
          setActiveTab,
          googleRegMethod,
          setGoogleRegMethod,
        }}
      >
        <S.Wrapper></S.Wrapper>
      </AuthModalContext.Provider>
    </ReactModal>
  );
});

export default AuthorizationModal;
