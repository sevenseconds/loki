import * as logger from '../utils/logger.js'

// export const masterLogin = (context, data) => {
//   const { name, socket } = context

//   // Example character servers
//   const characterServers = [
//     { ip: '127.0.0.1', port: 6121, status: 1, load: 50, capacity: 100 },
//     { ip: '127.0.0.2', port: 6122, status: 1, load: 30, capacity: 80 },
//   ]

//   // Construct the packet
//   const packetId = 0x0069 // List 
//   const sessionId = 12345 // Example session ID
//   // const serverCount = characterServers.length

//   // // Calculate packet size
//   // const packetSize = 7 + serverCount * 23 // 7 bytes header + 23 bytes per server
//   // const buffer = Buffer.alloc(packetSize)

//   // // Write packet header
//   // buffer.writeUInt16LE(packetId, 0) // Packet ID
//   // buffer.writeUInt32LE(sessionId, 2) // Session ID
//   // buffer.writeUInt8(serverCount, 6) // Number of servers

//   // // Write server details
//   // let offset = 7
//   // for (const server of characterServers) {
//   //   buffer.write(server.ip.padEnd(16, '\0'), offset, 'ascii') // IP (16 bytes, null-padded)
//   //   buffer.writeUInt16LE(server.port, offset + 16) // Port (2 bytes)
//   //   buffer.writeUInt8(server.status, offset + 18) // Status (1 byte)
//   //   buffer.writeUInt8(server.load, offset + 19) // Load (1 byte)
//   //   buffer.writeUInt8(server.capacity, offset + 20) // Capacity (1 byte)
//   //   offset += 23
//   // }

//   const buffer = Buffer.alloc(4 + 23)
//   buffer.writeUInt16LE(packetId, 0) // Header
//   buffer.writeUInt16LE(23, 2)     // Length
//   buffer.writeUInt32LE(sessionId, 4) // Session ID
//   // buffer.writeUInt8(0x00, 4)      // Success code
//   buffer.writeUInt32LE(100, 5)    // Account ID
//   buffer.writeUInt32LE(0, 9)      // Login ID
//   buffer.writeUInt32LE(0, 13)     // Unknown
//   buffer.writeUInt8(1, 17)        // Server count

//   // // Server info
//   buffer.writeUInt32LE(0x0100007F, 18) // 127.0.0.1
//   buffer.writeUInt16LE(6121, 22)       // Char server port

//   // Send the packet
//   socket.write(buffer)
//   logger.info(`${name} Server: Sent character server list`)
//   logger.info(`${name} Server: Sent packet ${logger.toHex(buffer)}`)
// }


/**
 * Handles the master login process.
 *
 * @param {Object} context - The context object containing server and socket information.
 * @param {import('net').Socket} context.socket - The socket instance from the net module.
 * @param {string} context.name - The name of the server.
 * @param {Buffer} data - The data object containing login details.
 * @returns {void}
 */
export const masterLogin = (context, data) => {
  const { name, socket } = context
  logger.info(`${name} Server: Received master login request`)
  const packetId = 0x0069 // List
  const length = 23 // Length of the packet

  const buffer = Buffer.alloc(length)
  buffer.writeUInt16LE(packetId, 0) // Header
  buffer.writeUInt16LE(length, 2) // Length
  buffer.writeUInt32LE(12345, 4) // Session ID
  buffer.writeUInt8(0x00, 8) // Success code
  buffer.writeUInt32LE(100, 9) // Account ID
  buffer.writeUInt32LE(0, 13) // Login ID
  buffer.writeUInt32LE(0, 17) // Unknown
  buffer.writeUInt8(1, 21) // Server count

  socket.write(buffer)
  logger.info(`${name} Server: Sent master login response`)
  logger.info(`${name} Server: Sent packet ${logger.toHex(buffer)}`)
}