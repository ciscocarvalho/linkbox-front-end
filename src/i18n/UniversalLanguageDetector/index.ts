import BrowserLanguageDetector from "i18next-browser-languagedetector";
import HeaderLanguageDetector from "./detectors/HeaderLanguageDetector";
import ServerSideCookieLanguageDetector from "./detectors/ServerSideCookieLanguageDetector";

const UniversalLanguageDetector = new BrowserLanguageDetector();

UniversalLanguageDetector.addDetector(HeaderLanguageDetector);
UniversalLanguageDetector.addDetector(ServerSideCookieLanguageDetector);

export default UniversalLanguageDetector;
