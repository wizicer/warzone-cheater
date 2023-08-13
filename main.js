
$('#WaitDialogJSMainDiv').next().remove()
$('#UjsContainer').removeAttr("style")
const mdict = {
  "FFC000": "Copper",
  "FFB1FC": "Tin",
  "65C0C5": "Iron",
  "907F2C": "Zinc",
  "0017FF": "Nickel",
  "AD3A3A": "Lead",
  "47FF36": "Silicon",
  "C5C4AA": "Aluminum",
  "E9E9E9": "Silver",
  "FFEB00": "Gold",
  "FF00DB": "Platinum",
  "00F5FF": "Titanium",
  "FF8E00": "Thorium",
};
const levelCsv=`
15,Far Land,Dig Sites,Dig Site 120365867,Cost: 120.4M; Time: 8 hours; Type: c100,"Bonus: Beelzebub's District",Part of bonuses: Town of Morality
15,Far Land,Dig Sites,Dig Site 256986494,Cost: 257.0M; Time: 8 hours; Type: c100,Territory: Keturah Path,Part of bonuses: Royal Paths
15,Far Land,Dig Sites,Dig Site 547683677,Cost: 547.7M; Time: 8 hours; Type: c100,Bonus: Drowning Margin,Part of bonuses: Slough of Despond
15,Far Land,Dig Sites,Dig Site 1433964643,Cost: 1.4B; Time: 8 hours; Type: c100,Territory: Delgado,"Part of bonuses: Sunset Arbor, Imanuel’s Land, Pretense Bank"
15,Far Land,Dig Sites,Dig Site 2395419702,Cost: 2.4B; Time: 8 hours; Type: c100,Territory: Burgess,"Part of bonuses: Adam's Stall, Place of Deceit, Land of Vain Glory"
15,Far Land,Dig Sites,Dig Site 4200261114,Cost: 4.2B; Time: 8 hours; Type: c100,Territory: Munoz,"Part of bonuses: Formalist, Place of Deliverance, Land of Vain Glory"
15,Far Land,Dig Sites,Dig Site 5940823541,Cost: 5.9B; Time: 20 hours; Type: p58 c24 u12 r06,Bonus: Hill of Difficulty,Part of bonuses: Imanuel’s Land
15,Far Land,Dig Sites,Dig Site 8832189052,Cost: 8.8B; Time: 8 hours; Type: c100,Territory: Short,"Part of bonuses: Diffidences Square, Enchanted Ground, Bye Path Meadow"
15,Far Land,Dig Sites,Dig Site 11786131654,Cost: 11.8B; Time: 20 hours; Type: p58 c24 u12 r06,Territory: Allison,"Part of bonuses: Mocked Square, Vanity, Fair of Temptation"
15,Far Land,Hospital,Hospital00,"Base armies saved: 9.6K; Upgrade costs: 645.0K, 4.9M, 266.0M, 1.9B, 11.7B",Territory: Jonathan Path,Part of bonuses: Royal Paths
15,Far Land,Hospital,Hospital01,"Base armies saved: 262.1K; Upgrade costs: 31.0M, 166.0M, 1.2B, 6.4B, 37.6B",Territory: Kitron Path,Part of bonuses: Royal Paths
15,Far Land,Hospital,Hospital02,"Base armies saved: 1000.0K; Upgrade costs: 118.4M, 592.8M, 3.9B, 24.3B",Territory: Hines,"Part of bonuses: Simple's House, Calvary District, Land of Vain Glory"
15,Far Land,Hospital,Hospital03,"Base armies saved: 1.9M; Upgrade costs: 1.1B, 11.8B",Territory: Wallace,"Part of bonuses: Pursued Edge, Slough of Despond, Dark Plain"
15,Far Land,Hospital,Hospital04,"Base armies saved: 4.0M; Upgrade costs: 6.1B, 31.9B",Territory: Lindsey,"Part of bonuses: Lost Certificate, Imanuel’s Land, The Side of Danger"
15,Far Land,Hospital,Hospital05,Base armies saved: 11.8M; Upgrade costs: 12.9B,"Territory: O'neal","Part of bonuses: Key of Promise, Enchanted Ground, Bye Path Meadow"
15,Far Land,Hospital,Hospital06,Base armies saved: 21.2M; Upgrade costs:,Territory: Bryan,"Part of bonuses: Superstition's House, Court Edge, Vanity"
15,Far Land,Largest Cache,Army Cache,396.7M,Bonus: Graceless,Part of bonuses: County of Coveting
15,Far Land,Largest Cache,Army Cache,547.8M,Territory: Baxter,"Part of bonuses: Slotful Tree, Enchanted Ground, Mt. Error"
15,Far Land,Largest Cache,Army Cache,605.7M,Bonus: Shadow of Dead,Part of bonuses: County of Coveting
15,Far Land,Largest Cache,Army Cache,739.2M,Bonus: Mt. Error,Part of bonuses: Enchanted Ground
15,Far Land,Largest Cache,Army Cache,743.4M,Bonus: Mt. Caution & Marvel,Part of bonuses: Land of Beulah
15,Far Land,Largest Cache,Money Cache,1.9B,Territory: Henson,"Part of bonuses: Fruitful Trees, Land of Beulah, Mt. Charity"
15,Far Land,Largest Cache,Money Cache,2.2B,Bonus: Bye Path Meadow,Part of bonuses: Enchanted Ground
15,Far Land,Largest Cache,Money Cache,2.2B,Territory: Hood,"Part of bonuses: Burn Place, Vanity, Executions Corner"
15,Far Land,Largest Cache,Money Cache,2.2B,Territory: Merritt,"Part of bonuses: Gleefully Edge, Land of Beulah, Mt. Charity"
15,Far Land,Largest Cache,Money Cache,3.4B,Bonus: Mt. Clear & Innocence,Part of bonuses: Land of Beulah
15,Far Land,Largest Territories,Territory Cost,"1.0B (JS, TS, QS)",Territory: Bridges,"Part of bonuses: Mocked Square, Vanity, Fair of Temptation"
15,Far Land,Largest Territories,Territory Cost,"1.1B (JS, TS, QS)",Territory: Contreras,"Part of bonuses: Shepherd's House, Enchanted Ground, Mt. Error"
15,Far Land,Largest Territories,Territory Cost,"1.4B (JS, TS, QS)","Territory: O'neal","Part of bonuses: Key of Promise, Enchanted Ground, Bye Path Meadow"
15,Far Land,Largest Territories,Territory Cost,"2.4B (JS, TS, QS)",Territory: Allison,"Part of bonuses: Mocked Square, Vanity, Fair of Temptation"
15,Far Land,Largest Territories,Territory Cost,"992.3M (JS, TS, QS)",Territory: Hood,"Part of bonuses: Burn Place, Vanity, Executions Corner"
15,Far Land,Market,Bationare,"Resources: Welding Rod, Titanium Bar, Tin Can, Metal Sheet",Territory: Clay,"Part of bonuses: Rising to heaven, Vanity, Executions Corner"
15,Far Land,Market,Belluminkling,"Resources: Tin Bar, Copper Bar, Iron Bar, Zinc Bar",Territory: Bethesda Path,Part of bonuses: Royal Paths
15,Far Land,Market,Cleakuwaked,"Resources: Silver Bar, Metal Pipe, Gold Bar, Platinum Bar",Territory: Molina,"Part of bonuses: Gripeman, Lovegain, Enchanted Ground"
15,Far Land,Market,Mixtup,"Resources: Nickel Bar, Copper Wire, Barbed Wire, Lead Bar",Territory: Roberts,"Part of bonuses: Worldly Wiseman's Garden, City of Destruction, Carnal Policy"
15,Far Land,Market,Twisometo,"Resources: Silicon Bar, Screw, Aluminum Bar, Nail",Territory: Curry,"Part of bonuses: Three Shining Ones, Place of Deliverance, Land of Vain Glory"
15,Far Land,Mercenary Camp,MercenaryCamp000,Base mercs: 977.4K; Base cost: 1.81,Territory: Mendoza,"Part of bonuses: Shipyard, Legality's Village, Town of Morality"
15,Far Land,Mercenary Camp,MercenaryCamp001,Base mercs: 7.8M; Base cost: 3.23,Territory: Jedidah Path,Part of bonuses: Royal Paths
15,Far Land,Mercenary Camp,MercenaryCamp002,Base mercs: 21.0M; Base cost: 4.75,Territory: Mcdonald,"Part of bonuses: Weight of Sins, Slough of Despond, Drowning Margin"
15,Far Land,Mercenary Camp,MercenaryCamp003,Base mercs: 70.9M; Base cost: 3.86,Territory: Imnah Path,Part of bonuses: Royal Paths
15,Far Land,Mercenary Camp,MercenaryCamp004,Base mercs: 160.9M; Base cost: 5.11,Territory: Kelly,"Part of bonuses: Silver Mine West Way, Valley Lucre, Pleasant Meadow"
15,Far Land,Mercenary Camp,MercenaryCamp005,Base mercs: 222.1M; Base cost: 7.81,Territory: Martinez,"Part of bonuses: Tears Corner, City of Destruction, Carnal Policy"
15,Far Land,Mercenary Camp,MercenaryCamp006,Base mercs: 441.9M; Base cost: 9.83,Territory: Wilson,"Part of bonuses: Pilgrim's Backyard, City of Destruction, Apostasy"
15,Far Land,Mercenary Camp,MercenaryCamp007,Base mercs: 614.8M; Base cost: 13.36,Territory: Parks,"Part of bonuses: Judgment Warning, Wall of Salvation Field, Land of Vain Glory"
15,Far Land,Mercenary Camp,MercenaryCamp008,Base mercs: 863.1M; Base cost: 15.72,Territory: Brock,"Part of bonuses: Faithful, Fair Speech, County of Coveting"
15,Far Land,Mercenary Camp,MercenaryCamp009,Base mercs: 1.1B; Base cost: 14.78,Territory: Mccarthy,"Part of bonuses: Lost Certificate, Imanuel’s Land, The Side of Danger"
15,Far Land,Mercenary Camp,MercenaryCamp010,Base mercs: 1.4B; Base cost: 21.30,Territory: Higgins,"Part of bonuses: Mistrust's House, Imanuel’s Land, The Side of Destruction"
15,Far Land,Mercenary Camp,MercenaryCamp011,Base mercs: 2.3B; Base cost: 24.80,Territory: Gill,"Part of bonuses: Mouth of Hell, Shadow of Dead, County of Coveting"
15,Far Land,Mercenary Camp,MercenaryCamp012,Base mercs: 2.8B; Base cost: 25.05,Territory: Vazquez,"Part of bonuses: Honesty, Lovegain, Enchanted Ground"
15,Far Land,Mercenary Camp,MercenaryCamp013,Base mercs: 1.2B; Base cost: 34.20,Territory: Clarke,"Part of bonuses: Pickthank's House, Court Edge, Vanity"
15,Far Land,Meta,Total Armies Required,70.9B,,
15,Far Land,Meta,Total Base Army Caches,6.2B,,
15,Far Land,Meta,Total Base Mercenaries,11.2B,,
15,Far Land,Meta,Total Base Mercenaries Costs,241.9B,,
15,Far Land,Meta,Total Base Money Caches,30.1B,,
15,Far Land,Meta,Total Base Money Generation Per Sec,307.4K,,
15,Far Land,Meta,Total Hospitals Save per Terr,84.8M,,
15,Far Land,Meta,Total Hospitals Upgrade Costs,151.9B,,
15,Far Land,Meta,Total Powers Available,TWx4 SACx1 SMx1 FCx3 MRx1 FBx1 IMx1,,
15,Far Land,Meta,Total Territories,744,,
15,Far Land,Recipe,Aluminum Bar,Requires: Aluminum x6.4K,Territory: Haynes,"Part of bonuses: Persevering Valiant, Wall of Salvation Field, Land of Vain Glory"
15,Far Land,Recipe,Barbed Wire,"Requires: Copper Bar x6, Nickel Bar x1",Territory: Pierce,"Part of bonuses: Help's Backyard, Slough of Despond, Helpness Place"
15,Far Land,Recipe,Copper Bar,Requires: Copper x405,Territory: Carpenter,"Part of bonuses: Site of Bad Advice, Morality's Village, Town of Morality"
15,Far Land,Recipe,Copper Wire,Requires: Copper Bar x3,Territory: Genesis Path,Part of bonuses: Royal Paths
15,Far Land,Recipe,Gold Bar,"Requires: Gold x14.2K, Tin x84.6K",Bonus: Place of Deliverance,Part of bonuses: Land of Vain Glory
15,Far Land,Recipe,Iron Bar,Requires: Iron x578,Territory: Hopkins,"Part of bonuses: Mr. Legality's Garden, Legality's Village, Town of Morality"
15,Far Land,Recipe,Lead Bar,Requires: Lead x2.3K,Territory: Green,"Part of bonuses: The Tophet, City of Destruction, Apostasy"
15,Far Land,Recipe,Metal Pipe,"Requires: Iron Bar x28, Nickel Bar x13, Zinc Bar x21",Territory: Reese,"Part of bonuses: Watchful's House, Imanuel’s Land, Hill of Difficulty"
15,Far Land,Recipe,Metal Sheet,"Requires: Tin Bar x66, Lead Bar x13",Territory: Wise,"Part of bonuses: Mouth of Hell, Shadow of Dead, County of Coveting"
15,Far Land,Recipe,Nail,"Requires: Iron Bar x8, Tin Bar x11",Territory: Vega,"Part of bonuses: Sunset Arbor, Imanuel’s Land, Pretense Bank"
15,Far Land,Recipe,Nickel Bar,Requires: Nickel x1.3K,Territory: Aijalon Path,Part of bonuses: Royal Paths
15,Far Land,Recipe,Platinum Bar,"Requires: Platinum x22.2K, Iron x134.3K",Bonus: Wilderness,"Part of bonuses: Fair Speech, County of Coveting"
15,Far Land,Recipe,Screw,Requires: Iron Bar x4,Bonus: Valley Lucre,Part of bonuses: Pleasant Meadow
15,Far Land,Recipe,Silicon Bar,Requires: Silicon x3.8K,Territory: Miller,"Part of bonuses: Pilgrim's Backyard, City of Destruction, Apostasy"
15,Far Land,Recipe,Silver Bar,"Requires: Silver x9.1K, Copper x71.2K",Territory: Perkins,"Part of bonuses: Help's Garden, Slough of Despond, Helpness Place"
15,Far Land,Recipe,Thorium Bar,"Requires: Thorium x67.0K, Silver x297.6K",Bonus: Executions Corner,Part of bonuses: Vanity
15,Far Land,Recipe,Tin Bar,Requires: Tin x428,Territory: Larson,"Part of bonuses: Wiked Gate, Wiked Gate District, Town of Morality"
15,Far Land,Recipe,Tin Can,Requires: Tin Bar x25,Territory: Rhodes,"Part of bonuses: Passion, Wall of Salvation Field, Land of Vain Glory"
15,Far Land,Recipe,Titanium Bar,"Requires: Titanium x42.9K, Zinc x258.0K",Territory: Keith,"Part of bonuses: Experience Garden, Enchanted Ground, Mt. Error"
15,Far Land,Recipe,Welding Rod,Requires: Aluminum Bar x8,Bonus: Lovegain,Part of bonuses: Enchanted Ground
15,Far Land,Recipe,Zinc Bar,Requires: Zinc x771,Territory: Dream Pier,Part of bonuses: Royal Paths
15,Far Land,Tech Recipe,!MS: Advanced negotiations,Requires: Lead Bar x108,,
15,Far Land,Tech Recipe,!MS: Assert dominance,"Requires: Gold Bar x8, Silicon Bar x336",,
15,Far Land,Tech Recipe,!MS: Bait and switch tactics,"Requires: Screw x160, Barbed Wire x250",,
15,Far Land,Tech Recipe,!MS: Basic Marketing,Requires: Tin Bar x28,,
15,Far Land,Tech Recipe,!MS: Basic negotiations,"Requires: Barbed Wire x76, Tin Bar x843",,
15,Far Land,Tech Recipe,!MS: Break a few shins,"Requires: Metal Sheet x59, Tin Can x146",,
15,Far Land,Tech Recipe,!MS: Efficient Smelters,"Requires: Nickel Bar x18, Iron Bar x326",,
15,Far Land,Tech Recipe,!MS: Faster Construction,Requires: Copper Bar x3.6K,,
15,Far Land,Tech Recipe,!MS: Faster Crafters,"Requires: Copper Wire x94, Zinc Bar x188",,
15,Far Land,Tech Recipe,!MS: Faster Smelters,Requires: Copper Bar x49,,
15,Far Land,Tech Recipe,!MS: Incentive Program,Requires: Tin Bar x394,,
15,Far Land,Tech Recipe,!MS: Intern Salesman,"Requires: Iron Bar x82, Tin Bar x215",,
15,Far Land,Tech Recipe,!MS: Medicine Refinement,Requires: Silver Bar x8,,
15,Far Land,Tech Recipe,!MS: Prefab Assembly,Requires: Lead Bar x467,,
15,Far Land,Tech Recipe,!MS: Price Collusion,"Requires: Barbed Wire x82, Nickel Bar x117",,
15,Far Land,Tech Recipe,"!MS: Tell your workers that it's cash","Requires: Platinum Bar x2, Zinc Bar x1.8K",,
15,Far Land,Tech Recipe,!MS: Window display on busy street,"Requires: Iron Bar x614, Copper Bar x1.5K",,
15,Far Land,Tech Recipe,Barehand Mining,"Requires: Tin Bar x11, Copper Bar x92",,
15,Far Land,Tech Recipe,Basic Recruitment,"Requires: Iron Bar x29, Copper Bar x326",,
15,Far Land,Tech Recipe,Better Trucks,Requires: Silicon Bar x14,,
15,Far Land,Tech Recipe,Bigger Trucks,"Requires: Nail x235, Copper Wire x893",,
15,Far Land,Tech Recipe,Billboards,Requires: Zinc Bar x36,,
15,Far Land,Tech Recipe,College Recruiters,"Requires: Tin Can x68, Silver Bar x22",,
15,Far Land,Tech Recipe,Cost Cutting,"Requires: Screw x74, Lead Bar x59",,
15,Far Land,Tech Recipe,Craft Dupe,"Requires: Screw x331, Barbed Wire x517",,
15,Far Land,Tech Recipe,"Cut Veteran's Benefits","Requires: Tin Can x74, Aluminum Bar x96",,
15,Far Land,Tech Recipe,Drafting,"Requires: Tin Bar x43, Copper Bar x172",,
15,Far Land,Tech Recipe,Drill Sergeant pay cuts,"Requires: Nail x103, Nickel Bar x572",,
15,Far Land,Tech Recipe,Drills,"Requires: Platinum Bar x10, Silver Bar x32",,
15,Far Land,Tech Recipe,Efficient Crafters,Requires: Zinc Bar x822,,
15,Far Land,Tech Recipe,Enforce the Use Tax,"Requires: Titanium Bar x3, Iron Bar x3.5K",,
15,Far Land,Tech Recipe,Headlamps,"Requires: Metal Pipe x81, Gold Bar x13",,
15,Far Land,Tech Recipe,High School Recruiters,"Requires: Screw x609, Barbed Wire x953",,
15,Far Land,Tech Recipe,Increase Sales Tax,"Requires: Aluminum Bar x31, Tin Bar x2.4K",,
15,Far Land,Tech Recipe,Increase Taxes on Corporations,Requires: Copper Bar x644,,
15,Far Land,Tech Recipe,Increase Taxes on the Rich,Requires: Iron Bar x128,,
15,Far Land,Tech Recipe,Infrastructure Upgrades,"Requires: Copper Wire x113, Nickel Bar x31",,
15,Far Land,Tech Recipe,Lanterns,"Requires: Nail x109, Lead Bar x259",,
15,Far Land,Tech Recipe,Logistics,"Requires: Zinc Bar x353, Nickel Bar x52",,
15,Far Land,Tech Recipe,Mandatory draft,"Requires: Copper Wire x405, Silicon Bar x45",,
15,Far Land,Tech Recipe,Mine Carts,"Requires: Nickel Bar x261, Lead Bar x24",,
15,Far Land,Tech Recipe,Pickaxes,"Requires: Iron Bar x15, Tin Bar x94",,
15,Far Land,Tech Recipe,Radio Commercials,Requires: Lead Bar x13,,
15,Far Land,Tech Recipe,Smelt Dupe,"Requires: Silicon Bar x93, Iron Bar x1.5K",,
15,Far Land,Tech Recipe,Smelt Smelt Smelt,"Requires: Aluminum Bar x203, Platinum Bar x5",,
15,Far Land,Tech Recipe,Something about Trucks,"Requires: Metal Sheet x54, Gold Bar x23",,
15,Far Land,Tech Recipe,TV Commercials,"Requires: Aluminum Bar x47, Silicon Bar x174",,
15,Far Land,Tech Recipe,Tariffs,"Requires: Metal Pipe x88, Nickel Bar x1.3K",,
15,Far Land,Tech Recipe,Torches,Requires: Zinc Bar x88,,
`.trim();
const mineRaw = `
Gaspo	100% Copper	-	-
Hopesonen	85% Copper	15% Tin	-
Freadwels	50% Copper	50% Tin	-
Valinia	80% Tin	20% Iron	-
Keleginary	20% Copper	30% Tin	50% Iron
Proftor	100% Iron	-	-
Handow	40% Copper	40% Tin	20% Zinc
Censborogeol	40% Copper	60% Zinc	-
Foremotions	80% Zinc	20% Nickel	-
Andorcel	20% Iron	30% Zinc	50% Nickel
Fectly	100% Nickel	-	-
Ciliked	40% Iron	40% Nickel	20% Lead
Stramentension	50% Zinc	50% Lead	-
Bragpose	20% Nickel	80% Lead	-
Probnonders	40% Tin	40% Lead	20% Silicon
Suffergizes	50% Lead	50% Silicon	-
Sparterchacks	20% Iron	80% Silicon	-
Judingsions	40% Nickel	40% Silicon	20% Aluminum
Gicabbonies	50% Silicon	50% Aluminum	-
Rivulstenspers	20% Lead	80% Aluminum	-
Draugerhytics	40% Silicon	40% Aluminum	20% Silver
Shadambuzzler	50% Aluminum	50% Silver	-
Excienested	20% Aluminum	80% Silver	-
Echnuthfirones	40% Zinc	40% Silver	20% Gold
Flautify	50% Silver	50% Gold	-
Grincurvinding	20% Silver	80% Gold	-
Rowskiman	40% Iron	40% Gold	20% Platinum
Herobbing	50% Gold	50% Platinum	-
Mufficatormes	20% Gold	80% Platinum	-
Diserbalned	40% Tin	40% Platinum	20% Titanium
Ottornood	50% Platinum	50% Titanium	-
Arraight	20% Platinum	80% Titanium	-
Sketeematic	40% Lead	40% Titanium	20% Thorium
Neutinoclar	50% Titanium	50% Thorium	-
Bewillo	20% Titanium	80% Thorium	-
Explum	40% Aluminum	40% Thorium	20% Neodymium
Catated	50% Thorium	50% Neodymium	-
Facipaz	20% Thorium	80% Neodymium	-
Bruther	40% Silver	40% Neodymium	20% Chromium
Wagorget	50% Neodymium	50% Chromium	-
Beconch	20% Neodymium	80% Chromium	-
Runnett	40% Gold	40% Chromium	20% Uranium
Farbors	50% Chromium	50% Uranium	-
Throomize	20% Chromium	80% Uranium	-
Apiesters	40% Platinum	40% Uranium	20% Lanthanum
Ounded	50% Uranium	50% Lanthanum	-
Chase-on	20% Uranium	80% Lanthanum	-
Chase-off	40% Titanium	40% Lanthanum	20% Samarium
Purson	50% Lanthanum	50% Samarium	-
Fondord	20% Lanthanum	80% Samarium	-
Pirelapperots	40% Thorium	40% Samarium	20% Terbium
Gallinstent	50% Samarium	50% Terbium	-
Naldors	20% Samarium	80% Terbium	-
Randix	40% Neodymium	40% Terbium	20% Erbium
Defegustical	50% Terbium	50% Erbium	-
Oppingeast	20% Terbium	80% Erbium	-
Norsents	40% Chromium	40% Erbium	20% Yttrium
Janeroces	50% Erbium	50% Yttrium	-
Tronnegated	20% Erbium	80% Yttrium	-
Spikover	40% Uranium	40% Yttrium	20% Dysprosium
Pacizantry	50% Yttrium	50% Dysprosium	-
Sponiansumble	20% Yttrium	80% Dysprosium	-
Toportienative	40% Lanthanum	40% Dysprosium	20% Unobtanium
Contairily	50% Dysprosium	50% Unobtanium	-
Ganishare	20% Dysprosium	80% Unobtanium	-`;

