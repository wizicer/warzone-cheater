import { levelData } from "./data/levels";
import { minedict, mdict } from "./data/mines";
import { autoUpdateSmelter } from "./funcs/autoSmelter";
import {
  getSpeed,
  getNumber,
  getTime,
  getResource,
  getPercent,
  formatNum,
} from "./funcs/utils";

// remove ads
$("#WaitDialogJSMainDiv").next().remove();
$("#UjsContainer").removeAttr("style");

const territories = levelData
  .filter((_) => _.location)
  .reduce((pv, cv) => ({ ...pv, [cv.location]: cv }), {});
//console.log(levelData, territories)

// hour counter, smelter recipe
setInterval(function () {
  const onehourarmy =
    getSpeed($("#ujs_ArmiesLabel #ujs_ArmiesLabel_tmp").text()) * 3600;
  $("#ujs_ArmiesContainer_div").text(formatNum(onehourarmy) + "/h");
  const onedayarmy = onehourarmy * 24;
  $("#ujs_ArmiesContainer_div").attr("title", formatNum(onedayarmy) + "/d");
  const onehourmoney =
    getSpeed($("#ujs_MoneyLabel #ujs_MoneyLabel_tmp").text()) * 3600;
  $("#ujs_MoneyContainer_div").text(formatNum(onehourmoney) + "/h");

  const mines = {};
  $("#ujs_MinesContainer .ujsGameObject .ujsPCH").each(function () {
    const key = $(this)
      .find(".ujsImgInner")
      .css("background-image")
      .slice(47, 53);
    const val = $(this).text().replace("/s", "");
    const mkey = mdict[key];
    if (!mines[mkey]) mines[mkey] = 0;
    mines[mkey] += Number(val);
  });
  const mtitle = Object.entries(mdict)
    .filter(([k, v]) => mines[v])
    .map(
      ([k, v]) =>
        `${v}: ${mines[v].toFixed(1)}/s, ${formatNum(mines[v] * 3600)}/h`
    )
    .join("\n");
  $("#ujs_MinesBody .ujsInner.ujsTextInner[id^='ujs_Header']").attr(
    "title",
    mtitle
  );

  // smelter recipe
  $("[id^='ujs_RecipesContainer'] .ujsTextInner[id^='ujs_DurationLabel']").each(
    function () {
      const time = getTime($(this).text());
      const relem = $(this)
        .parent()
        .parent()
        .parent()
        .find(".ujsImgInner[id^='ujs_ResourceIcon']")[0];
      const rkey = $(relem).css("background-image").slice(47, 53);
      const ramount = getResource(
        $(relem)
          .parent()
          .parent()
          .find(".ujsText > .ujsTextInner[id^='ujs_Text']")
          .text()
      );
      const sp = ramount / time;
      const result = `:${time}s ${formatNum(sp)}/s (${formatNum(
        mines[mdict[rkey]]
      )})`;
      $(this).text(result);
    }
  );
}, 10000);

// auto smelters
const smelters = {};
setInterval(() => autoUpdateSmelter(smelters), 10000);

// avoid idle counter
setInterval(function () {
  const elems = $("#Reserve").get();
  if (elems.length == 0) {
    console.warn("failed to find reserve canvas for idle counter avoider.");
    return;
  }
  elems[0].click();

  $("#ujs_LiveWorldRoot canvas").each(function () {
    this.click();
  });
}, 100000);

// update mine detail
setInterval(function () {
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
}, 1000);

// update territory detail
setInterval(function () {
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
  const ter = territories[text];
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
}, 1000);

// update modifiers
const modifiers = {};
function updateModifiers() {
  const elem = $("#ujs_ModifiersBtn_btn");
  if (elem.get().length == 0) return;
  elem.click();

  const arr = $(
    ".ujsGameObject[id^='ujs_Content'] .ujsGameObject[id^='ujs_row'] .ujsTextInner[id^='ujs_Text']"
  )
    .map(function () {
      return $(this).text().trim();
    })
    .get();
  for (let i = 0; i < arr.length / 2; i++) {
    modifiers[arr[i * 2]] = getPercent(arr[i * 2 + 1]);
  }

  // close
  $(
    ".ujsGameObject[id^='ujs_ModifierBreakdownDialog'] .ujsBtnInner[id^='ujs_CloseBtn']"
  ).click();
  //console.log("modifiers", modifiers)
}

