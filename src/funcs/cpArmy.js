// update army
import { getTotalMoney } from "./hourCounter";
import { getNumber, formatNum } from "./utils";

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
function estimateArmyLevel(modifiers, num) {
  const acc = Number(modifiers["Army Camp Production"]);

  for (let i = 0; i < levelarmies.length; i++) {
    if ((num - levelarmies[i] * (1 + acc)) / num < 0.01) {
      return i + 1;
    }
  }
}

export function updateArmyCostPerf(modifiers) {
  // army upgrade Money
  const upgradeCosts = $(
    ".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsGameObject[id^='ujs_UpgradeBtnContainer'] .ujsText[id^='ujs_Text']"
  )
    .map(function () {
      return $(this).text().trim();
    })
    .get()
    .map((_) => getNumber(_.replace("Upgrade\n￦", "")));

  // upgrade buttons
  const upgradeButtons = $(
    ".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsGameObject[id^='ujs_UpgradeBtnContainer'] a.ujsBtnInner[id^='ujs_UpgradeBtn']"
  ).get();

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
  const levels = productions.map((_) => estimateArmyLevel(modifiers, _));

  //console.log(upgradeCosts, productions, levels)
  const labels = $(
    ".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsTextInner[id^='ujs_NameLabel']"
  ).get();
  const cps = upgradeCosts.map(
    (_, i) => upgradeCosts[i] / getArmyDiff(levels[i])
  );
  const mincpidx = cps.indexOf(Math.min(...cps));
  //console.log(mincpidx, Math.min(...cps),cps)

  const moneyTotal = getTotalMoney();
  const enableAutoUpgrade = true;
  const moneyPercentAutoUpgrade = 0.5;

  for (let i = 0; i < labels.length; i++) {
    const cp = `Cost Perf.: ${formatNum(cps[i])}, Increase: ${formatNum(
      getArmyDiff(levels[i]) * 3600 * 24
    )}/d`;
    $(labels[i]).attr("title", cp);
    $(labels[i]).css("color", i == mincpidx ? "aliceblue" : "");
    if (i == mincpidx && enableAutoUpgrade) {
      if (moneyTotal * moneyPercentAutoUpgrade > upgradeCosts[i]) {
        upgradeButtons[i].click();
      }
    }
  }
}
