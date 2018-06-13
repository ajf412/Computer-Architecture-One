const RAM = require('./ram');
const CPU = require('./cpu');
const fs = require('fs');
const argv = process.argv.slice(2);
console.log(argv);

if(argv.length != 1) {
    console.error("usage: filename capacity");
    process.exit(1);
}


/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory() {
    const filename = argv[0];
    const filedata = fs.readFileSync(filename, "utf8");
    const lines = filedata.trim().split(/[\r\n]+/g);
    const program = [];

    for (let l of lines) {
        program.push(l.slice(0,8));
    }
    program.shift();

    // Hardcoded program to print the number 8 on the console
    // const program = [ // print8.ls8
    //     "10011001", // LDI R0,8  Store 8 into R0
    //     "00000000",
    //     "00001000",
    //     "01000011", // PRN R0    Print the value in R0
    //     "00000000",
    //     "00000001"  // HLT       Halt and quit
    // ];

    // const program = [
    //     "10011001", // # LDI R0,8
    //     "00000000",
    //     "00001000",
    //     "10011001", // # LDI R1,9
    //     "00000001",
    //     "00001001",
    //     "10101010", // # MUL R0,R1 <---
    //     "00000000",
    //     "00000001",
    //     "01000011", // # PRN R0
    //     "00000000",
    //     "00000001", // # HLT
    // ];

    // Load the program into the CPU's memory a byte at a time
    for (let i = 0; i < program.length; i++) {
        cpu.poke(i, parseInt(program[i], 2));
    }
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

// TODO: get name of ls8 file to load from command line

loadMemory(cpu);

cpu.startClock();