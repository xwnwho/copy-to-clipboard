const navigatorClipboard = window.navigator.clipboard
const cssText = "position:fixed;pointer-events:none;z-index:-9999;opacity:0;"
const clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  default: "Text",
}
interface Options {
  debug?: boolean
  format?: keyof typeof clipboardToIE11Formatting
}
const copy = (
  text: string,
  options: Options = {}
): Promise<boolean | Error> => {
  const { debug, format = "default" } = options
  return new Promise((resolve, reject) => {
    if (navigatorClipboard) {
      // 最新浏览器api
      try {
        navigatorClipboard.writeText(text).then(() => {
          resolve(true)
        })
      } catch (error) {
        debug && console.log(error)
        reject(error)
      }
    } else {
      try {
        // 老版本api
        const textarea = document.createElement("textarea")
        // 防止卡顿
        textarea.value = text.substr(0, 1)
        textarea.setAttribute("readonly", "")
        textarea.style.cssText = cssText
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          textarea.contentEditable = "true"
          textarea.readOnly = true
          const range = document.createRange()
          range.selectNodeContents(textarea)
          const selection = window.getSelection()
          selection?.removeAllRanges()
          selection?.addRange(range)
          textarea.setSelectionRange(0, 999999)
        } else {
          textarea.select()
        }
        textarea.addEventListener("copy", function (e) {
          e.stopPropagation()
          if (format) {
            e.preventDefault()
            if (typeof e.clipboardData === "undefined") {
              // IE 11
              debug && console.warn("unable to use e.clipboardData")
              debug && console.warn("trying IE specific stuff")
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(window as any).clipboardData.clearData()
              const formatting =
                clipboardToIE11Formatting[format] ||
                clipboardToIE11Formatting["default"]
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(window as any).clipboardData.setData(formatting, text)
            } else {
              // all other browsers
              e.clipboardData?.clearData()
              e.clipboardData?.setData(format, text)
            }
          }
        })
        // 该接口数据量大容易卡顿
        const success = document.execCommand("copy")
        success ? resolve(true) : reject(false)
      } catch (error) {
        debug && console.warn("error")
        reject(error)
      }
    }
  })
}

export default copy
