function updateSkolmaten() {
  const schoolId = "5c04b397-ca89-433b-a596-231c7a5ef1a3";
  const baseUrl = "https://skolmaten.se/api/4/menu/";
  const days = fetchDays(baseUrl, schoolId, 2);
  
  saveToJson("skolmaten_today.json", generateSingle(new Date(), days[0]));
  saveToJson("skolmaten_tomorrow.json", generateSingle(getDateTomorrow(), days[1]));
}

function fetchDays(baseUrl, schoolId, days) {
  var headers = {
    //"Authorization": "<API key>",
    "Referer": "https://skolmaten.se/",
  };

  var options = {
    "method": "GET",
    "headers": headers,
  };

  const dateToday = new Date();
  let year = dateToday.getFullYear();
  let week = getWeek(dateToday);
  let day = getDay(dateToday);

  let weekDays = null;
  let output = [];

  for (let i = 0; i < days; i++) {
    if (weekDays == null) {
      // Fetch week
      const response = UrlFetchApp.fetch(baseUrl + schoolId + "?year=" + year + "&week=" + week, options);
      const json = JSON.parse(response.getContentText());
      weekDays = json["WeekState"]["Days"];
    }

    // Add day
    //Logger.log("Adding day " + day + " from week: " + week);
    output.push(weekDays[day])

    // Next school day
    day++;
    if(day >= 5) {
      // Go to next week
      week++;
      day = 0;
      weekDays = null;

      if(week > 52) {
        // Go to next year
        week = 1;
        year++;
      }
    }
  }

  return output;
}

function generateSingle(targetDate, day) {  
  let output = [];

  if (day) {
    let choices = [day["Meals"][0]["name"]];
    if(day["Meals"].length > 1)
      choices.push(day["Meals"][1]["name"]);

    drawLayout(output, new Date(day["date"]), choices);
  }
  else {
    drawLayout(output, targetDate, ["Ingen skolmat serveras"]);
  }

  return output;
}

function drawLayout(output, date, choices) {
  let height = 0; // Screen size: 296x128
  output.push(createItem('text', [148, 5, getDayName(date), "calibrib30", 2, 1]));
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

function getDay(date) {
  // Get day of week staring Monday
  return (date.getDay() + 6) % 7;
}

function getDayName(date) {
    const diff = getDateDiff(new Date(), date);

    if(diff == 0)
      return "Idag";
    else if(diff == 1)
      return "Imorgon";
    else {
      switch(getDay(date)) {
        case 0: return "Måndag";
        case 1: return "Tisdag";
        case 2: return "Onsdag";
        case 3: return "Torsdag";
        case 4: return "Fredag";
        case 5: return "Lördag";
        case 6: return "Söndag";
      }
    }

    return "???"
}

function getWeek(date) {
  let d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - getDay(d));       // Thursday in current week decides the year.
  var week1 = new Date(d.getFullYear(), 0, 4);  // January 4 is always in week 1.

  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000
                        - 3 + getDay(week1)) / 7);
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