const minearray = mineRaw.trim().split("\n").map((line, id) => {
  if (!line) return;
  const segs = line.split("\t");
  const conv = function(s){
    if (s=="-") return undefined;
    const csegs = s.split(" ");
    return {type: csegs[1], percent: Number(csegs[0].replace("%",""))/100};
  }
  return {
    id,
    name: segs[0],
    ores: segs.slice(1).map(_ => conv(_)),
    raw: line,
  }
})
const minedict = minearray.reduce((o,cv) =>({...o,[cv.name]:cv}),{});
//console.log(minedict)

 function csvToArray(text) {
  // https://stackoverflow.com/a/8497474
  // Return array of string values, or NULL if CSV string not well formed.
  function CsvLinetoArray(text) {
    const re_valid =
      /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/
    const re_value =
      /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g
    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) return null
    const a = [] // Initialize array to receive values.
    text.replace(
      re_value, // "Walk" the string using replace with callback.
      function (m0, m1, m2, m3) {
        // Remove backslash from \' in single quoted values.
        if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"))
        // Remove backslash from \" in double quoted values.
        else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'))
        else if (m3 !== undefined) a.push(m3)
        return '' // Return empty string.
      }
    )
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('')
    return a
  }

  const lines = text.split('\n')
  const ops = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.trim() == '') continue

    const carr = CsvLinetoArray(line)
    if (carr == null) {
      console.error('malformat of csv: ', line)
      return []
    }

    ops.push(carr)
  }

  return ops
}

