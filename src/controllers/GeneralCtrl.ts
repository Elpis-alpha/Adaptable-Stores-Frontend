import { capitalize } from './SpecialCtrl'


export const processCookies = () => { }

export const reterieveSectionName = (str: string) => {

  return capitalize(str.replace('section:', ''))

}
