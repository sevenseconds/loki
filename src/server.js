import { createServer as _createServer } from 'net'
import * as logger from './utils/logger.js'

export const createServer = (name, host, port, handlers) => {
  const server = _createServer((socket) => {
    logger.info(`${name} Server: Client connected on ${host}:${port}`)

    socket.on('data', (data) => {
      const context = {
        name,
        host,
        port,
        socket
      }
      // Handle incoming data here
      for (const handler of handlers) {
        if (typeof handler === 'function') {
          handler(context, data)
        } else {
          logger.error(`${name} Server: Invalid handler provided.`)
        }
      }
    })

    socket.on('end', () => {
      logger.info(`${name} Server: Client disconnected from ${host}:${port}`)
    })
  })

  server.listen(port, host, () => {
    logger.info(`${name} Server: Listening on ${host}:${port}`)
  })

  return server
}
