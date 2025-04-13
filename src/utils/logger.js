import pino from 'pino'

const logger = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  } : undefined,
})

export const info = (...args) => {
  logger.info(...args)
}

export const error = (...args) => {
  logger.error(...args)
}

export const debug = (...args) => {
  logger.debug(...args)
}

export const trace = (...args) => {
  logger.trace(...args)
}

export const fatal = (...args) => {
  logger.fatal(...args)
}

export const warn = (...args) => {
  logger.warn(...args)
}

export const toHex = (buffer) => {
  return buffer.toString('hex').match(/.{1,2}/g).join(' ')
}
