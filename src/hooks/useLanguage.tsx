import { useRouter } from "next/router";
import en from "../locales/en.json"
import ar from "../locales/ar.json";

export const useLanguage = () => {
  const { locale } = useRouter();
  
  const t = locale === "ae-en" || locale === "sa-en" ? en : ar;

  const parts = locale?.split("-")

  const currency = parts ? parts[0] === "sa" ? "SAR" : "AED" : "AED"

  const countries = [
    { country: 'United Arab Emirates', flag: 'https://www.lifepharmacy.com/images/svg/flag-ae.svg', path: "ae" },
    { country: 'Saudi Arabia', flag: 'https://www.lifepharmacy.com/images/svg/flag-sa.svg', path: "sa" },
  ]
  const languages = [
    { name: "Arabic", path: "ar" },
    { name: "English", path: "en" }
  ]

  return { t, locale, currency, countries, languages };
};