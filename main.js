var statusText;
var port;
var connectButton;
var portsSelect;
var baudRateSelect;
var sendButton;
var outputTextArea;
var inputText;
var graph;
var previousPaths;
var lineEndingSelect;
var helperCloseIcon;
var helperContainer;
var helpLink;

function initComponents() {
    statusText = document.getElementById("status");
    sendButton = document.getElementById("send");
    outputTextArea = document.getElementById("output");
    inputText = document.getElementById("input");
    portsSelect = document.getElementById("ports");
    baudRateSelect = document.getElementById("baud-rate");
    connectButton = document.getElementById("connect");
    lineEndingSelect = document.getElementById("line-ending");
    helperContainer = document.getElementById("helper-container");
    helperCloseIcon = document.getElementById("helper-container-close");
    helpLink = document.getElementById("help");
    graph = new Graph(800, 300);
}

function listPorts(ports) {
    portsSelect.innerHTML = "";
    var options = portsSelect.options;
    ports.map(function (p) {
        options[options.length] = new Option(p.path, p.path, false, (port && port.isConnected() && port.getPath() == p));
    });
}

function connect(path, baudRate) {
    if (port && port.isConnected()) {
        port.disconnect();
    } else {
        port = new SerialPort(path, {
            bitrate: parseInt(baudRate),
            ctsFlowControl: true
        });
        port.addEventListener(SerialPort.EVENT.STATE_CHANGE, {notify: notify});
        port.addEventListener(SerialPort.EVENT.STATE_CHANGE, {notify: this.graph.notifyPortStateChange.bind(graph)});
        port.addEventListener(SerialPort.EVENT.DATA_AVAILABLE, graph);
        port.connect();
    }
}

function notify(newState) {
    console.log("notify:", newState)
    statusText.innerHTML = port.stateMessage();
    if (newState == SerialPort.STATE.CONNECTED) {
        connectButton.innerHTML = "Disconnect";
    } else {
        connectButton.innerHTML = "Connect";
    }
}

function getEndingLine() {
    const option = lineEndingSelect.options[lineEndingSelect.selectedIndex].value;
    return {
        "NOTHING": "",
        "NL": "\n",
        "CR": "\r",
        "NL_CR": "\n\r"
    }[option];
}

function send() {
    if (port && port.isConnected()) {
        port.writeString(inputText.value + getEndingLine());
        inputText.value = "";
    }
}

function attachEvents() {
    connectButton.addEventListener("click", function () {
        try {
            var port = portsSelect.options[portsSelect.selectedIndex].value;
            var baudRate = baudRateSelect.options[baudRateSelect.selectedIndex].value;
            connect(port, baudRate);
        } catch (e) {
            statusText.innerHTML = "No port to connect.";
        }
    });
    sendButton.addEventListener("click", function () {
        send();
    });
    inputText.addEventListener("keypress", function (e) {
        if (e.which == 13) {
            send();
        }
    });
    helperCloseIcon.addEventListener("click", function () {
        helperContainer.style.visibility = 'hidden';
    });
    helpLink.addEventListener("click", function () {
        helperContainer.style.visibility = 'visible';
    });
}

function extractPaths(ports) {
    var paths = [];
    ports.map(function (port) {
        paths.push(port.path);
    });
    return paths;
}

window.addEventListener("load", function () {
    if (typeof chrome != "undefined" && chrome.serial) {
        initComponents();
        attachEvents();
        setInterval(function () {
            chrome.serial.getDevices(function (ports) {
                var paths = extractPaths(ports);
                if (port && port.isConnected() && paths.indexOf(port.getPath()) < 0) {
                    port.disconnect();
                }
                if (!Util.areArraysEqual(previousPaths, paths)) {
                    listPorts(ports);
                    previousPaths = paths;
                }
            });
        }, 1000);
    }
}, false);
