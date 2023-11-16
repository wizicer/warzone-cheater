export function getGameName() {
  return $("#ujs_GameNameLabel").text();
}

export function initTitleQuickAction() {
  initAutoSmelterSwitch();
  initQuickArtifactButton();
  initAutoTech();
}

function initQuickArtifactButton() {
  appendButton("ujs_ShowArtifacts", "Artifacts", 50);
  $("#ujs_ShowArtifacts .ujsTextInner").click(function () {
    $("#ujs_ViewAllArtifactsBtn_btn").click();
  });
}

let turnOnAutoSmelterTimeout;

function initAutoSmelterSwitch() {
  appendButton("ujs_AutoSmelter", "Auto Smelter On", 90);

  $("#ujs_AutoSmelter .ujsTextInner").click(function () {
    const text = $("#ujs_AutoSmelter .ujsTextInner").text();
    if (text == "Auto Smelter On") {
      $("#ujs_AutoSmelter .ujsTextInner").text("Auto Smelter Off");
      turnOnAutoSmelterTimeout = setTimeout(() => {
        $("#ujs_AutoSmelter .ujsTextInner").text("Auto Smelter On");
      }, 300000);
    } else {
      if (turnOnAutoSmelterTimeout) clearTimeout(turnOnAutoSmelterTimeout);
      $("#ujs_AutoSmelter .ujsTextInner").text("Auto Smelter On");
    }
  });
}

function initAutoTech() {
  appendButton("ujs_AutoTech", "Auto Tech On", 80);

  $("#ujs_AutoTech .ujsTextInner").click(function () {
    const text = $("#ujs_AutoTech .ujsTextInner").text();
    if (text == "Auto Tech On") {
      $("#ujs_AutoTech .ujsTextInner").text("Auto Tech Off");
    } else {
      $("#ujs_AutoTech .ujsTextInner").text("Auto Tech On");
    }
  });
}

let leftstack = 0;

function appendButton(id, name, width) {
  leftstack += 15;
  let left =
    39 +
    Number(
      $("#ujs_GameNameLabel .ujsTextInner").css("width").replace("px", "")
    );
  $("#ujs_GameNameLabel").after(`<div class="ujsGameObject ujsText" id="${id}"
   style="left: ${
     left + leftstack
   }px; bottom: 2px; transform-origin: 25px -13px;">
   <div class="ujsInner ujsTextInner" id="${id}_tmp"
   style="width: ${width}px; height: 26px; color: rgb(186, 186, 187); text-align: left; justify-content: flex-start; align-items: center; font-size: 9px; line-height: 19.1187px; white-space: pre-wrap; padding: 0px; overflow: visible;"
   >${name}</div>
   </div>`);
  leftstack += width;
}
