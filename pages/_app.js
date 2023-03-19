import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import '../styles/globals.css'

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Nostr Gateway</title>
      </Head>
      <header style={{display: 'flex', alignItems: 'center'}}>
        <Link href="/" passHref>
          <a>
            <Image
              alt="nostr logo"
              src="/logo.jpg"
              height={40}
              width={40}
              style={{imageRendering: 'pixelated'}}
            />
          </a>
        </Link>
        <a
          href={
            typeof location !== 'undefined'
              ? `${location.protocol}//${location.host}`
              : '/'
          }
        >
          <h1 style={{margin: '0 2rem 0'}}>Nostr Gateway</h1>
        </a>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
