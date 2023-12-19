const {readFileSync} = require('fs');

let parseWorkflows = (unparsedWorkflows) => {
    const workflows = [];
    for (let unparsedWorkflow of unparsedWorkflows) {
        const workflow = {};
        const split = unparsedWorkflow.split('{');
        workflow.id = split[0].trim();
        const rules = split[1].split('}')[0].split(',');
        workflow.rules = [];
        for (let rule of rules) {
            if (rule.includes(':')) {
                const ruleSplit = rule.split(':');
                const ruleObj = {};
                ruleObj.condition = ruleSplit[0].trim();
                ruleObj.destination = ruleSplit[1].trim();
                workflow.rules.push(ruleObj);
            } else {
                let ruleObj = {};
                ruleObj.condition = 'true';
                ruleObj.destination = rule;
                workflow.rules.push(ruleObj);
            }
        }
        workflows.push(workflow);
    }
    workflows.push({id: 'A', rules: []});
    workflows.push({id: 'R', rules: []});
    return workflows;
}

let parseParts = (unparsedParts) => {
    const parts = [];
    for (let unparsedPart of unparsedParts) {
        const part = {};
        let trimmed = unparsedPart.replace('{', '').replace('}', '');
        const split = trimmed.split(',');
        for (let value of split) {
            const valueSplit = value.split('=');
            const param = valueSplit[0].trim();
            const val = valueSplit[1].trim();
            part[param] = parseInt(val);
        }
        parts.push(part);
    }
    return parts;
}

const scorePart = (part) => {
    return Object.values(part).reduce((acc, cur) => acc + cur, 0);
}

let problemOne = () => {
    const data = readFileSync('./Day19/input.txt', 'utf-8')
    const halves = data.split(/\n\n/);
    const unparsedWorkflows = halves[0].split(/\n/);
    const unparsedParts = halves[1].split(/\n/);
    const workflows = parseWorkflows(unparsedWorkflows);
    const parts = parseParts(unparsedParts);

    let total = 0;
    const startWorkflow = workflows.find(workflow => workflow.id === 'in');
    for (let part of parts) {
        let currentWorkflow = startWorkflow;
        while (currentWorkflow.id !== 'A' && currentWorkflow.id !== 'R') {
            for (let rule of currentWorkflow.rules) {
                let x = part.x;
                let m = part.m;
                let a = part.a;
                let s = part.s;
                if (eval(rule.condition)) {
                    currentWorkflow = workflows.find(workflow => workflow.id === rule.destination);
                    break;
                }
            }
        }
        if (currentWorkflow.id === 'A') {
            total += scorePart(part);
        }
    }
    return total;
}

let problemTwo = () => {
    const data = readFileSync('./Day19/input.txt', 'utf-8').split(/\n/);
}

module.exports = {problemOne, problemTwo};