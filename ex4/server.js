// Json document
jsonOfWeekdays = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
    "Saturday": 5,
    "Sunday": 6
}

// styles for looking good (css)
styles = `
    <style>
    .myTable {
        width: 100%;
        text-align: left;
        background-color: rgb(86, 245, 86);
        border-collapse: collapse;
    }
    .myTable th {
        background-color: rgb(66, 87, 36);
        color: white;
    }

    .myTable td,
    .myTable th {
        padding: 10px;
        border: 1px solid white;
    }
    </style>
    `

// main HTML file
htmlFile = `<!DOCTYPE html>
  <html>
  
  <head>
      <title>Days of the week</title>
  </head>
  ${styles}  
  <body>
      <h1>Days of the week</h1>
      <table class="myTable">
          <tr>
              <th>Day</th>
              <th>Count</th>
          </tr>
          <tr>
              <td>Monday</td>
              <td>${jsonOfWeekdays.Monday}</td>
          </tr>
          
          <tr>
              <td>Tuesday</td>
              <td>${jsonOfWeekdays.Tuesday}</td>
          </tr>
          <tr>
              <td>Wednesday</td>
              <td>${jsonOfWeekdays.Wednesday}</td>
          </tr>
          <tr>
              <td>Thursday</td>
              <td>${jsonOfWeekdays.Thursday}</td>
          </tr>
          <tr>
              <td>Friday</td>
              <td>${jsonOfWeekdays.Friday}</td>
          </tr>
          <tr>
              <td>Saturday</td>
              <td>${jsonOfWeekdays.Saturday}</td>
          </tr>
          <tr>
              <td>Sunday</td>
              <td>${jsonOfWeekdays.Sunday}</td>
          </tr>
      </table>
  
</body>
</html>`

// let's create the localhost server using express
// initialze the server
const express = require("express");
const server = express();

// responce for .../json.
// Task 7
server.get('/json', (req, res) => {
    res.set({ 'Content-Type': 'application/json' });
    res.send(jsonOfWeekdays);
});

// responce for ../html.
// Task 8
server.get('/html', (req, res) => {
    res.set({ 'Content-Type': 'application/html' });
    res.setHeader("Content-Type", "text/html");
    res.send(htmlFile);
});

// filter
// Task 9
server.get('/html/:id', (req, res) => {
    res.set({ 'Content-Type': 'application/html' });
    res.setHeader("Content-Type", "text/html");
    isFound = false;
    try {
        dayno = parseInt(req.params.id);
        for (let key in jsonOfWeekdays) {
            if (dayno == jsonOfWeekdays[key]) {
                html = `<!DOCTYPE html>
                <html>
                
                <head>
                    <title>Days of the week</title>
                </head>
                
                <body>
                    <h1>Days of the week</h1>
                    ${styles}
                    <table class="myTable">
                        <tr>
                            <th>Day</th>
                            <th>Count</th>
                        </tr>
                        <tr>
                            <td>${key}</td>
                            <td>${jsonOfWeekdays[key]}</td>
                        </tr>
                    </table>
                </body>
                
                </html>`;
                res.send(html);
                isFound = true;
            }
        }

    } catch (error) {
        res.send("<h1>Not found </h1>")
    }
    if (isFound == false) {
        res.send("<h1>Not found </h1>")
    }

})

// start running server (port is 3000)
server.listen(3000, function () {
    console.log("Server is running on localhost3000");
});