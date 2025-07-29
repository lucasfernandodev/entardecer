import { useEffect, useState } from "react"
import { SettingRepository } from "../infra/database/repository/setting-repository";
import { Database } from "../infra/database/database";
import { ISetting, ISettingIds } from "../types/settings";
import { useFetch } from "./useFetch";

type PainelView = null | 'show' | 'hidden';
type PainelPosition = null | 'left' | 'center' | 'right'

export const useSettingPainelStore = () => {
  const ID: ISettingIds = 'painel';
  const [repo] = useState(() => new SettingRepository(Database))
  const [isPainelView, setIsPainelView] = useState<PainelView>(null);
  const [painelPosition, setPainelPosition] = useState<PainelPosition>(null);

  const getPainelInfo = async () => {
    const repo = new SettingRepository(Database)
    const setting = await repo.getById(ID);
    return setting as ISetting[typeof ID];
  }

  const { isLoading, data } = useFetch({
    queryFn: getPainelInfo
  })

  useEffect(() => {
    if (!isLoading && data) {
      if (data.position) {
        setPainelPosition(data.position)
      }

      if (data.visibility) {
        setIsPainelView(data.visibility)
      }
    }
  }, [isLoading, data])

  const updateVisibilityOption = async (option: Exclude<PainelView, null>) => {
    if (!painelPosition) return;
    const payload: ISetting[typeof ID] = {
      position: painelPosition,
      visibility: option
    }

    await repo.update(ID, payload)
  }

  const updatePositionOption = async (option: Exclude<PainelPosition, null>) => {
    if (!isPainelView) return;
    const payload: ISetting[typeof ID] = {
      visibility: isPainelView,
      position: option,
    }

    await repo.update(ID, payload)
  }

  return {
    updateVisibilityOption,
    updatePositionOption,
    isPainelView,
    painelPosition
  }
}