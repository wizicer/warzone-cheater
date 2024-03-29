import { getNumber, getTime } from "./utils";

const minDuration = 300000; // 5min
export const SmelterFixNumberKey = "smelter_fix_number";

export function autoUpdateSmelter(
  smeltersExpiry /* : { [idx: number]: number } */
) {
  if (!isAutoSmelterOn()) return;

  const progTexts = $(
    "#ujs_SmeltersBacking .ujsTextInner[id^=ujs_ProgressLabel]"
  ).map(function () {
    return $(this).text();
  });
  const changeBtns = $(
    "#ujs_SmeltersBacking .btn.ujsInner.ujsBtnInner[id^=ujs_SwitchRecipeBtn]"
  );
  // const assigned = {};

  const sfn = localStorage.getItem(SmelterFixNumberKey) ?? "0";

  for (var i = sfn; i < changeBtns.length; i++) {
    const cbtn = changeBtns[i];
    const text = progTexts[i];
    if (!smeltersExpiry[i]) smeltersExpiry[i] = Date.now() + minDuration;
    //console.log(i, text, duration)
    if (text != "Waiting for Resources" && Date.now() < smeltersExpiry[i])
      continue;

    cbtn.click();

    pickRecipe(smeltersExpiry, i);

    return; // deal with one smelter each time to make sure the resource calculation is right and less irresponsive
  }
}

function pickRecipe(smeltersExpiry /* : { [idx: number]: number } */, i) {
  // in Pick Recipe Dialog
  const selectBtns = $(
    "#ujs_GenericContainer .ujsGameObject.ujsBtn.ujsImg>.btn.ujsInner.ujsBtnInner[id^=ujs_SelectBtn]"
  ).slice(0, -1); //except last deactivate button
  const recipes = selectBtns
    .map(function () {
      const sbase = $(this).parent().parent().parent();

      const time = getTime(
        sbase.find(".ujsTextInner[id^='ujs_DurationLabel']").text()
      );

      //const sres = $(sbase.find(".ujsImgInner[id^='ujs_ResourceIcon']")[0]).css("background-image").slice(47, 53)
      const resources = sbase
        .find(
          ".ujsGameObject[id^='ujs_ResourcesContainer'] .ujsTextInner[id^='ujs_Text']"
        )
        .map(function () {
          return $(this).text();
        })
        .get()
        .map((_) => _.split("/"))
        .map((_) => ({ remain: getNumber(_[0]), per: getNumber(_[1]) }));
      const output = sbase
        .find(
          ".ujsGameObject[id^='ujs_MakingContainer'] .ujsTextInner[id^='ujs_Text']"
        )
        .text()
        .split("(")[0]
        .trim();
      return {
        btn: this,
        time,
        resources,
        output,
      };
    })
    .get();

  let { bottoms, tops } = JSON.parse(
    localStorage.getItem("warzone_smelter_pin") ?? "{}"
  );
  bottoms = bottoms ?? [];
  tops = tops ?? [];
  // console.log("before", JSON.stringify(recipes.map((_) => _.output)));
  recipes.reverse();
  for (let j = 0; j < tops.length; j++) {
    const e = tops[j];
    const idx = recipes.findIndex((_) => _.output == e);
    if (idx == -1) continue;
    const sp = recipes[idx];
    recipes.splice(idx, 1);
    recipes.splice(0, 0, sp);
  }
  for (let j = 0; j < bottoms.length; j++) {
    const e = bottoms[j];
    const idx = recipes.findIndex((_) => _.output == e);
    if (idx == -1) continue;
    const sp = recipes[idx];
    recipes.splice(idx, 1);
    recipes.push(sp);
  }
  // console.log("after", JSON.stringify(recipes.map((_) => _.output)));

  let clicked = false;
  for (var j = 0; j < recipes.length; j++) {
    const rec = recipes[j];
    // if (assigned[j]) continue;

    if (rec.resources.every(isResourceGoodToStartSmelt)) {
      rec.btn.click();
      // assigned[j] = true;
      clicked = true;
      smeltersExpiry[i] =
        Date.now() + Math.max(minDuration, 4 * (rec.time + 10) * 1000);
      break;
    }
  }

  if (!clicked) {
    selectBtns[0].click();
    smeltersExpiry[i] = Date.now() + minDuration;
  }
}

function isResourceGoodToStartSmelt({ remain, per }) {
  if (per < 4000) return remain > per * 4;
  if (per < 7000) return remain > per * 3;
  if (per < 10000) return remain > per * 2;
  return remain > per;
}

export function isAutoSmelterOn() {
  const text = $("#ujs_AutoSmelter .ujsTextInner").text();
  if (text == "Auto Smelter On") {
    return true;
  }

  return false;
}

export function bindSmelterTitle() {
  const elem = $(
    "#ujs_SmeltersAndCraftersBody .ujsInner.ujsTextInner[id^='ujs_Header']"
  ).get(0);
  if (!elem) return;
  const total = $(
    "#ujs_SmeltersBacking .btn.ujsInner.ujsBtnInner[id^=ujs_SwitchRecipeBtn]"
  ).length;

  if (!$._data(elem, "events")) {
    $(elem).dblclick(function () {
      const aap = localStorage.getItem(SmelterFixNumberKey) ?? "0";
      const p = prompt(`Set the smelter fix number. [total is ${total}]`, aap);
      if (!p) return;
      localStorage.setItem(SmelterFixNumberKey, p);
    });
  }
}
