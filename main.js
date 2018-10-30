/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * TO DO:
 * needs to accept a app id and secret key
 * 
 */

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const defaultListenPort = 80;

const fs = require("fs");

const JSONdatafile = "presentationbridge-data.json";

const secretKey = "tryandguessthis";
const ConfigLogin = "config";
var ConfigPassword = "config22";
const ConfigPassword_Default = "config22";

const base64defaultlogo = "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"; // the default logo if one is not specified

var Bridges = [];

var Clients = []; //array of people currently connected

var securedRoutes = require('express').Router();

securedRoutes.use((req, res, next) => {

  // -----------------------------------------------------------------------
  // authentication middleware

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

  // Verify login and password are set and correct
  if (!login || !password || login !== ConfigLogin || password !== ConfigPassword) {
    res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
    res.status(401).send('Authentication required to access this area.'); // custom message
    return;
  }

  // -----------------------------------------------------------------------
  // Access granted...
  next();
});
securedRoutes.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/config.html');
});

app.use('/config', securedRoutes);

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/bridge', function (req, res) {
    res.sendFile(__dirname + '/views/bridge.html');
});

app.get('/stagedisplay', function (req, res) {
    res.sendFile(__dirname + '/views/stagedisplay.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/textlistener.html');
});

app.get('/lowerthird', function (req, res) {
    res.sendFile(__dirname + '/views/lowerthird.html');
});

app.get('/image', function (req, res) {
    res.sendFile(__dirname + '/views/imagelistener.html');
});

app.get('/config', function (req, res) {
    res.sendFile(__dirname + '/views/config.html');
});

app.use(express.static('views/static'));

