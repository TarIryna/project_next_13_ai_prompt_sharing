import { create, useModal } from "@ebay/nice-modal-react";

import React, { useEffect, useState } from "react";
import ReactModal from "../ReactModal";
// import { useMediaQuery } from "@/helpers/useMediaQuery";
import { LOGIN, MODALS } from "@/constants/constants";
import { AuthModalContext } from "./contexts/authContext";
import Login from "./components/Login/Login";
import Head from "./components/Head/Head";
import * as S from "./styles";

const AuthorizationModal = create(({ id, mode, res }) => {
  const [activeTab, setActiveTab] = useState(mode);
  const [googleRegMethod, setGoogleRegMethod] = useState(null);
  const { visible, hide } = useModal(id);
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
          setActiveTab,
          googleRegMethod,
          setGoogleRegMethod,
        }}
      >
        <S.Wrapper>
          <S.Container>
            <Head close={hide} />
            <S.Content>
              {activeTab === LOGIN ? <Login /> : <Registration />}
            </S.Content>
          </S.Container>
        </S.Wrapper>
      </AuthModalContext.Provider>
    </ReactModal>
  );
});

export default AuthorizationModal;