const levelData= csvToArray(levelCsv)
.map(_=>({
  levelId:_[0],
  levelName:_[1],
  type:_[2],
  name:_[3],
  details:_[4],
  location:_[5],
  locationHints:_[6],
}));
const territories=levelData.filter(_=>_.location)
.reduce((pv,cv)=>({...pv, [cv.location]:cv}),{});
//console.log(levelData, territories)

function formatNum(num) {
  if (!num) return "NaN";
  let displaynum = num;
  let pos = 0;
  while (displaynum > 1000) {
    displaynum /= 1000;
    pos++
  }
  const units = ' KMB';

  return displaynum.toFixed(1) + units[pos].trim();
}

function getNumberByUnit(num, unit) {
  const munit = unit == '' ? 1 :
    unit == 'K' ? 1000 :
    unit == 'M' ? 1000000 :
    unit == 'B' ? 1000000000 :
    1;
  return num * munit;
}

function getSpeed(text) {
  const matches = /\(([\d\.]+)([KMB]*)\/sec\)/.exec(text)
  const num = Number(matches[1])
  const unit = matches[2]
  return getNumberByUnit(num, unit);
}

function getResource(text) {
  const matches = /\/([\d\.]+)([KMB]*)/.exec(text)
  const num = Number(matches[1])
  const unit = matches[2]
  return getNumberByUnit(num, unit);
}

