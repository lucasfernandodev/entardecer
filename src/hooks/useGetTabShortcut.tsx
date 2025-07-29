import { useEffect, useState } from "react"
import { Shortcut } from "../infra/database/repository/shortcut-repository";

export const useGetTabShortcut = () => {
  const [shortcut, setShortcut] = useState({} as Shortcut);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) return;
      const tab = tabs[0];
      if (tab?.title && tab?.url) {
        setShortcut({
          title: tab.title,
          url: tab.url,
          icon: tab.favIconUrl
        })
      }
    });
  }, [])

  return { shortcut }
}