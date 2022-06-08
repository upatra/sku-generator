import axios from 'axios'

import { GOOGLE_API_KEY, GOOGLE_TRANSLATION_API } from 'config'

export const translateToChinese = (text: string) =>
  axios.post(`${GOOGLE_TRANSLATION_API}`, null, {
    params: {
      q: text,
      source: 'en',
      target: 'zh',
      key: `${GOOGLE_API_KEY}`,
    },
  })
