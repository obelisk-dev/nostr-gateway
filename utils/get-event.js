import WebSocket from 'ws'

import {fallbackRelays} from './nostr'

export function getEvent(id, relays) {
  return new Promise(async (resolve, reject) => {
    const sockets = Array.from(new Set([...relays, ...fallbackRelays])).map(
      url => {
        const ws = new WebSocket(url)

        ws.onerror = () => {}
        ws.onopen = () => {
          ws.send(JSON.stringify(['REQ', '_', {ids: [id]}]))
        }
        ws.onmessage = msg => {
          const data = JSON.parse(msg.data)
          if (data[0] === 'EVENT' && data.length > 2) {
            resolve(data[2])
            end()
          }
        }

        setTimeout(() => {
          end()
          reject()
        }, 4000)

        return ws
      }
    )

    function end() {
      sockets.forEach(async ws => {
        if (ws) ws.close(1000, 'not needed anymore, thanks')
      })
    }
  }).catch(() => null)
}
