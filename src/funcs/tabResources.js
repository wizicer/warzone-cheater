import { getEquippedArtifacts } from "./artifact";
import { getNumber } from "./utils";

export function getResourcePrices() {
  // resources Price
  const prices = $(
    "#ujs_ResourcesItemsBody .ujsGameObject[id^='ujs_WziTabBodyResourceRow']"
  )
    .map(function () {
      const p = $(this).find(".ujsTextInner[id^='ujs_SellsForLabel']").text();
      const price = getNumber(p.replace("/s", ""));
      const type = $(this).find(".ujsTextInner[id^='ujs_NameLabel']").text();

      return { price, type };
    })
    .get();
  // console.log("prices", prices);
  return prices;
}

export function updateResourceLabel() {
  const labels = $(
    "#ujs_ResourcesItemsBody [id^='ujs_WziTabBodyResourceRow'] [id^='ujs_NameLabel'] .ujsTextInner[id^='ujs_NameLabel']"
  ).get();
  const names = labels.map((_) => $(_).text());

  const artifacts = getEquippedArtifacts();
  const rescolor = artifacts.some((_) => _ == "Alloy Values")
    ? ""
    : "orangered";
  const itemcolor = artifacts.some((_) => _ == "Item Values")
    ? ""
    : "orangered";

  for (let i = 0; i < labels.length; i++) {
    $(labels[i]).css("color", names[i].endsWith("Bar") ? rescolor : itemcolor);
  }
}
