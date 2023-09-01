const reImg = /https:\/\/warzonecdn\.com\/ujs\/Resources\/(.*?)\.png/g;

function getAssetName(text) {
  reImg.lastIndex = 0;
  const matches = reImg.exec(text);
  if (matches && matches.length > 0) return matches[1];
  return "";
}

export function getTechs() {
  const techs = $("a.btn[id^='ujs_WziTabBodyTech']")
    .map(function () {
      const base = $(this).parent();
      const borderRaw = base
        .find(".ujsImgInner[id^='ujs_Border']")
        .css("border-image-source");
      const border = getAssetName(borderRaw);
      // console.log("border", borderRaw, border);
      const researched = border == "Border-FFFF00";
      const techRaw = base
        .find(".ujsImgInner[id^='ujs_Icon']")
        .css("background-image");
      const tech = getAssetName(techRaw);
      // console.log("img", img, imgRaw);

      const ress = base
        .find(
          ".ujsGameObject[id^='ujs_ResourcesContainer'] .ujsImgInner[id^='ujs_ResourceIcon']"
        )
        .map(function () {
          const imgRaw = $(this).css("background-image");
          const img = getAssetName(imgRaw);
          return img;
        })
        .get();

      return { researched, tech, resources: ress, btn: this };
    })
    .get()
    .filter((_) => _.tech);
  console.log("techs", techs, JSON.stringify(techs));
  return techs;
}