function getNumber(text) {
  try{
    const matches = /([\d\.]+)([KMB]*)/.exec(text)
  const num = Number(matches[1])
  const unit = matches[2]
  return getNumberByUnit(num, unit);}
  catch(err){
    console.warn(`cannot parse the number: ${text}`,err);
    return -1;
  }
}

function getTime(text) {
  if (text .startsWith(":")){
    const matches = /:(\d+)s/.exec(text)
    const s = Number(matches[1])
    return s;
  } else{
    const matches = /((\d+) minute[s]?, )?(\d+) seconds/.exec(text)
    const s = Number(matches[3])
    const m = Number(matches[2] ?? 0)
    return m*60+s;
  }
}

function getPercent(text) {
  if (!text.endsWith("%")) return text;
  return Number(text.replace("%",""))/100;
}

// hour counter, smelter recipe
setInterval(function() {
  const onehourarmy = getSpeed($("#ujs_ArmiesLabel #ujs_ArmiesLabel_tmp").text()) * 3600;
  $("#ujs_ArmiesContainer_div").text(formatNum(onehourarmy)+"/h")
  const onedayarmy = onehourarmy * 24;
  $("#ujs_ArmiesContainer_div").attr("title", formatNum(onedayarmy)+"/d")
  const onehourmoney = getSpeed($("#ujs_MoneyLabel #ujs_MoneyLabel_tmp").text()) * 3600;
  $("#ujs_MoneyContainer_div").text(formatNum(onehourmoney)+"/h")

  const mines = {};
  $("#ujs_MinesContainer .ujsGameObject .ujsPCH")
    .each(function() {
      const key = $(this).find(".ujsImgInner").css("background-image").slice(47, 53)
      const val = $(this).text().replace("/s", "");
      const mkey = mdict[key];
      if (!mines[mkey]) mines[mkey] = 0;
      mines[mkey] += Number(val);
    });
  const mtitle =
    Object.entries(mdict)
    .filter(([k, v]) => mines[v])
    .map(([k, v]) => `${v}: ${mines[v].toFixed(1)}/s, ${formatNum(mines[v]*3600)}/h`)
    .join("\n");
  $("#ujs_MinesBody .ujsInner.ujsTextInner[id^='ujs_Header']").attr("title",mtitle)
  
  // smelter recipe
  $("[id^='ujs_RecipesContainer'] .ujsTextInner[id^='ujs_DurationLabel']")
  .each(function(){
    const time = getTime($(this).text());
    const relem = $(this).parent().parent().parent().find(".ujsImgInner[id^='ujs_ResourceIcon']")[0];
    const rkey = $(relem).css("background-image").slice(47, 53);
    const ramount = getResource($(relem).parent().parent().find(".ujsText > .ujsTextInner[id^='ujs_Text']").text());
    const sp = ramount / time
    const result = `:${time}s ${formatNum(sp)}/s (${formatNum(mines[mdict[rkey]])})`;
    $(this).text(result);
  })
}, 10000);

