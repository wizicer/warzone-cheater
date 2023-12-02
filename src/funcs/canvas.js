import { getTerritoryInfo } from "./terDetail";

export function clickCanvas() {
  const elems = $("#Reserve").get();
  if (elems.length == 0) {
    console.warn("failed to find reserve canvas for idle counter avoider.");
    return;
  }
  elems[0].click();

  $("#ujs_LiveWorldRoot canvas").each(function () {
    this.click();
  });
}

export function updateCanvasTooltip() {
  const elem = $("#ujs_GenericContainer .ujsMapTooltip");
  const text = elem.text();
  if (!text) return;
  if (text.startsWith(">")) return;

  const name =
    text.indexOf("\n") > -1 ? text.split("\n")[0].trim() : text.trim();

  const info = getTerritoryInfo("Territory: " + name);
  if (!info) return;

  elem.text(`>${text}\n${info.details}`);
}
