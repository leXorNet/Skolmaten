# Skolmaten
Script to fetch the Swedish school meal menu and display it on 2.9" EPaper tags. <br>
<img width="300" src="https://github.com/leXorNet/Skolmaten/assets/951893/f26ffea2-f7c3-4472-b4ab-a560d17ab685">

## Features
The script will fetch the RSS feed of the chosen school and output two formated json files. <br>
One with the menu of today. <br>
One with the menu if tomorrow. Unless tomorrow is a weekend. Then it will show the Monday menu.


## Requirements
* [Google Drive](http://drive.google.com) account
* [OpenEPaperLink](https://github.com/jjwbruijn/OpenEPaperLink) Access Point
* 2.9" EPaper Tags (no other sizes supported atm)


## Installation
1. Login to Google Drive. Right click in a folder of your choise. Add a new Google Apps Script <br>
    <img width="500" src="https://github.com/leXorNet/Skolmaten/assets/951893/57a1f0e3-eb6a-4df8-bebe-6c04fc1b422f">
    
2. Paste the code from Skolmaten.gs into the newly created script. <br>
   <img width="500" src="https://github.com/leXorNet/Skolmaten/assets/951893/e0310fe2-b18d-4371-b24d-09fa0441673b">

3. Set your local school at the top line. Find the name by [browsing to the school](https://skolmaten.se) <br>
   ![Copy school name](https://github.com/leXorNet/Skolmaten/assets/951893/2a9ed5ea-d29d-4c03-80e0-7287da0d3b29)
   
4. Select Triggers from the left side menu. Add a trigger to run "updateSkolmaten" nightly.
   <img width="500" src="https://github.com/leXorNet/Skolmaten/assets/951893/e8c8d339-20fa-48fe-b66b-61afbb33dc9d">

5. Go back to the code Editor and hit the "Run" button to execute the script once. <br>
   Json files will be created next to your Apps Script. <br>
   <img width="290" src="https://github.com/leXorNet/Skolmaten/assets/951893/6a9319f9-ee32-4592-a7cd-c20aa7407677">

6. Right click on the json files and set sharing to public. Click "Copy link" before closing the sharing dialog <br>
   <img width="481" src="https://github.com/leXorNet/Skolmaten/assets/951893/2c70a3da-7eb7-4a14-a1d3-8afe102d1224">

7.  Reformat the copied link with the unique fileid from <br>
    (https://drive.google.com/uc?export=download&id=[fileid]) to <br>
    (https://drive.google.com/file/d/[fileid]/view?usp=drive_link)

8. In the OpenEPaperLink dashboard. Set your tag content type to "Json template" and paste the reformatted link. <br>
    ![Json template](https://github.com/leXorNet/Skolmaten/assets/951893/43bb2366-ecf0-403a-b854-23c11b19d6af)

9. The menu should now display on your tags!
    