// auto smelters
const smelters={};
setInterval(function() {

  const progTexts= $("#ujs_SmeltersBacking .ujsTextInner[id^=ujs_ProgressLabel]").map(function(){return $(this).text()});
  const changeBtns= $("#ujs_SmeltersBacking .btn.ujsInner.ujsBtnInner[id^=ujs_SwitchRecipeBtn]");
  const assigned = {};
  
  for (var i = 0; i < changeBtns.length; i++) {
    const cbtn = changeBtns[i]
    const text= progTexts[i]
    if (!smelters[i]) smelters[i]=Date.now();
    const duration = Date.now() - smelters[i]
    //console.log(i, text, duration)
    if (text != 'Waiting for Resources' && duration < 360000) continue;
    
    cbtn.click();
    
    // in Pick Recipe Dialog
    const selectBtns = $("#ujs_GenericContainer .ujsGameObject.ujsBtn.ujsImg>.btn.ujsInner.ujsBtnInner[id^=ujs_SelectBtn]")
    .slice(0,-1) //except last deactivate button

    let clicked= false;
    for (var j = selectBtns.length - 1; j >= 0 ; j--) {
      if (assigned[j]) continue;
      const sbtn = selectBtns[j]
      const sbase= $(sbtn).parent().parent().parent();
      //const sres = $(sbase.find(".ujsImgInner[id^='ujs_ResourceIcon']")[0]).css("background-image").slice(47, 53)
      const samountText = $(sbase.find(".ujsGameObject[id^='ujs_ResourcesContainer'] .ujsTextInner[id^='ujs_Text']").slice(-1)).text()

      const samount = getNumber(samountText.split("/")[0]);
      if (samount==-1) console.log(sbase.find(".ujsGameObject[id^='ujs_ResourcesContainer'] .ujsTextInner[id^='ujs_Text']"))      
      if (samount>40000){
        sbtn.click();
        assigned[j] = true;  
        clicked= true;
        break;
      }
    }
    
    if (!clicked){
      selectBtns[0].click();
    }

    smelters[i]=Date.now();
  }
  
}, 10000);

