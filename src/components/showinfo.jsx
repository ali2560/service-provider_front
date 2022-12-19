import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import "./showInfo.css";

export const ShowInfo = ({ info }) => {
    console.log(typeof info.given_name !== "undefined")
    if(typeof info.given_name !== "undefined"){
        return (
            <div>
              {Object.keys(info).length !== 0 ? (
                <div className="cardstyle">
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        personal Information
                      </Typography>
                      <br />
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        id="standard-read-only-inpu"
                        label="FirstName"
                        defaultValue=" "
                        value={typeof info.given_name !== "undefined" ? info.given_name : " "}
                      />
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        id="standard-read-only-inpu"
                        label="LastName"
                        defaultValue=" "
                        value={info.family_name}
                      />
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        id="standard-read-only-inpu"
                        label="Email"
                        defaultValue=" "
                        value={info.email}
                      />
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        id="standard-read-only-inpu"
                        label="address"
                        defaultValue=" "
                        value={info.street_address}
                      />
                    </CardContent>
                  </Card>
                </div>
              ) : " "}
            </div>
          );
    }
    else {
      return <div></div>
    }
  
};
