const { truncate } = require('truncator')

export const truncator = (el: string, text: string, opt: any) => {
  return truncate(el, text, opt)
}