// avoid idle counter
setInterval(function() {
  const elems = $("#Reserve").get();
  if (elems.length == 0) {
    console.warn("failed to find reserve canvas for idle counter avoider.");
    return;
  }
  elems[0].click()
  
  $("#ujs_LiveWorldRoot canvas").each(function(){this.click();});
}, 100000)

// update mine detail
setInterval(function() {
  const elem = $("#ujs_InspectBody #ujs_AssetsContainer .ujsGameObject[id^=ujs_AssetRow] .ujsTextInner[id^=ujs_Text]");
  if (!elem) return;
  const text = elem.text().replace(/^Find/,"");
  if (!text.startsWith("Mine:")) return;

  const name = text.split(":")[1].trim();
  const md = minearray.filter(_=>_.name == name)[0];
  if (!md) return;
  
  //elem.text(`Mine: ${name} (${md.raw})`);
  elem.attr("title", `${md.id}: ${md.raw}`);
}, 1000);

// update territory detail
setInterval(function() {
  const elem = $("#ujs_TopBar_2 #ujs_MainLabel_tmp");
  if (elem.get().length==0) return;
  elem.attr("title", "");
  
  if(!$._data(elem.get(0),"events")){
    elem.dblclick(function (){
      const text =$(this).text();
      const dict = JSON.parse(localStorage.getItem("warzone_notes") ?? "{}");
      const note = dict[text];
      const p = prompt(`Your notes on ${text}`, note);
      if (p) dict[text] = p;
      localStorage.setItem("warzone_notes", JSON.stringify(dict))
    })
  }
  
  const text = elem.text();
  const ter = territories[text];
  //console.log(text, ter, territories)
  const hter = ter ?`${ter.type} [${ter.name}]: ${ter.details}` :"";
  
  const dict = JSON.parse(localStorage.getItem("warzone_notes") ?? "{}");
  const note = dict[text];
  const hnote = note ? (note+(ter?" | ":"")):"";
  
  const content = `${hnote}${hter}`;
  if (!content) return;
  elem.attr("title", content);
  const foggedElem= elem.parent().parent().parent().find("#ujs_DetailsLabel_tmp span")
  const foggedText= foggedElem.text();
  if (foggedText!="(fogged)") return;
  foggedElem.parent().css("width", "380px");
  foggedElem.text(content);
  foggedElem.attr("title", content);
}, 1000);


