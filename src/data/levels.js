import levels from './levels.json'

export const levelData = levels
.map(_=>({
  levelId:_["Level ID"],
  levelName:_["Level Name"],
  type:_["Type"],
  name:_["Name"],
  details:_["Details"],
  location:_["Location"],
  locationHints:_["Location hints"],
}));
