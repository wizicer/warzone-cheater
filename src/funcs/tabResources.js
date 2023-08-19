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

  const dict = JSON.parse(
    localStorage.getItem("warzone_resource_auto_sell") ?? "{}"
  );

  for (let i = 0; i < labels.length; i++) {
    $(labels[i]).css("color", names[i].endsWith("Bar") ? rescolor : itemcolor);
    $(labels[i]).css("text-decoration", dict[names[i]] ? "underline" : "");
  }
}

export function bindResourceLabel() {
  const labels = $(
    "#ujs_ResourcesItemsBody [id^='ujs_WziTabBodyResourceRow'] [id^='ujs_NameLabel'] .ujsTextInner[id^='ujs_NameLabel']"
  ).get();
  const names = labels.map((_) => $(_).text());

  for (let i = 0; i < labels.length; i++) {
    const elem = labels[i];
    const name = names[i];

    if (!$._data(elem, "events")) {
      $(elem).dblclick(function () {
        const dict = JSON.parse(
          localStorage.getItem("warzone_resource_auto_sell") ?? "{}"
        );
        dict[name] = !dict[name];
        localStorage.setItem(
          "warzone_resource_auto_sell",
          JSON.stringify(dict)
        );

        updateResourceLabel();
      });
    }
  }
}

export function autoSellResource() {
  const labels = $(
    "#ujs_ResourcesItemsBody [id^='ujs_WziTabBodyResourceRow'] [id^='ujs_NameLabel'] .ujsTextInner[id^='ujs_NameLabel']"
  ).get();
  const names = labels.map((_) => $(_).text());

  // const artifacts = getEquippedArtifacts();
  // const rescolor = artifacts.some((_) => _ == "Alloy Values")
  //   ? ""
  //   : "orangered";
  // const itemcolor = artifacts.some((_) => _ == "Item Values")
  //   ? ""
  //   : "orangered";

  const dict = JSON.parse(
    localStorage.getItem("warzone_resource_auto_sell") ?? "{}"
  );
  const sellBtn = $("#ujs_ResourcesItemsBody a.ujsBtnInner[id^='ujs_SellBtn']");

  for (let i = 0; i < labels.length; i++) {
    const name = names[i];
    if (!dict[name]) continue;

    const label = labels[i];
    const quantity = getNumber(
      $(label)
        .parent()
        .parent()
        .find(".ujsTextInner[id^='ujs_QuantityLabel']")
        .text()
    );
    const selectBtn = $(label)
      .parent()
      .parent()
      .find("a.ujsBtnInner[id^='ujs_SelectBtn']");
    // console.log(name, quantity, selectBtn);
    if (quantity > 0) {
      selectBtn.click();
      sellBtn.click();
    }
  }
}
