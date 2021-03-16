import $ from "../assets/lib/emoji/jquery.emoji";
import BlogContext from "../context/BlogContext";

let emojiOption = function (btnDom, inpCall) {
  return {
    showTab: true,
    animation: 'fade',
    button: btnDom,
    inpCall: inpCall,
    icons: BlogContext.faceIcon
  };
}

export default {
  initTextArea: (textAreaId, btnDom, inpCall) => {
    $("#" + textAreaId).emoji(emojiOption(btnDom, inpCall));
  },
  parseText: (sourceText) => {
    let dom = $("<span>" + sourceText + "</span>");
    dom.emojiParse(emojiOption());
    let reStr = dom.html();
    dom.remove();
    return reStr;
  }
};
