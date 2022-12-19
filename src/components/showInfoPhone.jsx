import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import "./showInfo.css";

export const ShowInfoPhone = ({ info }) => {
    console.log(typeof info.phone_number !== "undefined")
    if(typeof info.phone_number !== "undefined"){
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
                        phone Information
                      </Typography>
                      <br />
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        id="standard-read-only-inpu"
                        label="PhoneNumber"
                        defaultValue=" "
                        value={typeof info.phone_number !== "undefined" ? info.phone_number : " "}
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
