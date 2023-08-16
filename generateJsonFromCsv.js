const fs = require("fs");

fs.readFile("data_source.csv", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const rows = data.split("\r\n");
  const header = rows.shift().split(",");

  let formatedData = [];

  for (const row of rows) {
    const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const json = header.reduce((acc, curr, i) => {
      const col = cols[i];
      const normalizedCol =
        col.length === 0 || col === "-" ? null : col.replace(/['"]+/g, "");
      return {
        ...acc,
        [curr]: normalizedCol,
      };
    }, []);
    formatedData = [...formatedData, json];
  }

  fs.writeFile("data_source.json", JSON.stringify(formatedData), (err) => {
    console.log(err);
  });
  console.log(formatedData);
});
