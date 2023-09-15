import md5 from 'md5'

export default function encodePassword(password: string) {
  return md5(password + '_salt_20230915')
}