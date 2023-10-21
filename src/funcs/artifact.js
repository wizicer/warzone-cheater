export function getEquippedArtifacts() {
  return $(
    "#ujs_ArtifactsContainer [id^='ujs_Name'] .ujsTextInner[id^='ujs_Name']"
  )
    .map(function () {
      return $(this).text();
    })
    .get();
}

export function initQuickArtifactButton() {
  $("#ujs_GameNameLabel")
    .after(`<div class="ujsGameObject ujsText" id="ujs_ShowArtifacts"
   style="left: 239px; bottom: 2px; transform-origin: 25px -13px;">
   <div class="ujsInner ujsTextInner" id="ujs_AutoSmelter_tmp"
   style="width: 50px; height: 26px; color: rgb(186, 186, 187); text-align: left; justify-content: flex-start; align-items: center; font-size: 9px; line-height: 19.1187px; white-space: pre-wrap; padding: 0px; overflow: visible;"
   >Artifacts</div>
   </div>`);
  $("#ujs_ShowArtifacts .ujsTextInner").click(function () {
    $("#ujs_ViewAllArtifactsBtn_btn").click();
  });
}
