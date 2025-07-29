import { useEffect, useState } from "react";
import { PopupTemplate } from "../../components/Template/Popup";
import { Database } from "../../infra/database/database";
import { PopupSuccessTemplate } from "../../components/Template/Popup/Success";
import { useGetTabShortcut } from "../../hooks/useGetTabShortcut";
import { ShortcutRepository } from "../../infra/database/repository/shortcut-repository";


export const PopupPage = () => {
  const [isExistShortcut, setIsExistShortcut] = useState(false);
  const { shortcut } = useGetTabShortcut()


  useEffect(() => {
    if (shortcut.url) {
      const check = async () => {
        const repository = new ShortcutRepository(Database);
        const isShortcut = await repository.getByUrl(shortcut.url);
        if (isShortcut) {
          setIsExistShortcut(true)
        }

      }
      check().catch(console.error)
    }
  }, [shortcut?.url])

  if (isExistShortcut) return <PopupSuccessTemplate />

  return (
    <PopupTemplate
      icon={shortcut.icon}
      title={shortcut.title}
      url={shortcut.url}
    />
  )
}