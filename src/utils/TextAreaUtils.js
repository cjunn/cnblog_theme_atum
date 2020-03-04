const getTextareaCursor = (textarea) => {
  let rangeData = {
    text: '',
    start: 0,
    end: 0
  }
  if (textarea.setSelectionRange) {
    textarea.focus()
    rangeData.start = textarea.selectionStart
    rangeData.end = textarea.selectionEnd
    rangeData.text = (rangeData.start !== rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : ''
  }
  return rangeData
}
// 设置光标回原先位置 在插入文本时调用
const setTextareaCursor = (textarea, rangeData) => {
  let oR, start, end
  textarea.focus()
  if (textarea.setSelectionRange) {
    textarea.setSelectionRange(rangeData.start, rangeData.end)
  }
}
// 在获取的光标位置插入指定文本 或 替换选定文本
const addTextareaCursor = (textarea, cursor, text) => {
  // textarea 容器； cursor：光标位置和选中内容； text：要插入的文本
  let oValue, nValue, oR, nStart, nEnd, st
  const sR = ''
  setTextareaCursor(textarea, cursor) // 调用获取位置
  if (textarea.setSelectionRange) {
    oValue = textarea.value
    nValue = oValue.substring(0, cursor.start) + text + oValue.substring(cursor.end)
    nStart = nEnd = cursor.start + text.length
    st = textarea.scrollTop
    textarea.value = nValue
    if (textarea.scrollTop !== st) {
      textarea.scrollTop = st
    }
    textarea.setSelectionRange(nStart, nEnd)
  }
}

export default {getTextareaCursor, setTextareaCursor, addTextareaCursor}
