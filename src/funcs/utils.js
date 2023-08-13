export function formatNum(num) {
  if (!num) return "NaN";
  let displaynum = num;
  let pos = 0;
  while (displaynum > 1000) {
    displaynum /= 1000;
    pos++;
  }
  const units = " KMB";

  return displaynum.toFixed(1) + units[pos].trim();
}

function getNumberByUnit(num, unit) {
  const munit =
    unit == ""
      ? 1
      : unit == "K"
      ? 1000
      : unit == "M"
      ? 1000000
      : unit == "B"
      ? 1000000000
      : 1;
  return num * munit;
}

export function getSpeed(text) {
  const matches = /\(([\d\.]+)([KMB]*)\/sec\)/.exec(text);
  const num = Number(matches[1]);
  const unit = matches[2];
  return getNumberByUnit(num, unit);
}

export function getResource(text) {
  const matches = /\/([\d\.]+)([KMB]*)/.exec(text);
  const num = Number(matches[1]);
  const unit = matches[2];
  return getNumberByUnit(num, unit);
}

export function getNumber(text) {
  try {
    const matches = /([\d\.]+)([KMB]*)/.exec(text);
    const num = Number(matches[1]);
    const unit = matches[2];
    return getNumberByUnit(num, unit);
  } catch (err) {
    console.warn(`cannot parse the number: ${text}`, err);
    return -1;
  }
}

export function getTime(text) {
  if (text.startsWith(":")) {
    const matches = /:(\d+)s/.exec(text);
    const s = Number(matches[1]);
    return s;
  } else {
    const matches = /((\d+) minute[s]? )?(\d+) second[s]?/.exec(text);
    const s = Number(matches[3]);
    const m = Number(matches[2] ?? 0);
    return m * 60 + s;
  }
}

export function getPercent(text) {
  if (!text.endsWith("%")) return text;
  return Number(text.replace("%", "")) / 100;
}
