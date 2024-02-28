# Skolmaten
Script to fetch the Swedish school meal menu and display it on 2.9" EPaper tags. <br>
<img width="700" src="https://github.com/leXorNet/Skolmaten/assets/951893/4c524b55-0053-4400-9dd1-594893006a22">


## Features
* Uses the RSS-feed of your chosen school to fetch the current menu every night.
* Generates two json files formatted for 2.9" displays;
  - One with the menu of today.
  - One with the menu of the next day (if on a weekend, the Monday menu will be displayed).


## Requirements
* [Google Drive](http://drive.google.com) account
* [OpenEPaperLink](https://github.com/jjwbruijn/OpenEPaperLink) Access Point
* 2.9" EPaper Tags (no other sizes supported atm)


## Installation
1. Login to Google Drive. Right click in a folder of your choise. Add a new Google Apps Script <br>
    <img width="500" src="https://github.com/leXorNet/Skolmaten/assets/951893/57a1f0e3-eb6a-4df8-bebe-6c04fc1b422f">
    
2. Paste the code from Skolmaten.gs into the newly created script. <br>
   <img width="500" src="https://github.com/leXorNet/Skolmaten/assets/951893/e0310fe2-b18d-4371-b24d-09fa0441673b">

3. Change the top line to the name of your school. Find the correct name by [browsing to the school](https://skolmaten.se) here <br>
   
4. Select Triggers from the left side menu. Add a trigger to run "updateSkolmaten" nightly.
   <img width="500" src="https://github.com/leXorNet/Skolmaten/assets/951893/e8c8d339-20fa-48fe-b66b-61afbb33dc9d">

5. Go back to the code Editor and hit the Run-button to execute the script once. <br>
   Two json files will be created next to your Apps Script on the Drive. <br>
   <img width="290" src="https://github.com/leXorNet/Skolmaten/assets/951893/6a9319f9-ee32-4592-a7cd-c20aa7407677">

6. Right click on each of the json files and set sharing to public. Click "Copy link" before closing the sharing dialog <br>
   <img width="481" src="https://github.com/leXorNet/Skolmaten/assets/951893/2c70a3da-7eb7-4a14-a1d3-8afe102d1224">

7. Get the id part from the copied link and add it to the following format: <br>
    > https://drive.google.com/file/d/[fileid]/view?usp=drive_link

8. In the OpenEPaperLink dashboard. Set your tag content type to "Json template" and paste the reformatted link. <br>
    ![Json template](https://github.com/leXorNet/Skolmaten/assets/951893/43bb2366-ecf0-403a-b854-23c11b19d6af)

9. The current menu should now display on your tag! <br>

    
