
const obj = {
  "00K010": ["00K_0726-HDR","00K_0731-HDR","00K_0736-HDR","00K_0737-HDR"],
  "00K020": ["00K_0713-HDR","00K_0807-HDR","00K_0812-HDR","00K_0819-HDR"]
}
let keys = [], paths = [];

for (let dirName in obj) {
  keys.push(dirName);
  obj[dirName].forEach(fileName => {
    paths.push(`${dirName}/${fileName}.jpg`);
  });
}
saveZip( paths, composeName(keys) );

/***************************************************************************/
function saveZip(filePaths, zipName='archive') {

  const zip = new JSZip();

  const addFile = async function(url) {
    let response = await fetch(url);
    let content = await response.blob();
    zip.file(url, content);
  }
  let additions = [];
  filePaths.forEach(url => additions.push( addFile(url) ));

  return Promise.all(additions).then(function() {
    zip.generateAsync({type:'blob'}).then(content => {
      saveAs(content, zipName +'.zip');
    });
  });
}
/***************************************************************************/
function composeName(names, defaultName) {
  
  let name = names[0];

  for (let i = 1; i < names.length; i++) {
    let curName = names[i];
    let j = 1;
    while (j < curName.length) {
      if (curName[j] != name[j]) break;
      j++;
    }
    if (j < 2) return defaultName || (new Date()).toLocaleDateString('ru-RU');
    name = curName.substr(0, j);
  }
  return name;
}
/***************************************************************************/
