import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./App.css";
import { gymData } from "./assets/data";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const styles = {
  iconNumber: {
    border: "solid black 1px",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "bold",
  },
  twoDivs: {
    display: "flex",
  },
};

function App() {
  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState(true);
  const [iconStateOne, setIconStateOne] = useState(false);
  const [iconStateTwo, setIconStateTwo] = useState(false);

  const [saleDone, setSaleDone] = useState({
    "Rack Height": undefined,
    "Upright Colors": undefined,
    "Rack Depth": undefined,
    "Crossmember Colors": undefined,
    "Pullup-Bar": undefined,
  });
  const [temp, setTemp] = useState();

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel);
    setExpanded(!isExpanded ? true : panel);
  };

  const handleSelect = (e, test) => {
    if (test[0].title === "Rack Height") {
      setSaleDone({ ...saleDone, "Rack Height": test[0].v });
    } else if (test[0].title === "Upright Colors") {
      setSaleDone({ ...saleDone, "Upright Colors": test[0].v });
      console.log("YES", saleDone);
    } else if (test[0].title === "Rack Depth") {
      setSaleDone({ ...saleDone, "Rack Depth": test[0].v });
      console.log("YES", saleDone);
    } else if (test[0].title === "Crossmember Colors") {
      setSaleDone({ ...saleDone, "Crossmember Colors": test[0].v });
      console.log("YES", saleDone);
    } else if (test[0].title === "Pullup-Bar") {
      console.log("first", test);
      setSaleDone({ ...saleDone, "Pullup-Bar": test[0].value });
      setIconStateOne(!iconStateOne);
      console.log("YES", saleDone);
    }
  };
  console.log("YES", saleDone);
  const renderChildren = (gymData) => {
    return (
      <>
        {gymData.children.map((c, i) => (
          <>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} key={c.id}>
                <Typography key={c.id}>
                  {c.name}
                  {saleDone[c.name] ? <Button>{saleDone[c.name]}</Button> : ""}
                </Typography>
              </AccordionSummary>
              <AccordionDetails key={c.id}>
                {c.name === "Pullup-Bar"
                  ? c.value.map((bar, i) => (
                      <ToggleButtonGroup
                        // sx={{ display: "flex", flexDirection: "row" }}
                        value={temp}
                        onChange={handleSelect}
                        key={i}
                      >
                        <ToggleButton
                          value={{ title: c.name, value: bar.name }}
                        >
                          {bar.img}
                        </ToggleButton>
                        {bar.name}
                      </ToggleButtonGroup>
                    ))
                  : c.value.map((v, i) => (
                      <ToggleButtonGroup
                        value={temp}
                        onChange={handleSelect}
                        key={i}
                      >
                        <ToggleButton value={{ title: c.name, v }}>
                          {v}
                        </ToggleButton>
                      </ToggleButtonGroup>
                    ))}
              </AccordionDetails>
            </Accordion>
          </>
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <form>
        <Accordion expanded={expanded} onChange={handleChange("panel1")}>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            {!iconStateOne ? (
              <div style={styles.iconNumber}>1</div>
            ) : (
              <CheckCircleOutlineIcon />
            )}
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Build Your Frame
            </Typography>
            <Button variant="outlined" sx={{ left: "40%" }}>
              EDIT
            </Button>
          </AccordionSummary>

          {renderChildren(gymData)}
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            {!iconStateTwo ? (
              <div style={styles.iconNumber}>2</div>
            ) : (
              <CheckCircleOutlineIcon />
            )}
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Build Your Function
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis
              laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </form>
      <div>
        <div>
          <img
            src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSbrtCEdH8Hor2Hg2poW2S4BwDmZSS7OyZHT0XWwDIRFUVjY5lfM79CfMyGxcXNwsunADKll7AmLT76WK9riuWZ8UCECctvYA&usqp=CAY"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