io.sockets.on("connection", function(socket) {
    // CONFIG SOCKETS //
    
    socket.on("config_bridgeroom_getall", function() {
        io.to("Config").emit("config_bridgerooms", Bridges);
    });
    
    socket.on("config_bridgeroom_add", function (bridgeRoomObj) {
        if (bridgeRoomObj.logo === "")
        {
            bridgeRoomObj.logo = base64defaultlogo;
        }
        Bridges.push(bridgeRoomObj);
        io.to("Config").emit("config_status", "add-success");
        io.to("Config").emit("config_bridgerooms", Bridges);
        io.to("BridgeRooms").emit("bridgerooms", Bridges);
        saveFile();
    });
    
    socket.on("config_bridgeroom_update", function (bridgeRoomObj) {
        let index = null;
        for (let i = 0; i < Bridges.length; i++)
        {
            if (Bridges[i].id === bridgeRoomObj.id)
            {
                index = i;
                break;
            }
        }
        if (index !== null)
        {
            Bridges.splice(index, 1);
            Bridges.push(bridgeRoomObj);
            io.to("Config").emit("config_status", "update-success");
            io.to("BridgeRooms").emit("bridgerooms", Bridges);
            saveFile();
        }
        else
        {
            io.to("Config").emit("config_status", "update-failure");
        }
    });
    
    socket.on("config_bridgeroom_delete", function (bridgeRoomObj) {
        let index = null;
        for (let i = 0; i < Bridges.length; i++)
        {
            if (Bridges[i].id === bridgeRoomObj.id)
            {
                index = i;
                break;
            }
        }
        if (index !== null)
        {
            Bridges.splice(index, 1);
            io.to("Config").emit("config_status", "delete-success");
            io.to("BridgeRooms").emit("bridgerooms", Bridges);
            saveFile();
        }
        else
        {
            io.to("Config").emit("config_status", "delete-failure");
        }
    });
    
    socket.on("config_changepassword", function(oldPassword, newPassword) {
        if (oldPassword === ConfigPassword)
        {
            ConfigPassword = newPassword;
            saveFile();
            socket.emit("config_status", "changepassword-success");
        }
        else
        {
            socket.emit("config_status", "changepassword-failure");
        }
    });
    
    // BRIDGE ROOM SOCKETS
    
    // Return all bridges in the array
    socket.on("bridgerooms_getall", function () {
        let bridgeArray = GetCleanBridgeArray();
       socket.emit("bridgerooms", bridgeArray); 
    });
    
    socket.on("bridgerooms_authenticate", function(bridgeID, password) {
        if (GetBridgeInUse(bridgeID))
        {
            socket.emit("bridgerooms_inuse", true);
            console.log("The selected bridge is already in use.");
        }
        else
        {
            let controlPassword = null;
            for (let i = 0; i < Bridges.length; i++)
            {
                if (Bridges[i].id === bridgeID)
                {
                    controlPassword = Bridges[i].controlPassword;
                    break;
                }
            }

            if (password === controlPassword)
            {
                socket.join("BridgeRooms"); // the room with all of the authenticated bridges in it
                socket.join("BridgeRoom-" + bridgeID); //this specific room that listener clients will receive data from
                socket.emit("bridgerooms_authenticated", true);
                socket.emit("bridgerooms_selectedbridge", bridgeID);
                console.log("Bridge Client Connected and joined room: " + "BridgeRoom-" + bridgeID + ".");
                AddClient(socket, bridgeID, "Bridge");
                SetBridgeInUse(bridgeID, true);
                SetLogoMode(bridgeID, true);
            }
            else
            {
                socket.emit("bridgerooms_authenticated", false);
                console.log("Bridge Client supplied incorrect password.");
            }
        }
    });
    
    socket.on("bridgerooms_disconnect", function(bridgeID) {
       SetBridgeInUse(bridgeID, false);
       SetLogoMode(bridgeID, true);
    });
    
    // LISTENER SOCKETS
    
    socket.on("textlistener_joinbridgeroom", function(bridgeID, password) {
        for (let i = 0; i < Bridges.length; i++)
        {
            if (Bridges[i].id === bridgeID)
            {
                if (Bridges[i].observePassword === password)
                {
                   socket.join("TextListener-" + bridgeID);
                   socket.emit("status", "success");
                   socket.emit("gotologo", GetLogoMode(bridgeID));
                   socket.emit("bridgeinuse", GetBridgeInUse(bridgeID));
                   AddClient(socket, bridgeID, "TextListener");
                }
                else
                {
                    socket.emit("status", "failure");
                }
                break;
            }
        }
    });
    
    socket.on("listener_get_current_slide", function(bridgeID) {
       for (let i = 0; i < Bridges.length; i++)
       {
           if (Bridges[i].id === bridgeID)
           {
               socket.emit("current_slide", Bridges[i]["current_slide"]);
               break;
           }
       }
    });
    
    socket.on("listener_get_current_slide_notes", function(bridgeID) {
       for (let i = 0; i < Bridges.length; i++)
       {
           if (Bridges[i].id === bridgeID)
           {
               socket.emit("current_slide_notes", Bridges[i]["current_slide_notes"]);
               break;
           }
       }
    });
    
    socket.on("listener_get_next_slide", function(bridgeID) {
       for (let i = 0; i < Bridges.length; i++)
       {
           if (Bridges[i].id === bridgeID)
           {
               socket.emit("next_slide", Bridges[i]["next_slide"]);
               break;
           }
       }
    });
    
    socket.on("listener_get_next_slide_notes", function(bridgeID) {
       for (let i = 0; i < Bridges.length; i++)
       {
           if (Bridges[i].id === bridgeID)
           {
               socket.emit("next_slide_notes", Bridges[i]["next_slide_notes"]);
               break;
           }
       }
    });
    
    socket.on("listener_get_current_slide_image", function(bridgeID) {
       for (let i = 0; i < Bridges.length; i++)
       {
           if (Bridges[i].id === bridgeID)
           {
               socket.emit("current_slide_image", Bridges[i]["current_slide_image"]);
               break;
           }
       }
    });
    
    socket.on("listener_get_next_slide_image", function(bridgeID) {
       for (let i = 0; i < Bridges.length; i++)
       {
           if (Bridges[i].id === bridgeID)
           {
               socket.emit("next_slide_image", Bridges[i]["next_slide_image"]);
               break;
           }
       }
    });
    
    socket.on("imagelistener_joinbridgeroom", function(bridgeID, password) {   
        for (let i = 0; i < Bridges.length; i++)
        {
            if (Bridges[i].id === bridgeID)
            {
                if (Bridges[i].observePassword === password)
                {
                   socket.join("ImageListener-" + bridgeID);
                   socket.emit("status", "success");
                   socket.emit("gotologo", GetLogoMode(bridgeID));
                   socket.emit("bridgeinuse", GetBridgeInUse(bridgeID));
                   AddClient(socket, bridgeID, "ImageListener");
                }
                else
                {
                    socket.emit("status", "failure");
                }
                break;
            }
        }
    });
    
    socket.on("stagedisplaylistener_getbridges", function () {
       socket.emit("bridgerooms", GetStageDisplayBridges()); 
    });
    
    socket.on("stagedisplaylistener_joinbridgeroom", function(bridgeID, password) {
        for (let i = 0; i < Bridges.length; i++)
        {
            if (Bridges[i].id === bridgeID)
            {
                if (Bridges[i].observePassword === password)
                {
                   socket.join("StageDisplayListener-" + bridgeID);
                   socket.emit("status", "success");
                   socket.emit("gotologo", GetLogoMode(bridgeID));
                   socket.emit("bridgeinuse", GetBridgeInUse(bridgeID));
                   AddClient(socket, bridgeID, "StageDisplay");
                }
                else
                {
                    socket.emit("status", "failure");
                }
                break;
            }
        }
    });
    
    //OTHER SOCKETS
    
    socket.on("room", function(room) {       
        switch(room)
        {
            case "TextListeners":
                socket.join(room);
                socket.emit("bridgerooms", GetTextBridges());
                break;
            case "ImageListeners":
                socket.join(room);
                socket.emit("bridgerooms", GetImageBridges());
                break;
            case "StageDisplays":
                socket.emit("bridgerooms", GetStageDisplayBridges());
                socket.join(room);
            case "BridgeRooms":
                socket.join(room);
                break;
            case "Config":
                socket.join(room);
                if (ConfigPassword === ConfigPassword_Default)
                {
                    socket.emit("config_passwordisdefault", true);
                }
            default:
                break;
        }
    });
       
    socket.on("announcement", function(bridgeID, text) {
       updateBridgeText(bridgeID, "announcement", text);
       updateBridgeImage(bridgeID, "announcement", text);
       console.log("sending announcement to: " + bridgeID, text);
    });
    
    socket.on("redirect", function(bridgeID, url) {
       updateBridgeText(bridgeID, "redirect", url);
       updateBridgeImage(bridgeID, "redirect", url);
       console.log("redirecting to: ", url);
    });
    
    socket.on("gotologo", function (bridgeID, value) {
        SetLogoMode(bridgeID, value);
       updateBridgeText(bridgeID, "gotologo", value);
       updateBridgeImage(bridgeID, "gotologo", value);
       console.log("Going to logo: " + value);
    });
    
    socket.on("keepawake", function (bridgeID, value) {
       updateBridgeText(bridgeID, "keepawake", value);
       updateBridgeImage(bridgeID, "keepawake", value);
       console.log("Keep Awake: " + value);
    });
    
    socket.on("reload", function(bridgeID, value) {
       updateBridgeText(bridgeID, "reload", value);
       updateBridgeImage(bridgeID, "reload", value);
       console.log("reloading page: ", value);
    });
    
    socket.on("current_slide", function(bridgeID, text) {
       updateBridgeText(bridgeID, "current_slide", text);
    });
    
    socket.on("current_slide_notes", function(bridgeID, text) {
       updateBridgeText(bridgeID, "current_slide_notes", text);
    });
    
    socket.on("next_slide", function(bridgeID, text) {
        updateBridgeText(bridgeID, "next_slide", text);
    });
    
    socket.on("next_slide_notes", function(bridgeID, text) {
       updateBridgeText(bridgeID, "next_slide_notes", text);
    });
    
    socket.on("current_slide_image", function(bridgeID, imgData) {
        updateBridgeImage(bridgeID, "current_slide_image", imgData);
    });
    
    socket.on("disconnect", function(){
        RemoveClient(socket);
        
        io.to("Bridge").emit("client_disconnected", Clients);
    });
});

