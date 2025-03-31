import { createReadStream } from 'fs'
import { createHash } from 'crypto'

const getFileHash = (path, hash = 'sha256') => new Promise((resolve, reject) => {
  const _hash = createHash(hash)
  const _rs = createReadStream(path)
  _rs.on('error', reject)
  _rs.on('data', chunk => _hash.update(chunk))
  _rs.on('end', () => resolve(_hash.digest('hex')))
})

const getStrHash = (str, hash = 'sha256') => {
  const _hash = createHash(hash)
  _hash.update(str)
  return _hash.digest('hex')
}

export {
  getFileHash,
  getStrHash
}
