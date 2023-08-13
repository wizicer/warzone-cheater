// update mine cost performance
import { mdict, minedict } from "../data/mines";
import { getNumber, formatNum } from "./utils";

function getRawMineByLevel(level, accelerate = 0) {
  const revise = level == 1 ? 0.3 : level == 2 ? 0.6 : level == 3 ? 0.8 : 1;
  return (0.3 * level ** 2 + level + 2) * revise * (1 + accelerate);
}

function getMineDiff(curLevel) {
  const a = getRawMineByLevel(curLevel);
  const b = getRawMineByLevel(curLevel + 1);
  return b - a;
}

let orePriceDict = {};
function getRawMineWorth(name, curLevel) {
  const os = minedict[name].ores;
  let w = 0;
  const total = getRawMineByLevel(curLevel);
  //console.log(os);
  for (let j = 0; j < os.length; j++) {
    if (!os[j]) break;
    w += os[j].percent * orePriceDict[os[j].type] * total;
    //console.log(_,total,w,os[j].percent,os[j].type)
  }
  return w;
}
function getRawMineWorthDiff(name, curLevel) {
  const a = getRawMineWorth(name, curLevel);
  const b = getRawMineWorth(name, curLevel + 1);
  return b - a;
}

export function updateMineCostPerf() {
  // mine upgrade Money
  const upgradeCosts = $(
    ".ujsGameObject[id^='ujs_Hamburger'] .ujsGameObject[id^='ujs_Left'] .ujsGameObject[id^='ujs_UpgradeBtnContainer'] .ujsText[id^='ujs_Text']"
  )
    .map(function () {
      return $(this).text().trim();
    })
    .get()
    .map((_) => getNumber(_.replace("Upgrade\n￦", "")));

  // mine last production
  const prods = $(
    ".ujsGameObject[id^='ujs_Hamburger'] .ujsGameObject[id^='ujs_Vert']"
  )
    .map(function () {
      const n = $(
        $(this)
          .find(
            ".ujsPCH[id^='ujs_ResourceLabelContainer'] .ujsText[id^='ujs_Text']"
          )
          .get()
          .slice(-1)
      ).text();
      const num = getNumber(n.replace("/s", ""));
      const typecolor = $(
        $(this)
          .find(
            ".ujsPCH[id^='ujs_ResourceLabelContainer'] .ujsImgInner[id^='ujs_ResourceIcon']"
          )
          .get()
          .slice(-1)
      )
        .css("background-image")
        .slice(47, 53);
      const type = mdict[typecolor];
      return { num, type };
    })
    .get();

  // ore Price
  const ores = $(
    "#ujs_ResourcesOreBody .ujsGameObject[id^='ujs_WziTabBodyResourceRow']"
  )
    .map(function () {
      const p = $(this).find(".ujsTextInner[id^='ujs_SellsForLabel']").text();
      const price = getNumber(p.replace("/s", ""));
      const type = $(this).find(".ujsTextInner[id^='ujs_NameLabel']").text();

      return { price, type };
    })
    .get();
  orePriceDict = ores.reduce((o, cv) => ({ ...o, [cv.type]: cv.price }), {});
  //console.log("ores", ores, oreDict);

  // mine levels
  const levels = $(
    ".ujsGameObject[id^='ujs_WziTabBodyMineRow'] .ujsTextInner[id^='ujs_LevelLabel']"
  )
    .map(function () {
      return $(this).text().trim();
    })
    .get()
    .map((_) => Number(_.replace("L", "")));

  //console.log(upgradeCosts, productions, levels)

  const labels = $(
    ".ujsGameObject[id^='ujs_WziTabBodyMineRow'] .ujsTextInner[id^='ujs_NameLabel']"
  ).get();
  const names = labels.map((_) => $(_).text());
  const cps = upgradeCosts.map(
    (_, i) =>
      upgradeCosts[i] /
      (getMineDiff(levels[i]) *
        minedict[names[i]].ores.find((_) => _.type == prods[i].type).percent)
  );
  //console.log(names)
  const worths = names.map((_, i) => getRawMineWorthDiff(_, levels[i]));
  const wps = upgradeCosts.map((_, i) => upgradeCosts[i] / worths[i]);
  const maxwps = Math.max(...wps);

  for (let i = 0; i < labels.length; i++) {
    //console.log(prods[i].type)
    //console.log(prods.map((j, p)=>({p,j})).map(_=>_.p))
    const mincp = Math.min(
      ...prods
        .map((p, j) => ({ p, j }))
        .filter((_) => _.p.type == prods[i].type)
        .map((_) => cps[_.j])
    );
    const cp = `Worth-Perf: ${formatNum(wps[i])}, Cost-Perf.: ${formatNum(
      cps[i]
    )}`;

    $(labels[i]).attr("title", cp);
    $(labels[i]).css(
      "color",
      maxwps == wps[i] ? "teal" : mincp == cps[i] ? "aliceblue" : ""
    );
  }
}