function SetBridgeInUse(bridgeID, value)
{
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].id === bridgeID)
        {
            Bridges[i].inUse = value;
            console.log("Updating listeners with bridge status: " + value);
            io.to("TextListener-" + bridgeID).emit("bridgeinuse", value);
            io.to("ImageListener-" + bridgeID).emit("bridgeinuse", value);
            io.to("StageDisplayListener-" + bridgeID).emit("bridgeinuse", value);
            break;
        }
    }
}

function GetBridgeInUse(bridgeID)
{
    let bridgeObj = Bridges.find(function (obj) { return obj.id.toString() === bridgeID; });
    
    return bridgeObj.inUse;
}

function AddClient(socket, bridgeID, type)
{
    let clientObj = {};
    console.log("*** NEW CLIENT ***");
    
    clientObj.socketID = socket.id; //first position is always the socket ID
    clientObj.bridgeID = bridgeID;
    clientObj.issued = socket.handshake.issued;
    clientObj.address = socket.handshake.address;
    
    clientObj.roomType = type;
    
    Clients.push(clientObj);
    console.log(clientObj);
    io.to("BridgeRoom-" + bridgeID).emit("client_connected", clientObj);
}

function RemoveClient(socket)
{
    console.log("Removing a Client.");
    //console.log(socket);
    
    let socketID = socket.id;
    let index = null;
    
    let bridgeID = null;
    
    for (let i = 0; i < Clients.length; i++)
    {
        if (Clients[i].socketID === socketID)
        {
            index = i;
            bridgeID = Clients[i].bridgeID;
            
            console.log("Room Type: " + Clients[i].roomType);
            
            if (Clients[i].roomType === "Bridge")
            {
                SetBridgeInUse(bridgeID, false);
            }
            
            break;
        }
    }
    
    if (index !== null)
    {
        Clients.splice(index, 1);
        console.log("*** CLIENT DISCONNECTED ***");
        io.to("BridgeRoom-" + bridgeID).emit("client_disconnected", socketID);
    }
}