setTimeout(updateModifiers, 7000);
//setInterval(updateModifiers, 100000);

// update army
function getRawArmyByLevel(level, accelerate = 0) {
  return (3 * level ** 2 + level + 3) * (1 + accelerate);
}

function getArmyDiff(curLevel) {
  const a = getRawArmyByLevel(curLevel);
  const b = getRawArmyByLevel(curLevel + 1);
  return b - a;
}

const levelarmies = Array.from(Array(30).keys()).map((_) =>
  getRawArmyByLevel(_ + 1)
);
function estimateArmyLevel(num) {
  const acc = Number(modifiers["Army Camp Production"]);

  for (let i = 0; i < levelarmies.length; i++) {
    if ((num - levelarmies[i] * (1 + acc)) / num < 0.01) {
      return i + 1;
    }
  }
}

function updateArmyCostPerf() {
  // army upgrade Money
  const upgradeCosts = $(
    ".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsGameObject[id^='ujs_UpgradeBtnContainer'] .ujsText[id^='ujs_Text']"
  )
    .map(function () {
      return $(this).text().trim();
    })
    .get()
    .map((_) => getNumber(_.replace("Upgrade\n￦", "")));

  // army production
  const productions = $(
    ".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsGameObject.ujsText[id^='ujs_ArmiesPerSecondLabel'] .ujsTextInner[id^='ujs_ArmiesPerSecondLabel']"
  )
    .map(function () {
      return $(this).text().trim();
    })
    .get()
    .map((_) => getNumber(_.replace("₳", "").replace(" / sec", "")));

  // army levels (not real level, because the base level unknown)
  //const levels=$(".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsTextInner[id^='ujs_LevelLabel']")
  //  .map(function(){return $(this).text().trim();})
  //  .get()
  //  .map(_=>Number(_.replace("L","")));

  // army levels (estimate)
  const levels = productions.map((_) => estimateArmyLevel(_));

  //console.log(upgradeCosts, productions, levels)
  const labels = $(
    ".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsTextInner[id^='ujs_NameLabel']"
  ).get();
  const cps = upgradeCosts.map(
    (_, i) => upgradeCosts[i] / getArmyDiff(levels[i])
  );
  const mincpidx = cps.indexOf(Math.min(...cps));
  //console.log(mincpidx, Math.min(...cps),cps)
  for (let i = 0; i < labels.length; i++) {
    const cp = `Cost Perf.: ${formatNum(cps[i])}, Increase: ${formatNum(
      getArmyDiff(levels[i]) * 3600 * 24
    )}/d`;
    $(labels[i]).attr("title", cp);
    $(labels[i]).css("color", i == mincpidx ? "aliceblue" : "");
  }
}

// update mine cost performance
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

function updateMineCostPerf() {
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

setInterval(updateMineCostPerf, 10000);
setInterval(updateArmyCostPerf, 10000);
$("a.btn[id^='ujs_UpgradeBtn']").on("click", function () {
  console.log("update after upgrade");
  updateMineCostPerf();
  updateArmyCostPerf();
});

/*
TODO:
- x update info after click upgrade
- y mine cost-performance include ore price calculation
- hospital calculation
- wrong artifacts for upgrade mine
*/

// get mine production
//$($(".ujsGameObject[id^='ujs_Hamburger'] .ujsGameObject[id^='ujs_Vert']").get(1)).find(".ujsPCH[id^='ujs_ResourceLabelContainer'] .ujsText[id^='ujs_Text']").text()
// get mine upgrade Money
//$($(".ujsGameObject[id^='ujs_Hamburger'] .ujsGameObject[id^='ujs_Left'] .ujsGameObject[id^='ujs_UpgradeBtnContainer'] .ujsText[id^='ujs_Text']").get(1)).text()
// ore Price
//$($(".ujsGameObject[id^='ujs_WziTabBodyResourceRow'] .ujsGameObject.ujsText[id^='ujs_SellsForLabel'] .ujsTextInner[id^='ujs_SellsForLabel']").get(2)).text()
