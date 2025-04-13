import * as AccountHandler from './AccountHandler.js'
import * as logger from '../utils/logger.js'

/**
 * Retrieves the appropriate handler for the given packet data.
 *
 * @param {Buffer} data - The buffer containing the packet data.
 * @returns {Function} The handler function corresponding to the packet ID.
 * @throws {Error} Throws an error if no handler is found for the packet ID.
 */
export const getHandler = (data) => {
  const packetId = data.readUInt16LE(0).toString(16).padStart(4, '0')
  const { handler } = HANDLERS[packetId]
  if (!handler) {
    throw new Error(`No handler found for packet ID: ${packetId}`)
  }
  return handler
}

const HANDLERS = {
  '0064': {
    name: 'CA_LOGIN',
    destination: 'Account Server Login',
    handler: AccountHandler.masterLogin,
  }
}
