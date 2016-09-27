//     mp3-parser test suite: ID3v2 IPLS frame.

//     https://github.com/biril/mp3-parser
//     Licensed and freely distributed under the MIT License
//     Copyright (c) 2013-2016 Alex Lambiris

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

/*jshint node:true */
/*global describe, it, expect  */
"use strict";

const _ = require('underscore');

// Use lib's `seqFromString` as a helper. Assume that it's tested and reliable
const wordSeqFromStr = require(`${__dirname}/../../lib/lib.js`).wordSeqFromStr;

//
const buildFrameBytes = () => {
    return _.flatten(_.map(arguments, arg => {
        return _.isString(arg) ? wordSeqFromStr(arg) : arg;
    }));
};

// Make-believe offset of frame bytes, within containing ID3v2 tag
const frmOffset = 7;

describe("ID3v2.3 parser", () => {

    const id3v2Parser = require(`${__dirname}/../../lib/id3v2.js`);

    it("should read IPLS frame content: 0first0second0", () => {
        const frmBytes = buildFrameBytes(0, "first", 0, "second", 0);
        const tagBytes = new ArrayBuffer(frmOffset + frmBytes.length);
        const tagView = new DataView(tagBytes);
        for (let i = frmBytes.length - 1; i >= 0; --i) {
            tagView.setUint8(frmOffset + i, frmBytes[i]);
        }

        const frmContent = id3v2Parser.readFrameContent.IPLS(tagView, frmOffset, frmBytes.length);

        expect(frmContent.encoding).toBe(0);
        expect(frmContent.values[0]).toBe("first");
        expect(frmContent.values[1]).toBe("second");
    });

    it("should read IPLS frame content: 0first0second0third0", () => {
        const frmBytes = buildFrameBytes(0, "first", 0, "second", 0, "third", 0);
        const tagBytes = new ArrayBuffer(frmOffset + frmBytes.length);
        const tagView = new DataView(tagBytes);
        for (let i = frmBytes.length - 1; i >= 0; --i) {
            tagView.setUint8(frmOffset + i, frmBytes[i]);
        }

        const frmContent = id3v2Parser.readFrameContent.IPLS(tagView, frmOffset, frmBytes.length);

        expect(frmContent.encoding).toBe(0);
        expect(frmContent.values[0]).toBe("first");
        expect(frmContent.values[1]).toBe("second");
        expect(frmContent.values[2]).toBe("third");
    });

});
