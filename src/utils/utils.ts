import removeAccents from "remove-accents"

export const imgPath = (name: string): string => {
  return `/img/${removeAccents(name.toLocaleLowerCase().replace(' ', '_'))}.png`
}

export const firstYear = 2003;
export const lastYear = 2015;

export const years = Array.from({ length: lastYear - firstYear + 1 }).map((_, index) => index + firstYear);

