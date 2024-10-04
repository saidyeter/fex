import { useContext } from "react";
import { PreferencesContext } from "../components/preferences-context";

export function useLang() {

    const [preferences, ] = useContext(PreferencesContext)
    function txt(code: string) {
        if (preferences.lang == 'en') {
            return enWords.get(code) ?? '-'
        }
        else {
            return trWords.get(code) ?? '-'
        }
    }    

    return {
        txt
    }
}


const enWords = new Map<string, string>();
enWords.set('en', 'English')
enWords.set('tr', 'Turkish')
enWords.set('xs', 'Extra Small')
enWords.set('sm', 'Small')
enWords.set('md', 'Medium')
enWords.set('lg', 'Large')
enWords.set('xl', 'Extra Large')
enWords.set('2xl', 'Extra Extra Large')
enWords.set('list', 'List')
enWords.set('light', 'Light')
enWords.set('dark', 'Dark')
enWords.set('system', 'System')
enWords.set('appearance', 'Appearance')
enWords.set('language', 'Language')
enWords.set('theme', 'Theme')
enWords.set('size', 'Size')


const trWords = new Map<string, string>();
trWords.set('en', 'İngilizce')
trWords.set('tr', 'Türkçe')
trWords.set('xs', 'Ekstra Küçük')
trWords.set('sm', 'Küçük')
trWords.set('md', 'Orta') 
trWords.set('lg', 'Büyük')
trWords.set('xl', 'Ekstra Büyük')
trWords.set('2xl', 'Ekstra Ekstra Büyük')
trWords.set('list', 'Liste')
trWords.set('light', 'Aydınlık')
trWords.set('dark', 'Karanlık')
trWords.set('system', 'Sistem')
trWords.set('appearance', 'Görünüm')
trWords.set('language', 'Dil')
trWords.set('theme', 'Tema')
trWords.set('size', 'Boyut')
 