function SetLogoMode(bridgeID, value)
{
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].id === bridgeID)
        {
            Bridges[i].logoMode = value;
            break;
        }
    }
}

function GetLogoMode(bridgeID)
{
    let logoMode = false;
    
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].id === bridgeID)
        {
            //console.log("Bridge Info:", Bridges[i]);
            logoMode = Bridges[i].logoMode;
            break;
        }
    }
    
    console.log("Logo mode is: " + logoMode);
    return logoMode;
}

function updateBridgeText(bridgeID, mode, text) //sends the latest text data to the connected clients
{
    io.to("TextListener-" + bridgeID).emit(mode, text);
    io.to("StageDisplayListener-" + bridgeID).emit(mode, text);
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].id === bridgeID)
        {
            Bridges[i][mode] = text;
            //console.log(Bridges[i]);
            break;
        }
    }
}

function updateBridgeImage(bridgeID, mode, imgData) //sends the latest image data to the connected clients
{
    io.to("ImageListener-" + bridgeID).emit(mode, imgData);
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].id === bridgeID)
        {
            Bridges[i][mode] = imgData;
            break;
        }
    }
}

function loadFile() //loads settings on first load of app
{   
    try
    {
        let rawdata = fs.readFileSync(JSONdatafile); 
        let myJson = JSON.parse(rawdata); 

        Bridges = myJson.Bridges;
        ConfigPassword = myJson.ConfigPassword;
    }
    catch (error)
    {
        
    }
}

