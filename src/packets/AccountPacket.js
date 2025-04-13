export const LIST_LOGIN_SERVER_PACKET = (servers = []) => {
  const header = 0x0069 // Packet ID 
  const lengthFieldSize = 2 // Length field size (2 bytes)
  const serverListSize = loginServerList.length * (1 + 20 + 15 + 2) // id (1 byte) + name (20 bytes) + ip (15 bytes) + port (2 bytes)
  const totalBufferSize = 2 + lengthFieldSize + serverListSize // Header (2 bytes) + length (2 bytes) + server list

  const buffer = Buffer.alloc(totalBufferSize)

  let offset = 0
  buffer.writeUInt16BE(header, offset) // Write header
  offset += 2
  buffer.writeUInt16BE(totalBufferSize, offset) // Write total length
  offset += 2

  loginServerList.forEach(server => {
    buffer.writeUInt8(server.id, offset) // Write server ID
    offset += 1
    buffer.write(server.name, offset, 20, 'utf8') // Write server name (20 bytes max)
    offset += 20
    buffer.write(server.ip, offset, 15, 'utf8') // Write server IP (15 bytes max)
    offset += 15
    buffer.writeUInt16BE(server.port, offset) // Write server port
    offset += 2
  })

  return buffer
}