# Presentation Bridge
Presentation Bridge was written by Joseph Adams and is distributed under the MIT License.

Copyright 2018 Joseph Adams.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

It is not sold, authorized, or associated with any other company or product.

To contact the author or for more information, please visit [www.techministry.blog](http://www.techministry.blog).

## TO INSTALL THIS SOFTWARE:
1. Download the latest release.

1. Make sure Node.js is installed.

1. In the terminal, from the path you placed the release files, type:
`npm install` then
`node main.js [port]`
where *[port]* is the TCP port you wish to run the server on.
**If you leave this blank, it will attempt to run on port 80, which may need administrative privileges.**

## TO USE THIS SOFTWARE:
1. First, configure ProPresenter to enable the network settings which allows Presentation Bridge to access the data. You can use any port numbers you want, provided they are not already in use.
The port for "Enable Network" is the port *Presentation Bridge* will use.
Make note of this port, as you will need to enter it on the Bridge page in order to connect.

1. Go to the Bridge page on the server running *Presentation Bridge*: http://127.0.0.1/bridge
It runs on Port 80 by default.

1. Enter in the IP address, port, control password, and library path of your ProPresenter machine.
**The library path must be the full absolute path to your ProPresenter library, as accessed from that machine.**
Example: */Users/technician/Documents/ProPresenter6/*

1. Click "Connect to ProPresenter". If you've connected successfully, the interface will begin downloading the ProPresenter data.

1. Select a Bridge from the Bridge Config box. If it requires a password, you will need to enter it.

1. Click "Connect to Bridge" to connect. If a Bridge is already in use, you will receive an error message.

1. Clients can connect by going to your server IP address with these listeners:
    * / - the default "text listener"
    * /lowerthird - the lower third listener with a green background for chroma key
    * /image - the image listener
    * /stagedisplay - the stage display version that shows the current and next slides

1. To add bridges or make changes to existing bridges like adding a logo, changing observe/control passwords, etc., either go to */config* or click the "Settings" icon under the Bridge config section.
The default username is *config* and the default password is *config22*.
