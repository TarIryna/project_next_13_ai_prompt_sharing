"use client";
import { PageContainer, ProviderNext } from "@/components";
import Info from "@/components/Profile/Info/Info";

const InfoPage = () => {
  return (
    <ProviderNext>
      <PageContainer>
        <Info />
      </PageContainer>
    </ProviderNext>
  );
};
export default InfoPage;
