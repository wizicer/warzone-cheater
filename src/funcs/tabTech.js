import { getResourcePrices } from "./tabResources";
import { formatNum, getNumber } from "./utils";

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
      const upgradable = border == "Border-FF0000";
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

      return { researched, upgradable, tech, resources: ress, btn: this };
    })
    .get()
    .filter((_) => _.tech);
  // console.log("techs", techs);
  return techs;
}

export function tryAutoUpgradeTech() {
  const techs = getTechs()
    .filter((_) => _.tech == "CampingTent")
    .filter((_) => _.upgradable);

  for (let i = 0; i < techs.length; i++) {
    const tech = techs[i];
    upgradeTech(tech.btn);
  }
}

function upgradeTech(techBtn) {
  techBtn.click();
  const base = $("#ujs_GenericContainer [id^='ujs_WziTabBodyTechDialog']");
  const unlockBtn = base.find("a.ujsBtnInner[id^='ujs_PurchaseBtn']").get(0);
  // const closeBtn=base.find("a.ujsBtnInner[id^='ujs_CloseBtn']")
  unlockBtn.click();
}

export function refreshTechUIPrices() {
  const base = $("#ujs_GenericContainer [id^='ujs_WziTabBodyTechDialog']");
  if (base.css("z-index") == "1000") return;

  const resources = base
    .find("[id^='ujs_CostContainer'] [id^='ujs_horz']")
    .map(function () {
      const labels = $(this).find(".ujsTextInner[id^='ujs_Text']");
      const numberLabel = $(labels.get(0));
      const typeLabel = $(labels.get(1));
      // console.log(labels, numberLabel, typeLabel);
      const type = typeLabel.text();
      const r = numberLabel.text();
      const nums = r.split("/");
      const total = getNumber(nums[0]);
      const required = getNumber(nums[1]);
      return {
        numberLabel,
        typeLabel,
        type,
        total,
        required,
      };
    })
    .get();
  if (resources.length == 0) return;
  // console.log(resources);
  const rprices = getResourcePrices();
  const dprices = rprices.reduce(
    (pv, cv) => ({ ...pv, [cv.type]: cv.price }),
    {}
  );
  for (let i = 0; i < resources.length; i++) {
    const r = resources[i];
    r.typeLabel.css("width", "269px");
    const cost = r.required * (dprices[r.type] ?? 0);
    r.typeLabel.text(r.type + " " + formatNum(cost));
  }
  base.css("z-index", "1000");
}
