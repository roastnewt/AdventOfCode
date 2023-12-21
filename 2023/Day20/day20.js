const {readFileSync} = require('fs');

let low = 0;
let high = 0;

let queue = [];

let statePeek = new Map();

class tabulation {

    constructor() {
        this.low = 0;
        this.high = 0;
    }

    addLow() {
        this.low++;
    }

    addHigh() {
        this.high++;
    }
}

class pulse {
    constructor(lowHigh, previousLocation) {
        this.stateHeight = lowHigh;
        this.previousLocation = previousLocation;
    }

    getHeight() {
        return this.stateHeight;
    }

    isLow() {
        return this.stateHeight === 'low';
    }

    isHigh() {
        return this.stateHeight === 'high';
    }

    setPreviousLocation(location) {
        this.previousLocation = location;
    }

    getPreviousLocation() {
        return this.previousLocation;
    }

}

class node {
    constructor(name) {
        this.destinations = [];
        this.sources = [];
        this.name = name;
    }

    addDestination(destination) {
        this.destinations.push(destination);
        destination.addSource(this);
    }

    addSource(source) {
        this.sources.push(source);
    }

    receive(receivedPulse) {
        if (receivedPulse.isLow()) {
            low++;
        } else {
            high++;
        }
    }

    getName() {
        return this.name;
    }

}

class button extends node {

    constructor(name) {
        super(name)
    }

    start() {
        this.destinations.forEach((destination) => {
            queue.push(() => destination.receive(new pulse('low', this)));
        });
    }
}

class broadcaster extends node {

    constructor(name) {
        super(name)
    }

    receive(receivedPulse) {
        if (receivedPulse.isLow()) {
            low++;
        } else {
            high++;
        }
        let pulseToSend = new pulse(receivedPulse.isLow() ? 'low' : 'high', this);
        this.destinations.forEach((destination) => {
            queue.push(() => destination.receive(pulseToSend));
        });
    }

}

class flipflop extends node {
    constructor(name) {
        super(name);
        this.stateIsOn = false;
    }

    setOn() {
        this.stateIsOn = true;
    }

    setOff() {
        this.stateIsOn = false;
    }

    isOn() {
        return this.stateIsOn;
    }

    isOff() {
        return !this.stateIsOn;
    }

    receive(receivedPulse) {
        if (receivedPulse.isLow()) {
            low++;
        } else {
            high++;
        }
        if (receivedPulse.isLow()) {
            if (this.isOn()) {
                this.setOff();
                this.destinations.forEach((destination) => {
                    queue.push(() => destination.receive(new pulse('low', this)));
                });
            } else {
                this.setOn();
                this.destinations.forEach((destination) => {
                    queue.push(() => destination.receive(new pulse('high', this)));
                });

            }
        }
        statePeek.set(this.getName(), 'flipflop is ' + (this.isOn() ? 'on' : 'off'));
    }

}

class conjunction extends node {
    constructor(name) {
        super(name);
        this.locationHeightMap = new Map();
    }

    addSource(source) {
        super.addSource(source);
        this.locationHeightMap.set(source, 'low');
    }

    receive(receivedPulse) {
        if (receivedPulse.isLow()) {
            low++;
        } else {
            high++;
        }
        this.locationHeightMap.set(receivedPulse.getPreviousLocation(), receivedPulse.getHeight());
        let hasLow = false;
        this.locationHeightMap.forEach((height) => {
            if (height === 'low') {
                hasLow = true;
            }
        });
        if (!hasLow) {
            this.destinations.forEach((destination) => {
                queue.push(() => destination.receive(new pulse('low', this)));
            });
        } else {
            this.destinations.forEach((destination) => {
                queue.push(() => destination.receive(new pulse('high', this)));
            });
        }

        statePeek.set(this.getName(), 'conjunction hasLow: ' + hasLow);
    }
}

class rx extends node {

    constructor(name) {
        super(name);
        this.lowPulses = 0;
    }

