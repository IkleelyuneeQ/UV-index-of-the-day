
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";



// 2. Create an express app and set the port number.
const app = express();
const port = process.env.PORT || 3000;
const ApiKey = "openuv-1oa2crlnnzffmp-io"
const url = 'https://api.openuv.io/api/v1/uv';


// 3. Use the public folder for static files.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",  (req, res) => {
    res.render("index.ejs")
})


app.post("/latlong", async(req, res) => {
    const lat = req.body.latitude;
    const lng = req.body.longitude;
    const cty = req.body.city;
    const alt = 100;
    const dt = "2023-10-13T12:00:00Z";
    
    const config = {
        headers: {
          'x-access-token': 'openuv-1oa2crlnnzffmp-io',
          'Content-Type': 'application/json',
        },
        params: {
          lat,
          lng,
          alt,
          dt,
        },
      };
    try {
        const response = await axios.get(url, config);
        console.log(response.data);
        res.render("index.ejs", {
            uv : response.data.result.uv,
            uvMax : response.data.result.uv_max,
            uvMaxTime : response.data.result.uv_max_time,
            city : cty,
        } )
    }
    catch (error) {
        console.log("error", error)
        res.status(500);
      }
})

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });




  
