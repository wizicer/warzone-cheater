export function getEquippedArtifacts() {
  return $(
    "#ujs_ArtifactsContainer [id^='ujs_Name'] .ujsTextInner[id^='ujs_Name']"
  )
    .map(function () {
      return $(this).text();
    })
    .get();
}