    receive(receivedPulse) {
        if (receivedPulse.isLow()) {
            low++;
        } else {
            high++;
        }
        this.lowPulses++;

        statePeek.set(this.getName(), 'rx lowPulses: ' + this.lowPulses);
    }

    resetLowPulses() {
        this.lowPulses = 0;
    }
}

let problemOne = () => {
    const data = readFileSync('./Day20/input.txt', 'utf-8').split(/\n/);
    let nodes = new Map();
    nodes.set('button', new button('button'));
    for (let line of data) {
        let split = line.split(' -> ');
        let name = split[0];
        if (name.startsWith('broadcaster')) {
            nodes.set('broadcaster', new broadcaster('broadcaster'));
            nodes.get('button').addDestination(nodes.get('broadcaster'));
        } else if (name.startsWith('%')) {
            nodes.set(name.substring(1), new flipflop(name.substring(1)));
        } else if (name.startsWith('&')) {
            nodes.set(name.substring(1), new conjunction(name.substring(1)));
        } else {
            nodes.set(name, new node(name));
        }
    }
    for (let line of data) {
        let split = line.split(' -> ');
        let name = split[0]
        if (name.startsWith('%') || name.startsWith('&')) {
            name = name.substring(1);
        }
        let destinations = split[1].split(', ');
        if (destinations.length === 1 && destinations[0] === '') {
            continue;
        }
        let currentNode = nodes.get(name);
        for (let destination of destinations) {
            let destinationNode = nodes.get(destination);
            if (destinationNode === undefined) {
                destinationNode = new node();
                nodes.set(destination, destinationNode);
            }
            currentNode.addDestination(destinationNode);
        }
    }

    //console.log(nodes);

    for (let i = 0; i < 1000; i++) {
        nodes.get('button').start();
        while (queue.length > 0) {
            queue.shift()();
        }
    }

    return low * high;
}

let problemTwo = () => {
    const data = readFileSync('./Day20/input.txt', 'utf-8').split(/\n/);
    let nodes = new Map();
    nodes.set('button', new button('button'));
    for (let line of data) {
        let split = line.split(' -> ');
        let name = split[0];
        if (name.startsWith('broadcaster')) {
            nodes.set('broadcaster', new broadcaster('broadcaster'));
            nodes.get('button').addDestination(nodes.get('broadcaster'));
        } else if (name.startsWith('%')) {
            nodes.set(name.substring(1), new flipflop(name.substring(1)));
        } else if (name.startsWith('&')) {
            nodes.set(name.substring(1), new conjunction(name.substring(1)));
        } else {
            nodes.set(name, new node());
        }
    }
    for (let line of data) {
        let split = line.split(' -> ');
        let name = split[0]
        if (name.startsWith('%') || name.startsWith('&')) {
            name = name.substring(1);
        }
        let destinations = split[1].split(', ');
        if (destinations.length === 1 && destinations[0] === '') {
            continue;
        }
        let currentNode = nodes.get(name);
        for (let destination of destinations) {
            let destinationNode = nodes.get(destination);
            if (destinationNode === undefined) {
                if (destination === 'rx') {
                    destinationNode = new rx('rx');
                } else {
                    destinationNode = new node(destination);
                }
                nodes.set(destination, destinationNode);
            }
            currentNode.addDestination(destinationNode);
        }
    }

    //console.log(nodes);

    let iteration = 0;
    let rxNode = nodes.get('rx');
    //while (rxNode.lowPulses !== 1) {
    for (let i = 0; i < 100; i++) {
        rxNode.resetLowPulses();
        nodes.get('button').start();
        while (queue.length > 0) {
            queue.shift()();
        }
        iteration++;
        if (iteration % 100000 === 0) {
            console.log('iteration: ', iteration, 'lowPulses: ', rxNode.lowPulses);
        }
        console.log(statePeek);
    }

    return iteration;
}

problemTwo();

module.exports = {problemOne, problemTwo};