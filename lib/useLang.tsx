import { useContext } from "react";
import { PreferencesContext } from "../components/preferences-context";
import lang from "../data/lang.json";

export function useLang() {

  const [preferences,] = useContext(PreferencesContext)
  function txt(code: string) {
    if (preferences.lang == 'en') {
      return lang.en.find(c => c.key == code)?.value ?? '-'
    }
    else {
      return lang.tr.find(c => c.key == code)?.value ?? '-'
    }
  }
  return {
    txt
  }
}