import { useSearchParams } from "react-router-dom";
import { SettingOptions, SettingTemplate } from "../../components/Template/Setting"
import { AlertProvider } from "../../context/alert/provider"
import { SettingProvider } from "../../context/setting/provider";

export const SettingPage = () => {

  const [searchParams] = useSearchParams();

  const query = searchParams.get('setting') || 'background';

  return (
    <SettingProvider>
      <AlertProvider>
        <SettingTemplate option={query as SettingOptions} />
      </AlertProvider>
    </SettingProvider>
  )
}