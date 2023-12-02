// update mine detail
import { getGameName } from "../funcs/mainUi";
import { levelData } from "../data/levels";
import { minedict } from "../data/mines";

export function updateMineDetail() {
  const elem = $(
    "#ujs_InspectBody #ujs_AssetsContainer .ujsGameObject[id^=ujs_AssetRow] .ujsTextInner[id^=ujs_Text]"
  );
  if (!elem) return;
  const text = elem.text().replace(/^Find/, "");
  if (!text.startsWith("Mine:")) return;

  const name = text.split(":")[1].trim();
  const md = minedict[name];
  if (!md) return;

  //elem.text(`Mine: ${name} (${md.raw})`);
  elem.attr("title", `${md.id}: ${md.raw}`);
}

// update territory detail
export function updateTerritoryDetail() {
  const elem = $("#ujs_TopBar_2 #ujs_MainLabel_tmp");
  if (elem.get().length == 0) return;
  elem.attr("title", "");

  if (!$._data(elem.get(0), "events")) {
    elem.dblclick(function () {
      const text = $(this).text();
      const dict = JSON.parse(localStorage.getItem("warzone_notes") ?? "{}");
      const note = dict[text];
      const p = prompt(`Your notes on ${text}`, note);
      if (p) dict[text] = p;
      localStorage.setItem("warzone_notes", JSON.stringify(dict));
    });
  }

  const text = elem.text();
  const ter = getTerritoryInfo(text);
  //console.log(text, ter, territories)
  const hter = ter ? `${ter.type} [${ter.name}]: ${ter.details}` : "";

  const dict = JSON.parse(localStorage.getItem("warzone_notes") ?? "{}");
  const note = dict[text];
  const hnote = note ? note + (ter ? " | " : "") : "";

  const content = `${hnote}${hter}`;
  if (!content) return;
  elem.attr("title", content);
  const foggedElem = elem
    .parent()
    .parent()
    .parent()
    .find("#ujs_DetailsLabel_tmp span");
  const foggedText = foggedElem.text();
  if (foggedText != "(fogged)") return;
  foggedElem.parent().css("width", "380px");
  foggedElem.text(content);
  foggedElem.attr("title", content);
}

let territories = undefined;
//console.log(levelData, territories)

export function getTerritoryInfo(name) {
  if (!territories) {
    const gameName = getGameName();

    if (gameName) {
      territories = levelData
        .filter((_) => _.location)
        .filter((_) => _.levelName == gameName)
        .reduce((pv, cv) => ({ ...pv, [cv.location]: cv }), {});
    }
  }

  const ter = territories[name];
  return ter;
}
