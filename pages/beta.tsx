import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { Layout, Page, Text, Button } from '@vercel/examples-ui'
import {splitCookiesString, toNodeHeaders} from "../utils/splitCookie";

export default function Beta() {
  const router = useRouter()

  const optOut = () => {
    Cookies.set('beta', 'false')
    Cookies.set('refresh_token', 'false')
    Cookies.set('access_token', 'false')
    router.reload()
  }

  var cookieStr =  "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT, refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"

  for (const [key, value] of Object.entries(
    toNodeHeaders({"Set-Cookie":cookieStr})
  )) {
      console.log(key, value)
  }

  return (
    <Page>
      <Text variant="h1" className="mb-6">
        Cookies example
      </Text>
      <Text className="mb-4">
        You are currently in beta!
      </Text>
      <Button
        variant="secondary"
        onClick={optOut}
      >
        Opt out
      </Button>
    </Page>
  )
}

Beta.Layout = Layout