function saveFile() //saves settings to a local storage file for later recalling
{
    var myJson = {
        ConfigPassword: ConfigPassword,
        Bridges: Bridges
    };

    fs.writeFileSync(JSONdatafile, JSON.stringify(myJson), "utf8", function(error) {
        if (error)
        { 
          console.log('error: ' + error);
        }
        else
        {
          console.log('file saved');
        }
    });
}

function GetBridge(bridgeID)
{
    let bridgeObj = null;
    
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].id === bridgeID)
        {
            bridgeObj = Bridges[i];
        }
    }
    
    return bridgeObj;
}

function GetCleanBridgeArray() // builds an array of current Bridges but only with the ID and Name, so no passwords are sent unncessarily
{
    let bridgeArray = [];
    
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].enabled)
        {
            let bridgeObj = {};
            bridgeObj.id = Bridges[i].id;
            bridgeObj.name = Bridges[i].name;
            bridgeObj.logo = Bridges[i].logo;
            if (Bridges[i].controlPassword !== "")
            {
                bridgeObj.requiresPassword = true;
            }
            else
            {
                bridgeObj.requiresPassword = false;
            }
            bridgeArray.push(bridgeObj);
        }
    }
    
    return bridgeArray;
}

function GetTextBridges() // builds an array of bridges that are allowed to have Text listeners
{
    let bridgeArray = [];
    
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].allowText)
        {
            let bridgeObj = {};
            bridgeObj.id = Bridges[i].id;
            bridgeObj.name = Bridges[i].name;
            bridgeObj.logo = Bridges[i].logo;
            bridgeObj.logoMode = Bridges[i].logoMode;
            bridgeObj.foregroundColor = Bridges[i].foregroundColor;
            bridgeObj.backgroundColor = Bridges[i].backgroundColor;
            bridgeObj.font = Bridges[i].font;
            if (Bridges[i].observePassword !== "")
            {
                bridgeObj.requiresPassword = true;
            }
            else
            {
                bridgeObj.requiresPassword = false;
            }
            bridgeArray.push(bridgeObj);
        }
    }
    
    return bridgeArray;
}

function GetImageBridges() // builds an array of bridges that are allowed to have Image listeners
{
    let bridgeArray = [];
    
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].allowImage)
        {
            let bridgeObj = {};
            bridgeObj.id = Bridges[i].id;
            bridgeObj.name = Bridges[i].name;
            bridgeObj.logo = Bridges[i].logo;
            bridgeObj.logoMode = Bridges[i].logoMode;
            if (Bridges[i].observePassword !== "")
            {
                bridgeObj.requiresPassword = true;
            }
            else
            {
                bridgeObj.requiresPassword = false;
            }
            bridgeArray.push(bridgeObj);
        }
    }
    
    return bridgeArray;
}

function GetStageDisplayBridges() // builds an array of bridges that are allowed to have Stage Display listeners
{
    let bridgeArray = [];
    
    for (let i = 0; i < Bridges.length; i++)
    {
        if (Bridges[i].allowStageDisplay)
        {
            let bridgeObj = {};
            bridgeObj.id = Bridges[i].id;
            bridgeObj.name = Bridges[i].name;
            bridgeObj.logo = Bridges[i].logo;
            if (Bridges[i].observePassword !== "")
            {
                bridgeObj.requiresPassword = true;
            }
            else
            {
                bridgeObj.requiresPassword = false;
            }
            bridgeArray.push(bridgeObj);
        }
    }
    
    return bridgeArray;
}

let listenPort = defaultListenPort;

let cli_listenPort = process.argv[2];

if (parseInt(cli_listenPort) !== 'NaN')
{
    intPort = parseInt(cli_listenPort);
    
    if ((intPort > 1024) && (intPort <= 65535))
    {
        listenPort = intPort;
    }
}

http.listen(listenPort, function () {
    console.log("listening on *:" + listenPort);
});

loadFile();