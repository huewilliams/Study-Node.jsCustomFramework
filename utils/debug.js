const colors = [
    {name: 'cyan',     value: '\x1b[36m'},
    {name: 'yellow',   value: '\x1b[33m'},
    {name: 'red',      value: '\x1b[31m'},
    {name: 'green',    value: '\x1b[32m'},
    {name: 'magenta',  value: '\x1b[35m'},
  ]
  const resetColor = '\x1b[0m'

const debug = (tag, color) => {
    if(!tag) throw Error('tag should be required.');
    if(color==null || color==undefined || !(typeof color==='number') || color < 0 || color > colors.length-1) throw Error('color has wrong value.');

    return msg => {
        const logString = `${colors[color].value} [${tag}] ${resetColor} ${msg}`;
        console.log(logString);
        return logString;
    }
}

module.exports = debug;