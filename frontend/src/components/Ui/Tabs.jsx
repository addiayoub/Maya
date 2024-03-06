import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const TabsComponent = ({ tabs, tabPanelClasses = "" }) => {
  const [tabValue, setTabValue] = useState(0);
  console.log("tabs", tabs);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      {tabs.length > 0 && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="mui-tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.name} className={tabPanelClasses} />
            ))}
          </Tabs>

          {tabs.map((tab, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              {tab.content}
            </TabPanel>
          ))}
        </Box>
      )}
    </>
  );
};

export const TabPanel = ({ children, value, index, className }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box className={`p-1 ${className}`}>{children}</Box>}
  </div>
);

export default TabsComponent;
