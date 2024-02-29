function updateSkolmaten() {
  const school = "mellanhedsskolan";
  const url = "https://skolmaten.se/" + school + "/rss/days/?offset=0&limit=4"; // Four days to include Mon on a Fri
  const items = fetchData(url);
  const dateToday = new Date();
  var itemToday = null;
  var itemNext = null;

  items.forEach(item => {
    if(itemNext === null)
    {
        const date = new Date(item.getChild('pubDate').getText());
        const diff = getDateDiff(dateToday, date);

        if(diff == 0) { itemToday = item; }
        else if(diff > 0) { itemNext = item; }
    }
  });

  saveToJson("skolmaten_today.json", generateSingle(itemToday, dateToday));
  saveToJson("skolmaten_tomorrow.json", generateSingle(itemNext, getDateTomorrow()));
}

function generateSingle(item, dateTarget) {  
  let output = [];
  let title = "";
  let date = dateTarget;
  let choices = ["Ingen skolmat serveras"];

  if(item !== null)
  {
    title = item.getChild('title').getText().split(' ')[0];
    date = new Date(item.getChild('pubDate').getText());
    choices = item.getChild('description').getText().split('<br/>');
  }

  const diff = getDateDiff(new Date(), date);
  if(diff == 0) { title = "Idag"; }
  else if(diff == 1) { title = "Imorgon"; } 

  drawLayout(output, title, date, choices);

  return output;
}

function drawLayout(output, title, date, choices) {
  let height = 0; // Screen size: 296x128
  output.push(createItem('text', [148, 5, title, "calibrib30", 2, 1]));
  output.push(createItem('text', [291, 5, "v" + getWeek(date), "calibrib16", 1, 2]));
  height += 40;
  
  height = drawChoice(output, height, choices[0]);
  height += 10;

  output.push(createItem('box', [20, height, 256, 2, 2]));
  output.push(createItem('circle', [148, height, 5, 2]));
  height += 15;

  if(choices.length > 1)
  {  
    height = drawChoice(output, height, choices[1]);
  }
}

function drawChoice(output, height, str) {
  var choice = wrapString(str, 38); // Number of characters per line

  for (let i = 0; i < choice.length; i++) {
    output.push(createItem('text', [148, height, choice[i], "calibrib16", 1, 1]));
    height += 16;
  }

  return height;
}

function createItem(type, data) {
  var item = {};
  item[type] = data;
  return item;
}

function wrapString(str, length) {
  const wrappedString = str.replace(new RegExp(`(?![^\\n]{1,${length}}$)([^\\n]{1,${length}})\\s`, 'g'), '$1\n');
  return wrappedString.split('\n');
}

function getDateTomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1)
  return date;
}

function getDateDiff(date1, date2) {
  // Compare dates ignoring time
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  const daysDiff = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24)); 
  return daysDiff;
}

function getWeek(date) {
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7); // Thursday in current week decides the year.
  var week1 = new Date(date.getFullYear(), 0, 4);             // January 4 is always in week 1.

  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

function fetchData(url) {
  let txt = UrlFetchApp.fetch(url).getContentText();
  let document = XmlService.parse(txt);
  let root = document.getRootElement();
  let channel = root.getChild('channel');
  let items = channel.getChildren('item');

  return items;
}

function saveToJson(filename, obj) {
  // Get current folder
  const id = ScriptApp.getScriptId();
  const folder = DriveApp.getFileById(id).getParents().next();
  const contents = JSON.stringify(obj);

  // Add or update file
  var children = folder.getFilesByName(filename);
  if (children.hasNext()) {
    var file = children.next();
    file.setContent(contents);
  } else {
    file = folder.createFile(filename, contents);
  }
}
