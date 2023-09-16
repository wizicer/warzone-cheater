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

export const minearray = mineRaw.trim().split("\n").map((line, id) => {
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

export const minedict = minearray.reduce((o,cv) =>({...o,[cv.name]:cv}),{});
//console.log(minedict)

export const mdict = {
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
  "8600FF": "Neodymium",
  "FF0026": "Chromium",
  "88A1FF": "Uranium",
  "D9D4AD": "Samarium",
  "734400": "Lanthanum",
  "FF6260": "Terbium",
  "FFCD6D": "Erbium",
};