// update modifiers
const modifiers={};
function updateModifiers() {
  const elem = $("#ujs_ModifiersBtn_btn");
  if (elem.get().length==0) return;
  elem.click();
  
  const arr = $(".ujsGameObject[id^='ujs_Content'] .ujsGameObject[id^='ujs_row'] .ujsTextInner[id^='ujs_Text']")
  .map(function(){return $(this).text().trim();})
  .get();
  for(let i = 0; i < arr.length / 2; i++){
    modifiers[arr[i*2]]=getPercent( arr[i*2+1]);
  }
  
  // close
  $(".ujsGameObject[id^='ujs_ModifierBreakdownDialog'] .ujsBtnInner[id^='ujs_CloseBtn']").click();
  //console.log("modifiers", modifiers)
}

setTimeout(updateModifiers, 7000);
//setInterval(updateModifiers, 100000);

// update army
    function getRawArmyByLevel(level, accelerate=0){
    return (3*level**2+level+3)*(1+accelerate);
  }
  
  function getArmyDiff(curLevel){
    const a=getRawArmyByLevel(curLevel);
    const b = getRawArmyByLevel(curLevel+1);
    return b-a;
  }

const levelarmies= Array.from(Array(30).keys()).map(_=>getRawArmyByLevel(_+1));
function estimateArmyLevel(num){
  const acc=Number(modifiers["Army Camp Production"]);

  for(let i =0; i < levelarmies.length; i++){
    if ((num - levelarmies[i]*(1+acc))/ num <0.01){
      return i+1;
    }
  }
}

function updateArmyCostPerf() {
// army upgrade Money
const upgradeCosts=$(".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsGameObject[id^='ujs_UpgradeBtnContainer'] .ujsText[id^='ujs_Text']")
  .map(function(){return $(this).text().trim();})
  .get()
  .map(_=>getNumber( _.replace("Upgrade\n￦","")));
  
  // army production
const productions=$(".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsGameObject.ujsText[id^='ujs_ArmiesPerSecondLabel'] .ujsTextInner[id^='ujs_ArmiesPerSecondLabel']")
  .map(function(){return $(this).text().trim();})
  .get()
  .map(_=>getNumber(_.replace("₳","").replace(" / sec","")));
  
  // army levels (not real level, because the base level unknown)
//const levels=$(".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsTextInner[id^='ujs_LevelLabel']")
//  .map(function(){return $(this).text().trim();})
//  .get()
//  .map(_=>Number(_.replace("L","")));

// army levels (estimate)
  const levels = productions.map(_=>estimateArmyLevel(_));

  //console.log(upgradeCosts, productions, levels)
  const labels= $(".ujsGameObject[id^='ujs_WziTabBodyArmyCampRow'] .ujsTextInner[id^='ujs_NameLabel']").get();
  const cps = upgradeCosts.map((_,i)=>upgradeCosts[i] / getArmyDiff(levels[i]));
  const mincpidx = cps.indexOf(Math.min(...cps));
  //console.log(mincpidx, Math.min(...cps),cps)
  for (let i =0; i< labels.length; i++){
    const cp = `Cost Perf.: ${formatNum(cps[i])}, Increase: ${formatNum(getArmyDiff(levels[i])*3600*24)}/d`
    $(labels[i]).attr("title", cp);
    $(labels[i]).css("color", i==mincpidx?"aliceblue":"");
  }

}

