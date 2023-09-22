export function updateRecipeLabel() {
  const rows = $("#ujs_WziRecipeStatsDialog #ujs_Table [id^='ujs_Row']").get();
  if (rows.length == 0) return;
  const labels = rows.map((_) =>
    $(_).find(".ujsText:first .ujsTextInner").get(0)
  );
  const names = labels.map((_) => $(_).text());

  let { bottoms, tops } = JSON.parse(
    localStorage.getItem("warzone_smelter_pin") ?? "{}"
  );
  bottoms = bottoms ?? [];
  tops = tops ?? [];

  for (let i = 0; i < labels.length; i++) {
    $(labels[i]).css("color", names[i].endsWith("Bar") ? "wheat" : "linen");
    const style =
      bottoms.indexOf(names[i]) > -1
        ? "line-through"
        : tops.indexOf(names[i]) > -1
        ? "underline wavy"
        : "inherit";
    $(labels[i]).css("text-decoration", style);
  }
}

export function bindRecipeLabel() {
  const rows = $("#ujs_WziRecipeStatsDialog #ujs_Table [id^='ujs_Row']").get();
  if (rows.length == 0) return;
  const labels = rows.map((_) =>
    $(_).find(".ujsText:first .ujsTextInner").get(0)
  );
  const names = labels.map((_) => $(_).text());

  for (let i = 0; i < labels.length; i++) {
    const elem = labels[i];
    const name = names[i];

    if (!$._data(elem, "events")) {
      $(elem).dblclick(function () {
        let { bottoms, tops } = JSON.parse(
          localStorage.getItem("warzone_smelter_pin") ?? "{}"
        );
        bottoms = bottoms ?? [];
        tops = tops ?? [];

        if (bottoms.indexOf(name) > -1) {
          bottoms.splice(bottoms.indexOf(name), 1);
          tops.push(name);
        } else if (tops.indexOf(name) > -1) {
          tops.splice(tops.indexOf(name), 1);
        } else {
          bottoms.push(name);
        }

        localStorage.setItem(
          "warzone_smelter_pin",
          JSON.stringify({ bottoms, tops })
        );

        updateRecipeLabel();
      });
    }
  }
}
