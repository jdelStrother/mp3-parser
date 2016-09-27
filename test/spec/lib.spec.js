//     mp3-parser test suite: ID3v2 IPLS frame.

//     https://github.com/biril/mp3-parser
//     Licensed and freely distributed under the MIT License
//     Copyright (c) 2013-2016 Alex Lambiris

/*jshint node:true */
/*global describe, it, expect  */
"use strict";

// Read the content of a
//  [involved people list frame](http://id3.org/id3v2.3.0#Involved_people_list). Contains
//  names of those involved - those contributing to the audio file - and how they were
//  involved. The body simply contains a terminated string with the involvement directly
//  followed by a terminated string with the involvee followed by a new involvement and so
//  on. In the current implementation however, the frame's content is parsed as a
//  collection of strings without attaching special meaning.There may only be one "IPLS"
//  frame in each tag
//
// * Encoding:            a single octet where 0 = ISO-8859-1, 1 = UCS-2
// * People list strings: a series of strings, e.g. string 00 (00) string 00 (00) ...

//
const ensureBeWords = words => {

};

describe("Lib", () => {

    const lib = require(`${__dirname}/../../lib/lib.js`);

    // For ASCII - ISO/IEC 8859-1, see [ASCII code table](http://www.asciitable.com/)
    // For UCS-2 - ISO/IEC 10646-1, see [UCS-2 code table](http://www.columbia.edu/kermit/ucs2.html)
    describe("wordSeqFromStr", () => {

        it("should convert empty string to empty array", () => {
            const seq = lib.wordSeqFromStr("");
            expect(seq).toBeEmptyArray();
        });

        it("should convert given ISO/IEC 8859-1 string to array of char codes", () => {
            const str = "This is a test.";
            const strOctets = [
                84, 104, 105, 115, 32,  // This_
                105, 115, 32,           // is_
                97, 32,                 // a_
                116, 101, 115, 116, 46  // test.
            ];

            const seq = lib.wordSeqFromStr(str);

            expect(seq).toEqual(strOctets);
        });

        it("should convert given ISO/IEC 10646-1, UCS-2 string to array of char codes", () => {
            const str = "Αυτό είναι ένα test.";
            const strOctets = [
                913, 965, 964, 972, 32,         // Αυτό_
                949, 943, 957, 945, 953, 32,    // είναι_
                941, 957, 945, 32,              // ένα_
                116, 101, 115, 116, 46          // test.
            ];

            const seq = lib.wordSeqFromStr(str);

            expect(seq).toEqual(strOctets);
        });

    });

});