// update mine cost performance
    function getRawMineByLevel(level, accelerate=0){
    const revise = level == 1 ? 0.3 : level ==2 ? 0.6: level == 3 ? 0.8 : 1;
    return (0.3*level**2+level+2)*revise*(1+accelerate);
  }
    
  function getMineDiff(curLevel){
    const a=getRawMineByLevel(curLevel);
    const b = getRawMineByLevel(curLevel+1);
    return b-a;
  }
  
  let orePriceDict={};
  function getRawMineWorth(name,curLevel){
    const os = minedict[name].ores;
    let w=0;
    const total = getRawMineByLevel(curLevel);
    //console.log(os);
    for (let j  =0; j< os.length; j++){
      if (!os[j]) break;
      w+=os[j].percent * orePriceDict[os[j].type]*total;
      //console.log(_,total,w,os[j].percent,os[j].type)
    }
    return w;
  }
  function getRawMineWorthDiff(name,curLevel){
        const a=getRawMineWorth(name,curLevel);
    const b = getRawMineWorth(name,curLevel+1);
    return b-a;
  }
  
function updateMineCostPerf() {
// mine upgrade Money
const upgradeCosts=$(".ujsGameObject[id^='ujs_Hamburger'] .ujsGameObject[id^='ujs_Left'] .ujsGameObject[id^='ujs_UpgradeBtnContainer'] .ujsText[id^='ujs_Text']")
  .map(function(){return $(this).text().trim();})
  .get()
  .map(_=>getNumber( _.replace("Upgrade\n￦","")));
  
  // mine last production
const prods=$(".ujsGameObject[id^='ujs_Hamburger'] .ujsGameObject[id^='ujs_Vert']")
  .map(function(){
     const n = $($(this).find(".ujsPCH[id^='ujs_ResourceLabelContainer'] .ujsText[id^='ujs_Text']").get().slice(-1)).text();
     const num = getNumber(n.replace("/s",""));
     const typecolor = $($(this).find(".ujsPCH[id^='ujs_ResourceLabelContainer'] .ujsImgInner[id^='ujs_ResourceIcon']").get().slice(-1))
     .css("background-image").slice(47, 53);
     const type = mdict[typecolor];
     return {num, type};
  })
  .get();

// ore Price
const ores =$("#ujs_ResourcesOreBody .ujsGameObject[id^='ujs_WziTabBodyResourceRow']")
  .map(function(){
     const p = $(this).find(".ujsTextInner[id^='ujs_SellsForLabel']").text();
     const price = getNumber(p.replace("/s",""));
     const type = $(this).find(".ujsTextInner[id^='ujs_NameLabel']").text();

     return {price, type};
  })
  .get();
  orePriceDict = ores.reduce((o,cv)=>({...o,[cv.type]:cv.price}),{});
  //console.log("ores", ores, oreDict);

  // mine levels
  const levels=$(".ujsGameObject[id^='ujs_WziTabBodyMineRow'] .ujsTextInner[id^='ujs_LevelLabel']")
  .map(function(){return $(this).text().trim();})
  .get()
  .map(_=>Number(_.replace("L","")));

  //console.log(upgradeCosts, productions, levels)
  
  const labels= $(".ujsGameObject[id^='ujs_WziTabBodyMineRow'] .ujsTextInner[id^='ujs_NameLabel']").get();
  const names = labels.map(_=>$(_).text());
  const cps = upgradeCosts
  .map((_,i)=>upgradeCosts[i] / 
  (getMineDiff(levels[i]) *minedict[names[i]].ores.find(_=>_.type == prods[i].type).percent));
  //console.log(names)
  const worths = names.map((_,i)=>getRawMineWorthDiff(_,levels[i]));
  const wps = upgradeCosts
  .map((_,i)=>upgradeCosts[i] / worths[i]);
  const maxwps=Math.max(...wps);

  for (let i =0; i< labels.length; i++){
    //console.log(prods[i].type)
    //console.log(prods.map((j, p)=>({p,j})).map(_=>_.p))
    const mincp = Math.min(...prods.map((p, j)=>({p,j})).filter(_=>_.p.type==prods[i].type).map(_=>cps[_.j]));
    const cp = `Worth-Perf: ${formatNum(wps[i])}, Cost-Perf.: ${formatNum(cps[i])}`;
    
    $(labels[i]).attr("title", cp);
    $(labels[i]).css("color", maxwps==wps[i] ? "teal": mincp == cps[i] ? "aliceblue":"");
  }

}

setInterval(updateMineCostPerf, 10000);
setInterval(updateArmyCostPerf, 10000);
$("a.btn[id^='ujs_UpgradeBtn']").on("click", function(){
  console.log("update after upgrade")
  updateMineCostPerf();
  updateArmyCostPerf();
})

/*
TODO:
- x update info after click upgrade
- y mine cost-performance include ore price calculation
- hospital calculation
- wrong artifacts for upgrade mine
*/
  
// get mine production
//$($(".ujsGameObject[id^='ujs_Hamburger'] .ujsGameObject[id^='ujs_Vert']").get(1)).find(".ujsPCH[id^='ujs_ResourceLabelContainer'] .ujsText[id^='ujs_Text']").text()
// get mine upgrade Money
//$($(".ujsGameObject[id^='ujs_Hamburger'] .ujsGameObject[id^='ujs_Left'] .ujsGameObject[id^='ujs_UpgradeBtnContainer'] .ujsText[id^='ujs_Text']").get(1)).text()
// ore Price
//$($(".ujsGameObject[id^='ujs_WziTabBodyResourceRow'] .ujsGameObject.ujsText[id^='ujs_SellsForLabel'] .ujsTextInner[id^='ujs_SellsForLabel']").get(2)).text()








