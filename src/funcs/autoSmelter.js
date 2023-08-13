import { getNumber, getTime } from "./utils";

const minDuration = 300000; // 5min

export function autoUpdateSmelter(
  smeltersExpiry /* : { [idx: number]: number } */
) {
  const progTexts = $(
    "#ujs_SmeltersBacking .ujsTextInner[id^=ujs_ProgressLabel]"
  ).map(function () {
    return $(this).text();
  });
  const changeBtns = $(
    "#ujs_SmeltersBacking .btn.ujsInner.ujsBtnInner[id^=ujs_SwitchRecipeBtn]"
  );
  const assigned = {};

  for (var i = 0; i < changeBtns.length; i++) {
    const cbtn = changeBtns[i];
    const text = progTexts[i];
    if (!smeltersExpiry[i]) smeltersExpiry[i] = Date.now() + minDuration;
    //console.log(i, text, duration)
    if (text != "Waiting for Resources" && Date.now() < smeltersExpiry[i])
      continue;

    cbtn.click();

    // in Pick Recipe Dialog
    const selectBtns = $(
      "#ujs_GenericContainer .ujsGameObject.ujsBtn.ujsImg>.btn.ujsInner.ujsBtnInner[id^=ujs_SelectBtn]"
    ).slice(0, -1); //except last deactivate button

    let clicked = false;
    for (var j = selectBtns.length - 1; j >= 0; j--) {
      if (assigned[j]) continue;
      const sbtn = selectBtns[j];
      const sbase = $(sbtn).parent().parent().parent();

      const time = getTime(
        sbase.find(".ujsTextInner[id^='ujs_DurationLabel']").text()
      );

      //const sres = $(sbase.find(".ujsImgInner[id^='ujs_ResourceIcon']")[0]).css("background-image").slice(47, 53)
      const samountText = $(
        sbase
          .find(
            ".ujsGameObject[id^='ujs_ResourcesContainer'] .ujsTextInner[id^='ujs_Text']"
          )
          .slice(-1)
      ).text();

      const samount = getNumber(samountText.split("/")[0]);
      const peramount = getNumber(samountText.split("/")[1]);
      if (samount == -1 || peramount == -1)
        console.log(
          sbase.find(
            ".ujsGameObject[id^='ujs_ResourcesContainer'] .ujsTextInner[id^='ujs_Text']"
          )
        );
      if (samount > peramount) {
        sbtn.click();
        assigned[j] = true;
        clicked = true;
        smeltersExpiry[i] =
          Date.now() + Math.max(minDuration, (time + 10) * 1000);
        break;
      }
    }

    if (!clicked) {
      selectBtns[0].click();
      smeltersExpiry[i] = Date.now() + minDuration;
    }
  }
}
