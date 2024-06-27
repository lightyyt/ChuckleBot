const filter_text = (original) => {
  let filter = original.toLowerCase();
  let reg = filter.replace(/[^\w\s]/gm, "");
  return reg
}

const filter_msg = (msg) => {
  return filter_text(msg.content);
}

module.exports = { filter_text, filter_msg };