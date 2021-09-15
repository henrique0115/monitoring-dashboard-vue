import { createI18n } from "vue-i18n";
import daDK from "./languages/da-DK";
import deDE from "./languages/de-DE";
import en from "./languages/en";
import esEs from "./languages/es-ES";
import etEE from "./languages/et-EE";
import frFR from "./languages/fr-FR";
import itIT from "./languages/it-IT";
import ja from "./languages/ja";
import koKR from "./languages/ko-KR";
import nlNL from "./languages/nl-NL";
import pl from "./languages/pl";
import ruRU from "./languages/ru-RU";
import sr from "./languages/sr";
import srLatn from "./languages/sr-latn";
import trTR from "./languages/tr-TR";
import svSE from "./languages/sv-SE";
import zhCN from "./languages/zh-CN";
import zhHK from "./languages/zh-HK";

const languageList = {
    en,
    "zh-HK": zhHK,
    "de-DE": deDE,
    "nl-NL": nlNL,
    "es-ES": esEs,
    "fr-FR": frFR,
    "it-IT": itIT,
    "ja": ja,
    "da-DK": daDK,
    "sr": sr,
    "sr-latn": srLatn,
    "sv-SE": svSE,
    "tr-TR": trTR,
    "ko-KR": koKR,
    "ru-RU": ruRU,
    "zh-CN": zhCN,
    "pl": pl,
    "et-EE": etEE,
};

export const i18n = createI18n({
    locale: localStorage.locale || "en",
    fallbackLocale: "en",
    silentFallbackWarn: true,
    silentTranslationWarn: false,
    messages: languageList,
});
