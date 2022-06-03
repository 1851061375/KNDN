import {FC} from 'react'
import {useLang} from './Metronici18n'
import {IntlProvider} from 'react-intl'
import deMessages from './messages/de.json'
import enMessages from './messages/en.json'
import esMessages from './messages/es.json'
import frMessages from './messages/fr.json'
import jaMessages from './messages/ja.json'
import zhMessages from './messages/zh.json'

const allMessages = {
  de: deMessages,
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  ja: jaMessages,
  zh: zhMessages,
}

const I18nProvider: FC = ({children}) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export {I18nProvider}
