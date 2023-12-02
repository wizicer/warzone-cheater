import { mdict } from "../data/mines";
import { getSpeed, getTime, getResource, formatNum, getTotal } from "./utils";

export function updateHourCounterForArmyAndMoney() {
  const onehourarmy =
    getSpeed($("#ujs_ArmiesLabel #ujs_ArmiesLabel_tmp").text()) * 3600;
  $("#ujs_ArmiesContainer_div").text(formatNum(onehourarmy) + "/h");
  const onedayarmy = onehourarmy * 24;
  $("#ujs_ArmiesContainer_div").attr("title", formatNum(onedayarmy) + "/d");
  const onehourmoney = getMoneyPerSecond() * 3600;
  $("#ujs_MoneyContainer_div").text(formatNum(onehourmoney) + "/h");
}

export function getMoneyPerSecond() {
  return getSpeed($("#ujs_MoneyLabel #ujs_MoneyLabel_tmp").text());
}

export function getTotalMoney() {
  return getTotal($("#ujs_MoneyLabel #ujs_MoneyLabel_tmp").text());
}

export function updateMineStatus() {
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
}

export function updateRecipeCalculation() {
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
}
