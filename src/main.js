import { initTitleQuickAction } from "./funcs/mainUi";
import { autoUpdateSmelter } from "./funcs/autoSmelter";
import { bindArmyTitle, updateArmyCostPerf } from "./funcs/cpArmy";
import { updateMineCostPerf } from "./funcs/cpMine";
import {
  updateHourCounterForArmyAndMoney,
  updateMineStatus,
} from "./funcs/hourCounter";
import { bindRecipeLabel, updateRecipeLabel } from "./funcs/popRecipeStats";
import {
  autoSellResource,
  bindResourceLabel,
  updateResourceLabel,
} from "./funcs/tabResources";
import {
  getTechs,
  refreshTechUIPrices,
  tryAutoUpgradeTech,
} from "./funcs/tabTech";
import { updateMineDetail, updateTerritoryDetail } from "./funcs/terDetail";
import { getPercent } from "./funcs/utils";

// remove ads
$("#WaitDialogJSMainDiv").next().remove();
$("#UjsContainer").removeAttr("style");

// hour counter, smelter recipe
setInterval(function () {
  updateHourCounterForArmyAndMoney();
  updateMineStatus();
}, 10000);

// auto smelters
const smelters = {};
setInterval(() => autoUpdateSmelter(smelters), 5000);

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

setInterval(updateMineDetail, 1000);
setInterval(updateTerritoryDetail, 1000);

setInterval(updateMineCostPerf, 3000);
setInterval(() => updateArmyCostPerf(modifiers), 3000);
$("a.btn[id^='ujs_UpgradeBtn']").on("click", function () {
  console.log("update after upgrade");
  updateMineCostPerf();
  updateArmyCostPerf(modifiers);
});

setInterval(updateResourceLabel, 3000);

setTimeout(bindArmyTitle, 7000);
setTimeout(bindResourceLabel, 7000);
setInterval(bindResourceLabel, 100000);
setInterval(autoSellResource, 10000);

setTimeout(getTechs, 7000);
setInterval(refreshTechUIPrices, 1000);
setInterval(tryAutoUpgradeTech, 10000);

setInterval(bindRecipeLabel, 5000);
setInterval(updateRecipeLabel, 5000);

setTimeout(initTitleQuickAction, 13000);

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
