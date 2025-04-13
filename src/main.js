import './config/dotenv.js'
import { createServer } from './server.js'
import * as logger from './utils/logger.js'
import { getHandler } from './handlers/index.js'

createServer('Login', '127.0.0.1', 6900, [
  /**
   * Handler function
   * @param {string} context.name
   * @param {string} context.address
   * @param {number} context.port
   * @param {Buffer} data 
   */
  (context, data) => {
    logger.debug(`${context.name} Server: Received data: ${logger.toHex(data)}`)

    // Handle login data here
    const handler = getHandler(data)
    handler(context, data)
  },
])

createServer('Character', '127.0.0.1', 6121, [
  (context, data) => {
    logger.debug(`${context.name} Server: Received data: ${logger.toHex(data)}`)
    // Handle game data here
  },
])

createServer('Map', '127.0.0.1', 5121, [
  (context, data) => {
    logger.debug(`${context.name} Server: Received data: ${logger.toHex(data)}`)
    // Handle map data here
  },
])
