import{a as wt}from"./chunk-QYIHRLUQ.js";import{a as Ke}from"./chunk-A3ZOKTFZ.js";import"./chunk-SMG5ZC75.js";import{a as Ye}from"./chunk-COUM3LGZ.js";import{a as le,b as re}from"./chunk-SGODBNM5.js";import{a as pt}from"./chunk-3OCKPMP6.js";import"./chunk-ZTHD6AQG.js";import{d as We}from"./chunk-C23LOILP.js";import{a as qe}from"./chunk-JOGCQKMX.js";import"./chunk-VAALEWS4.js";import{d as Qe}from"./chunk-64YE6OBK.js";import{a as qt,b as ft}from"./chunk-W64K2UZI.js";import{a as _t,b as xt}from"./chunk-5UBKVZEY.js";import{a as vt,b as ht}from"./chunk-CFCALAPL.js";import{h as at,i as st,m as ne,n as ie}from"./chunk-WKZIQLW4.js";import{b as rt}from"./chunk-TDNGZOO2.js";import"./chunk-ACYWLC2Q.js";import{a as mt,b as ut}from"./chunk-QFJV3VWO.js";import"./chunk-L2L5HC3Z.js";import"./chunk-4C64AC4M.js";import{a as bt,b as gt}from"./chunk-OI2GQC7S.js";import"./chunk-YKS4DW4N.js";import"./chunk-LE63M7P6.js";import{h as dt,i as ct,j as oe}from"./chunk-WU273RRS.js";import"./chunk-YTRLQP2V.js";import"./chunk-DAT7535L.js";import{A as te,a as et,c as tt,f as nt,g as X,h as Z,j as it,k as ee,v as ot,y as lt}from"./chunk-E4NSF3MG.js";import{da as be,ha as ge,ja as $e,la as Ge,ma as K,sa as Je,ua as Xe,v as Y,wa as F,xa as Ze}from"./chunk-S7OGXEH6.js";import{$ as q,$a as O,$b as Ne,Db as Ie,E as V,Eb as w,Gb as f,Hb as u,Ia as U,Ib as ze,Ja as E,Jb as Ve,K as _e,Kb as De,Mb as Q,Na as o,Nb as $,P as xe,Q as we,R as ye,Rb as G,Sa as Ee,T as ke,Tb as k,Ub as B,V as x,Vb as N,Vc as Fe,Wb as s,Wc as Ae,Xb as _,Xc as je,Yb as y,Yc as W,Zb as Be,Zc as Re,_ as g,ab as Oe,db as Se,dd as Ue,ea as Ce,eb as Te,fb as D,ga as M,gc as J,gd as He,hc as S,i as ve,ka as b,la as ce,lb as H,ma as Me,n as he,oa as Pe,ob as v,pb as h,pc as T,rc as I,sb as pe,sc as Le,tb as me,ub as d,vb as n,wb as r,wc as C,xb as m,yc as ue,zc as L}from"./chunk-DHISXM3L.js";import{a as P,b as de}from"./chunk-DAQOROHW.js";var yt=`
    /*!
* Quill Editor v1.3.3
* https://quilljs.com/
* Copyright (c) 2014, Jason Chen
* Copyright (c) 2013, salesforce.com
*/
    .ql-container {
        box-sizing: border-box;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        height: 100%;
        margin: 0;
        position: relative;
    }
    .ql-container.ql-disabled .ql-tooltip {
        visibility: hidden;
    }
    .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
        pointer-events: none;
    }
    .ql-clipboard {
        inset-inline-start: -100000px;
        height: 1px;
        overflow-y: hidden;
        position: absolute;
        top: 50%;
    }
    .ql-clipboard p {
        margin: 0;
        padding: 0;
    }
    .ql-editor {
        box-sizing: border-box;
        line-height: 1.42;
        height: 100%;
        outline: none;
        overflow-y: auto;
        padding: 12px 15px;
        tab-size: 4;
        -moz-tab-size: 4;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .ql-editor > * {
        cursor: text;
    }
    .ql-editor p,
    .ql-editor ol,
    .ql-editor ul,
    .ql-editor pre,
    .ql-editor blockquote,
    .ql-editor h1,
    .ql-editor h2,
    .ql-editor h3,
    .ql-editor h4,
    .ql-editor h5,
    .ql-editor h6 {
        margin: 0;
        padding: 0;
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol,
    .ql-editor ul {
        padding-inline-start: 1.5rem;
    }
    .ql-editor ol > li,
    .ql-editor ul > li {
        list-style-type: none;
    }
    .ql-editor ul > li::before {
        content: '\\2022';
    }
    .ql-editor ul[data-checked='true'],
    .ql-editor ul[data-checked='false'] {
        pointer-events: none;
    }
    .ql-editor ul[data-checked='true'] > li *,
    .ql-editor ul[data-checked='false'] > li * {
        pointer-events: all;
    }
    .ql-editor ul[data-checked='true'] > li::before,
    .ql-editor ul[data-checked='false'] > li::before {
        color: #777;
        cursor: pointer;
        pointer-events: all;
    }
    .ql-editor ul[data-checked='true'] > li::before {
        content: '\\2611';
    }
    .ql-editor ul[data-checked='false'] > li::before {
        content: '\\2610';
    }
    .ql-editor li::before {
        display: inline-block;
        white-space: nowrap;
        width: 1.2rem;
    }
    .ql-editor li:not(.ql-direction-rtl)::before {
        margin-inline-start: -1.5rem;
        margin-inline-end: 0.3rem;
        text-align: right;
    }
    .ql-editor li.ql-direction-rtl::before {
        margin-inline-start: 0.3rem;
        margin-inline-end: -1.5rem;
    }
    .ql-editor ol li:not(.ql-direction-rtl),
    .ql-editor ul li:not(.ql-direction-rtl) {
        padding-inline-start: 1.5rem;
    }
    .ql-editor ol li.ql-direction-rtl,
    .ql-editor ul li.ql-direction-rtl {
        padding-inline-end: 1.5rem;
    }
    .ql-editor ol li {
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
        counter-increment: list-0;
    }
    .ql-editor ol li:before {
        content: counter(list-0, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-1 {
        counter-increment: list-1;
    }
    .ql-editor ol li.ql-indent-1:before {
        content: counter(list-1, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-1 {
        counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-2 {
        counter-increment: list-2;
    }
    .ql-editor ol li.ql-indent-2:before {
        content: counter(list-2, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-2 {
        counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-3 {
        counter-increment: list-3;
    }
    .ql-editor ol li.ql-indent-3:before {
        content: counter(list-3, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-3 {
        counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-4 {
        counter-increment: list-4;
    }
    .ql-editor ol li.ql-indent-4:before {
        content: counter(list-4, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-4 {
        counter-reset: list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-5 {
        counter-increment: list-5;
    }
    .ql-editor ol li.ql-indent-5:before {
        content: counter(list-5, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-5 {
        counter-reset: list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-6 {
        counter-increment: list-6;
    }
    .ql-editor ol li.ql-indent-6:before {
        content: counter(list-6, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-6 {
        counter-reset: list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-7 {
        counter-increment: list-7;
    }
    .ql-editor ol li.ql-indent-7:before {
        content: counter(list-7, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-7 {
        counter-reset: list-8 list-9;
    }
    .ql-editor ol li.ql-indent-8 {
        counter-increment: list-8;
    }
    .ql-editor ol li.ql-indent-8:before {
        content: counter(list-8, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-8 {
        counter-reset: list-9;
    }
    .ql-editor ol li.ql-indent-9 {
        counter-increment: list-9;
    }
    .ql-editor ol li.ql-indent-9:before {
        content: counter(list-9, decimal) '. ';
    }
    .ql-editor .ql-video {
        display: block;
        max-width: 100%;
    }
    .ql-editor .ql-video.ql-align-center {
        margin: 0 auto;
    }
    .ql-editor .ql-video.ql-align-right {
        margin: 0 0 0 auto;
    }
    .ql-editor .ql-bg-black {
        background: #000;
    }
    .ql-editor .ql-bg-red {
        background: #e60000;
    }
    .ql-editor .ql-bg-orange {
        background: #f90;
    }
    .ql-editor .ql-bg-yellow {
        background: #ff0;
    }
    .ql-editor .ql-bg-green {
        background: #008a00;
    }
    .ql-editor .ql-bg-blue {
        background: #06c;
    }
    .ql-editor .ql-bg-purple {
        background: #93f;
    }
    .ql-editor .ql-color-white {
        color: #fff;
    }
    .ql-editor .ql-color-red {
        color: #e60000;
    }
    .ql-editor .ql-color-orange {
        color: #f90;
    }
    .ql-editor .ql-color-yellow {
        color: #ff0;
    }
    .ql-editor .ql-color-green {
        color: #008a00;
    }
    .ql-editor .ql-color-blue {
        color: #06c;
    }
    .ql-editor .ql-color-purple {
        color: #93f;
    }
    .ql-editor .ql-font-serif {
        font-family:
            Georgia,
            Times New Roman,
            serif;
    }
    .ql-editor .ql-font-monospace {
        font-family:
            Monaco,
            Courier New,
            monospace;
    }
    .ql-editor .ql-size-small {
        font-size: 0.75rem;
    }
    .ql-editor .ql-size-large {
        font-size: 1.5rem;
    }
    .ql-editor .ql-size-huge {
        font-size: 2.5rem;
    }
    .ql-editor .ql-direction-rtl {
        direction: rtl;
        text-align: inherit;
    }
    .ql-editor .ql-align-center {
        text-align: center;
    }
    .ql-editor .ql-align-justify {
        text-align: justify;
    }
    .ql-editor .ql-align-right {
        text-align: right;
    }
    .ql-editor.ql-blank::before {
        color: dt('form.field.placeholder.color');
        content: attr(data-placeholder);
        font-style: italic;
        inset-inline-start: 15px;
        pointer-events: none;
        position: absolute;
        inset-inline-end: 15px;
    }
    .ql-snow.ql-toolbar:after,
    .ql-snow .ql-toolbar:after {
        clear: both;
        content: '';
        display: table;
    }
    .ql-snow.ql-toolbar button,
    .ql-snow .ql-toolbar button {
        background: none;
        border: none;
        cursor: pointer;
        display: inline-block;
        float: left;
        height: 24px;
        padding-block: 3px;
        padding-inline: 5px;
        width: 28px;
    }
    .ql-snow.ql-toolbar button svg,
    .ql-snow .ql-toolbar button svg {
        float: left;
        height: 100%;
    }
    .ql-snow.ql-toolbar button:active:hover,
    .ql-snow .ql-toolbar button:active:hover {
        outline: none;
    }
    .ql-snow.ql-toolbar input.ql-image[type='file'],
    .ql-snow .ql-toolbar input.ql-image[type='file'] {
        display: none;
    }
    .ql-snow.ql-toolbar button:hover,
    .ql-snow .ql-toolbar button:hover,
    .ql-snow.ql-toolbar button:focus,
    .ql-snow .ql-toolbar button:focus,
    .ql-snow.ql-toolbar button.ql-active,
    .ql-snow .ql-toolbar button.ql-active,
    .ql-snow.ql-toolbar .ql-picker-label:hover,
    .ql-snow .ql-toolbar .ql-picker-label:hover,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active,
    .ql-snow.ql-toolbar .ql-picker-item:hover,
    .ql-snow .ql-toolbar .ql-picker-item:hover,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
        color: #06c;
    }
    .ql-snow.ql-toolbar button:hover .ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
        fill: #06c;
    }
    .ql-snow.ql-toolbar button:hover .ql-stroke,
    .ql-snow .ql-toolbar button:hover .ql-stroke,
    .ql-snow.ql-toolbar button:focus .ql-stroke,
    .ql-snow .ql-toolbar button:focus .ql-stroke,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
        stroke: #06c;
    }
    @media (pointer: coarse) {
        .ql-snow.ql-toolbar button:hover:not(.ql-active),
        .ql-snow .ql-toolbar button:hover:not(.ql-active) {
            color: #444;
        }
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
            fill: #444;
        }
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
            stroke: #444;
        }
    }
    .ql-snow {
        box-sizing: border-box;
    }
    .ql-snow * {
        box-sizing: border-box;
    }
    .ql-snow .ql-hidden {
        display: none;
    }
    .ql-snow .ql-out-bottom,
    .ql-snow .ql-out-top {
        visibility: hidden;
    }
    .ql-snow .ql-tooltip {
        position: absolute;
        transform: translateY(10px);
    }
    .ql-snow .ql-tooltip a {
        cursor: pointer;
        text-decoration: none;
    }
    .ql-snow .ql-tooltip.ql-flip {
        transform: translateY(-10px);
    }
    .ql-snow .ql-formats {
        display: inline-block;
        vertical-align: middle;
    }
    .ql-snow .ql-formats:after {
        clear: both;
        content: '';
        display: table;
    }
    .ql-snow .ql-stroke {
        fill: none;
        stroke: #444;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
    }
    .ql-snow .ql-stroke-miter {
        fill: none;
        stroke: #444;
        stroke-miterlimit: 10;
        stroke-width: 2;
    }
    .ql-snow .ql-fill,
    .ql-snow .ql-stroke.ql-fill {
        fill: #444;
    }
    .ql-snow .ql-empty {
        fill: none;
    }
    .ql-snow .ql-even {
        fill-rule: evenodd;
    }
    .ql-snow .ql-thin,
    .ql-snow .ql-stroke.ql-thin {
        stroke-width: 1;
    }
    .ql-snow .ql-transparent {
        opacity: 0.4;
    }
    .ql-snow .ql-direction svg:last-child {
        display: none;
    }
    .ql-snow .ql-direction.ql-active svg:last-child {
        display: inline;
    }
    .ql-snow .ql-direction.ql-active svg:first-child {
        display: none;
    }
    .ql-snow .ql-editor h1 {
        font-size: 2rem;
    }
    .ql-snow .ql-editor h2 {
        font-size: 1.5rem;
    }
    .ql-snow .ql-editor h3 {
        font-size: 1.17rem;
    }
    .ql-snow .ql-editor h4 {
        font-size: 1rem;
    }
    .ql-snow .ql-editor h5 {
        font-size: 0.83rem;
    }
    .ql-snow .ql-editor h6 {
        font-size: 0.67rem;
    }
    .ql-snow .ql-editor a {
        text-decoration: underline;
    }
    .ql-snow .ql-editor blockquote {
        border-inline-start: 4px solid #ccc;
        margin-block-end: 5px;
        margin-block-start: 5px;
        padding-inline-start: 16px;
    }
    .ql-snow .ql-editor code,
    .ql-snow .ql-editor pre {
        background: #f0f0f0;
        border-radius: 3px;
    }
    .ql-snow .ql-editor pre {
        white-space: pre-wrap;
        margin-block-end: 5px;
        margin-block-start: 5px;
        padding: 5px 10px;
    }
    .ql-snow .ql-editor code {
        font-size: 85%;
        padding: 2px 4px;
    }
    .ql-snow .ql-editor pre.ql-syntax {
        background: #23241f;
        color: #f8f8f2;
        overflow: visible;
    }
    .ql-snow .ql-editor img {
        max-width: 100%;
    }
    .ql-snow .ql-picker {
        color: #444;
        display: inline-block;
        float: left;
        inset-inline-start: 0;
        font-size: 14px;
        font-weight: 500;
        height: 24px;
        position: relative;
        vertical-align: middle;
    }
    .ql-snow .ql-picker-label {
        cursor: pointer;
        display: inline-block;
        height: 100%;
        padding-inline-start: 8px;
        padding-inline-end: 2px;
        position: relative;
        width: 100%;
    }
    .ql-snow .ql-picker-label::before {
        display: inline-block;
        line-height: 22px;
    }
    .ql-snow .ql-picker-options {
        background: #fff;
        display: none;
        min-width: 100%;
        padding: 4px 8px;
        position: absolute;
        white-space: nowrap;
    }
    .ql-snow .ql-picker-options .ql-picker-item {
        cursor: pointer;
        display: block;
        padding-block-end: 5px;
        padding-block-start: 5px;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-label {
        color: #ccc;
        z-index: 2;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
        fill: #ccc;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
        stroke: #ccc;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-options {
        display: block;
        margin-block-start: -1px;
        top: 100%;
        z-index: 1;
    }
    .ql-snow .ql-color-picker,
    .ql-snow .ql-icon-picker {
        width: 28px;
    }
    .ql-snow .ql-color-picker .ql-picker-label,
    .ql-snow .ql-icon-picker .ql-picker-label {
        padding: 2px 4px;
    }
    .ql-snow .ql-color-picker .ql-picker-label svg,
    .ql-snow .ql-icon-picker .ql-picker-label svg {
        inset-inline-end: 4px;
    }
    .ql-snow .ql-icon-picker .ql-picker-options {
        padding: 4px 0;
    }
    .ql-snow .ql-icon-picker .ql-picker-item {
        height: 24px;
        width: 24px;
        padding: 2px 4px;
    }
    .ql-snow .ql-color-picker .ql-picker-options {
        padding: 3px 5px;
        width: 152px;
    }
    .ql-snow .ql-color-picker .ql-picker-item {
        border: 1px solid transparent;
        float: left;
        height: 16px;
        margin: 2px;
        padding: 0;
        width: 16px;
    }
    .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
        position: absolute;
        margin-block-start: -9px;
        inset-inline-end: 0;
        top: 50%;
        width: 18px;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {
        content: attr(data-label);
    }
    .ql-snow .ql-picker.ql-header {
        width: 98px;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: 'Normal';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
        content: 'Heading 1';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
        content: 'Heading 2';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
        content: 'Heading 3';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
        content: 'Heading 4';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
        content: 'Heading 5';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
        content: 'Heading 6';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
        font-size: 2rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
        font-size: 1.5rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
        font-size: 1.17rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
        font-size: 1rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
        font-size: 0.83rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
        font-size: 0.67rem;
    }
    .ql-snow .ql-picker.ql-font {
        width: 108px;
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: 'Sans Serif';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
        content: 'Serif';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
        content: 'Monospace';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
        font-family:
            Georgia,
            Times New Roman,
            serif;
    }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
        font-family:
            Monaco,
            Courier New,
            monospace;
    }
    .ql-snow .ql-picker.ql-size {
        width: 98px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: 'Normal';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
        content: 'Small';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
        content: 'Large';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
        content: 'Huge';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
        font-size: 10px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
        font-size: 18px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
        font-size: 32px;
    }
    .ql-snow .ql-color-picker.ql-background .ql-picker-item {
        background: #fff;
    }
    .ql-snow .ql-color-picker.ql-color .ql-picker-item {
        background: #000;
    }
    .ql-toolbar.ql-snow {
        border: 1px solid #ccc;
        box-sizing: border-box;
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        padding: 8px;
    }
    .ql-toolbar.ql-snow .ql-formats {
        margin-inline-end: 15px;
    }
    .ql-toolbar.ql-snow .ql-picker-label {
        border: 1px solid transparent;
    }
    .ql-toolbar.ql-snow .ql-picker-options {
        border: 1px solid transparent;
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;
    }
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
        border-color: #ccc;
    }
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
        border-color: #ccc;
    }
    .ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,
    .ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover {
        border-color: #000;
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
        border-block-start: 0;
    }
    .ql-snow .ql-tooltip {
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 0 5px #ddd;
        color: #444;
        padding: 5px 12px;
        white-space: nowrap;
    }
    .ql-snow .ql-tooltip::before {
        content: 'Visit URL:';
        line-height: 26px;
        margin-inline-end: 8px;
    }
    .ql-snow .ql-tooltip input[type='text'] {
        display: none;
        border: 1px solid #ccc;
        font-size: 13px;
        height: 26px;
        margin: 0;
        padding: 3px 5px;
        width: 170px;
    }
    .ql-snow .ql-tooltip a.ql-preview {
        display: inline-block;
        max-width: 200px;
        overflow-x: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
    }
    .ql-snow .ql-tooltip a.ql-action::after {
        border-inline-end: 1px solid #ccc;
        content: 'Edit';
        margin-inline-start: 16px;
        padding-inline-end: 8px;
    }
    .ql-snow .ql-tooltip a.ql-remove::before {
        content: 'Remove';
        margin-inline-start: 8px;
    }
    .ql-snow .ql-tooltip a {
        line-height: 26px;
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-preview,
    .ql-snow .ql-tooltip.ql-editing a.ql-remove {
        display: none;
    }
    .ql-snow .ql-tooltip.ql-editing input[type='text'] {
        display: inline-block;
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-inline-end: 0;
        content: 'Save';
        padding-inline-end: 0;
    }
    .ql-snow .ql-tooltip[data-mode='link']::before {
        content: 'Enter link:';
    }
    .ql-snow .ql-tooltip[data-mode='formula']::before {
        content: 'Enter formula:';
    }
    .ql-snow .ql-tooltip[data-mode='video']::before {
        content: 'Enter video:';
    }
    .ql-snow a {
        color: #06c;
    }
    .ql-container.ql-snow {
        border: 1px solid #ccc;
    }

    .p-editor {
        display: block;
    }

    .p-editor .p-editor-toolbar {
        background: dt('editor.toolbar.background');
        border-start-end-radius: dt('editor.toolbar.border.radius');
        border-start-start-radius: dt('editor.toolbar.border.radius');
    }

    .p-editor .p-editor-toolbar.ql-snow {
        border: 1px solid dt('editor.toolbar.border.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-stroke {
        stroke: dt('editor.toolbar.item.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-fill {
        fill: dt('editor.toolbar.item.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label {
        border: 0 none;
        color: dt('editor.toolbar.item.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover {
        color: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-stroke {
        stroke: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-fill {
        fill: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
        color: dt('editor.toolbar.item.active.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
        stroke: dt('editor.toolbar.item.active.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
        fill: dt('editor.toolbar.item.active.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
        background: dt('editor.overlay.background');
        border: 1px solid dt('editor.overlay.border.color');
        box-shadow: dt('editor.overlay.shadow');
        border-radius: dt('editor.overlay.border.radius');
        padding: dt('editor.overlay.padding');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item {
        color: dt('editor.overlay.option.color');
        border-radius: dt('editor.overlay.option.border.radius');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item:hover {
        background: dt('editor.overlay.option.focus.background');
        color: dt('editor.overlay.option.focus.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded:not(.ql-color-picker, .ql-icon-picker) .ql-picker-item {
        padding: dt('editor.overlay.option.padding');
    }

    .p-editor .p-editor-content {
        border-end-end-radius: dt('editor.content.border.radius');
        border-end-start-radius: dt('editor.content.border.radius');
    }

    .p-editor .p-editor-content.ql-snow {
        border: 1px solid dt('editor.content.border.color');
    }

    .p-editor .p-editor-content .ql-editor {
        background: dt('editor.content.background');
        color: dt('editor.content.color');
        border-end-end-radius: dt('editor.content.border.radius');
        border-end-start-radius: dt('editor.content.border.radius');
    }

    .p-editor .ql-snow.ql-toolbar button:hover,
    .p-editor .ql-snow.ql-toolbar button:focus {
        color: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .ql-snow.ql-toolbar button:hover .ql-stroke,
    .p-editor .ql-snow.ql-toolbar button:focus .ql-stroke {
        stroke: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .ql-snow.ql-toolbar button:hover .ql-fill,
    .p-editor .ql-snow.ql-toolbar button:focus .ql-fill {
        fill: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected {
        color: dt('editor.toolbar.item.active.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
        stroke: dt('editor.toolbar.item.active.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active .ql-fill,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill {
        fill: dt('editor.toolbar.item.active.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active .ql-picker-label,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-picker-label,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-picker-label {
        color: dt('editor.toolbar.item.active.color');
    }
`;var It=["header"],zt=[[["p-header"]]],Vt=["p-header"];function Dt(l,i){l&1&&Ie(0)}function Bt(l,i){if(l&1&&(n(0,"div",2),Ve(1),D(2,Dt,1,0,"ng-container",3),r()),l&2){let e=u();N(e.cx("toolbar")),d("pBind",e.ptm("toolbar")),o(2),d("ngTemplateOutlet",e.headerTemplate||e._headerTemplate)}}function Nt(l,i){if(l&1&&(n(0,"div",2)(1,"span",4)(2,"select",5)(3,"option",6),s(4,"Heading"),r(),n(5,"option",7),s(6,"Subheading"),r(),n(7,"option",8),s(8,"Normal"),r()(),n(9,"select",9)(10,"option",8),s(11,"Sans Serif"),r(),n(12,"option",10),s(13,"Serif"),r(),n(14,"option",11),s(15,"Monospace"),r()()(),n(16,"span",4),m(17,"button",12)(18,"button",13)(19,"button",14),r(),n(20,"span",4),m(21,"select",15)(22,"select",16),r(),n(23,"span",4),m(24,"button",17)(25,"button",18),n(26,"select",19),m(27,"option",8),n(28,"option",20),s(29,"center"),r(),n(30,"option",21),s(31,"right"),r(),n(32,"option",22),s(33,"justify"),r()()(),n(34,"span",4),m(35,"button",23)(36,"button",24)(37,"button",25),r(),n(38,"span",4),m(39,"button",26),r()()),l&2){let e=u();N(e.cx("toolbar")),d("pBind",e.ptm("toolbar")),o(),d("pBind",e.ptm("formats")),o(),d("pBind",e.ptm("header")),o(),d("pBind",e.ptm("option")),o(2),d("pBind",e.ptm("option")),o(2),d("pBind",e.ptm("option")),o(2),d("pBind",e.ptm("select")),o(),d("pBind",e.ptm("option")),o(2),d("pBind",e.ptm("option")),o(2),d("pBind",e.ptm("option")),o(2),d("pBind",e.ptm("formats")),o(),d("pBind",e.ptm("bold")),o(),d("pBind",e.ptm("italic")),o(),d("pBind",e.ptm("underline")),o(),d("pBind",e.ptm("formats")),o(),d("pBind",e.ptm("color")),o(),d("pBind",e.ptm("background")),o(),d("pBind",e.ptm("formats")),o(),d("pBind",e.ptm("list")),o(),d("pBind",e.ptm("list")),o(),d("pBind",e.ptm("select")),o(),d("pBind",e.ptm("option")),o(),d("pBind",e.ptm("option")),o(2),d("pBind",e.ptm("option")),o(2),d("pBind",e.ptm("option")),o(2),d("pBind",e.ptm("formats")),o(),d("pBind",e.ptm("link")),o(),d("pBind",e.ptm("image")),o(),d("pBind",e.ptm("codeBlock")),o(),d("pBind",e.ptm("formats")),o(),d("pBind",e.ptm("clean"))}}var Lt={root:({instance:l})=>["p-editor",{"p-invalid":l.invalid()}],toolbar:"p-editor-toolbar",content:"p-editor-content"},kt=(()=>{class l extends Je{name="editor";style=yt;classes=Lt;static \u0275fac=(()=>{let e;return function(a){return(e||(e=Pe(l)))(a||l)}})();static \u0275prov=we({token:l,factory:l.\u0275fac})}return l})();var Ct=new ke("EDITOR_INSTANCE"),Ft={provide:et,useExisting:xe(()=>ae),multi:!0},ae=(()=>{class l extends rt{$pcEditor=x(Ct,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=x(F,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}style;styleClass;placeholder;formats;modules;bounds;scrollingContainer;debug;get readonly(){return this._readonly}set readonly(e){this._readonly=e,this.quill&&(this._readonly?this.quill.disable():this.quill.enable())}onEditorInit=new M;onTextChange=new M;onSelectionChange=new M;onEditorChange=new M;onFocus=new M;onBlur=new M;toolbar;value;delayedCommand=null;_readonly=!1;quill;dynamicQuill;headerTemplate;templates;_headerTemplate;get isAttachedQuillEditorToDOM(){return this.quillElements?.editorElement?.isConnected}quillElements;focusListener=null;blurListener=null;_componentStyle=x(kt);constructor(){super(),Ee(()=>{this.initQuillElements(),this.initQuillEditor()})}onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"header":this.headerTemplate=e.template;break}})}writeControlValue(e){if(this.value=e,this.quill)if(e){let t=()=>{this.quill.setContents(this.quill.clipboard.convert(this.dynamicQuill.version.startsWith("2")?{html:this.value}:this.value))};this.isAttachedQuillEditorToDOM?t():this.delayedCommand=t}else{let t=()=>{this.quill.setText("")};this.isAttachedQuillEditorToDOM?t():this.delayedCommand=t}}getQuill(){return this.quill}initQuillEditor(){Ue(this.platformId)||(this.dynamicQuill?this.createQuillEditor():import("./chunk-BSCL5A2K.js").then(e=>{this.dynamicQuill=e.default,this.createQuillEditor()}).catch(e=>console.error(e.message)))}createQuillEditor(){this.initQuillElements();let{toolbarElement:e,editorElement:t}=this.quillElements,a={toolbar:e},c=this.modules?P(P({},a),this.modules):a;this.quill=new this.dynamicQuill(t,{modules:c,placeholder:this.placeholder,readOnly:this.readonly,theme:"snow",formats:this.formats,bounds:this.bounds,debug:this.debug,scrollingContainer:this.scrollingContainer});let p=this.dynamicQuill.version.startsWith("2");this.value&&this.quill.setContents(this.quill.clipboard.convert(p?{html:this.value}:this.value)),this.quill.on("text-change",(z,A,j)=>{if(j==="user"){let R=p?this.quill.getSemanticHTML():Y(t,".ql-editor")?.innerHTML,Tt=this.quill.getText().trim();R==="<p><br></p>"&&(R=null),this.onTextChange.emit({htmlValue:R,textValue:Tt,delta:z,source:j}),this.onModelChange(R),this.onModelTouched()}}),this.quill.on("selection-change",(z,A,j)=>{this.onSelectionChange.emit({range:z,oldRange:A,source:j})}),this.quill.on("editor-change",(z,...A)=>{this.onEditorChange.emit({eventName:z,args:A})});let fe=this.quill.root;this.focusListener=()=>{this.onFocus.emit({source:"user"})},this.blurListener=()=>{this.onBlur.emit({source:"user"})},fe.addEventListener("focus",this.focusListener),fe.addEventListener("blur",this.blurListener),this.onEditorInit.emit({editor:this.quill})}onDestroy(){if(this.quill&&this.quill.root){let e=this.quill.root;this.focusListener&&(e.removeEventListener("focus",this.focusListener),this.focusListener=null),this.blurListener&&(e.removeEventListener("blur",this.blurListener),this.blurListener=null)}}initQuillElements(){this.quillElements||(this.quillElements={editorElement:Y(this.el.nativeElement,'div[data-pc-section="content"]'),toolbarElement:Y(this.el.nativeElement,'div[data-pc-section="toolbar"]')})}static \u0275fac=function(t){return new(t||l)};static \u0275cmp=O({type:l,selectors:[["p-editor"]],contentQueries:function(t,a,c){if(t&1&&De(c,$e,5)(c,It,4)(c,Ge,4),t&2){let p;Q(p=$())&&(a.toolbar=p.first),Q(p=$())&&(a.headerTemplate=p.first),Q(p=$())&&(a.templates=p)}},hostVars:2,hostBindings:function(t,a){t&2&&N(a.cn(a.cx("root"),a.styleClass))},inputs:{style:"style",styleClass:"styleClass",placeholder:"placeholder",formats:"formats",modules:"modules",bounds:"bounds",scrollingContainer:"scrollingContainer",debug:"debug",readonly:"readonly"},outputs:{onEditorInit:"onInit",onTextChange:"onTextChange",onSelectionChange:"onSelectionChange",onEditorChange:"onEditorChange",onFocus:"onFocus",onBlur:"onBlur"},features:[J([Ft,kt,{provide:Ct,useExisting:l},{provide:Xe,useExisting:l}]),Se([F]),Te],ngContentSelectors:Vt,decls:3,vars:6,consts:[[3,"class","pBind",4,"ngIf"],[3,"ngStyle","pBind"],[3,"pBind"],[4,"ngTemplateOutlet"],[1,"ql-formats",3,"pBind"],[1,"ql-header",3,"pBind"],["value","1",3,"pBind"],["value","2",3,"pBind"],["selected","",3,"pBind"],[1,"ql-font",3,"pBind"],["value","serif",3,"pBind"],["value","monospace",3,"pBind"],["aria-label","Bold","type","button",1,"ql-bold",3,"pBind"],["aria-label","Italic","type","button",1,"ql-italic",3,"pBind"],["aria-label","Underline","type","button",1,"ql-underline",3,"pBind"],[1,"ql-color",3,"pBind"],[1,"ql-background",3,"pBind"],["value","ordered","aria-label","Ordered List","type","button",1,"ql-list",3,"pBind"],["value","bullet","aria-label","Unordered List","type","button",1,"ql-list",3,"pBind"],[1,"ql-align",3,"pBind"],["value","center",3,"pBind"],["value","right",3,"pBind"],["value","justify",3,"pBind"],["aria-label","Insert Link","type","button",1,"ql-link",3,"pBind"],["aria-label","Insert Image","type","button",1,"ql-image",3,"pBind"],["aria-label","Insert Code Block","type","button",1,"ql-code-block",3,"pBind"],["aria-label","Remove Styles","type","button",1,"ql-clean",3,"pBind"]],template:function(t,a){t&1&&(ze(zt),D(0,Bt,3,4,"div",0)(1,Nt,40,33,"div",0),m(2,"div",1)),t&2&&(d("ngIf",a.toolbar||a.headerTemplate||a._headerTemplate),o(),d("ngIf",!a.toolbar&&!a.headerTemplate&&!a._headerTemplate),o(),N(a.cx("content")),d("ngStyle",a.style)("pBind",a.ptm("content")))},dependencies:[Re,Fe,je,Ae,K,Ze,F],encapsulation:2,changeDetection:0})}return l})(),Pt=(()=>{class l{static \u0275fac=function(t){return new(t||l)};static \u0275mod=Oe({type:l});static \u0275inj=ye({imports:[ae,K,K]})}return l})();var $t=()=>({height:"150px"});function Gt(l,i){l&1&&(n(0,"span",55),m(1,"button",56)(2,"button",57)(3,"button",58),r(),n(4,"span",55),m(5,"button",59)(6,"button",60)(7,"button",61)(8,"button",62),r())}function Jt(l,i){if(l&1){let e=w();n(0,"div",24),m(1,"img",63),n(2,"span")(3,"strong"),s(4),r(),n(5,"small"),s(6),r()(),n(7,"p-button",64),f("onClick",function(){g(e);let a=u();return q(a.removeFile())}),r()()}if(l&2){let e=i,t=u();o(),d("src",t.previewImage(),E),o(3),_(e.name),o(2),y("",(e.size/1024).toFixed(0)," Ko"),o(),d("text",!0)("disabled",t.saving())}}function Wt(l,i){l&1&&(n(0,"small",25),s(1,"Lecture de l\u2019image\u2026"),r())}function Yt(l,i){if(l&1&&(n(0,"p",28),s(1),r()),l&2){let e=u();o(),_(e.imageError())}}function Kt(l,i){l&1&&(n(0,"p",28),s(1,"Compl\xE9tez le titre, la cat\xE9gorie, le r\xE9sum\xE9, le contenu et la date de publication."),r())}function Xt(l,i){if(l&1&&(n(0,"p",28),s(1),r()),l&2){let e=u();o(),_(e.saveError())}}function Zt(l,i){if(l&1){let e=w();n(0,"img",65),f("error",function(){g(e);let a=u();return q(a.imageFailed.set(!0))}),r()}if(l&2){let e=u();d("src",e.previewImage(),E)}}function en(l,i){if(l&1&&(n(0,"div",44),m(1,"i",66),n(2,"span"),s(3),r()()),l&2){let e=u();o(3),_(e.imageFailed()?"Impossible de charger cette image":"Votre image de couverture appara\xEEtra ici")}}function tn(l,i){l&1&&(n(0,"p",52),s(1,"Commencez \xE0 r\xE9diger pour voir votre publication prendre forme."),r())}var Et=/^(https?:\/\/|\/api\/v1\/media\/)/i,se=class l{initial=L({});author=L("La mairie");saving=L(!1);saveError=L(null);saved=ue();cancelled=ue();title=b("");category=b("Information");summary=b("");content=b("");coverUrl=b("");coverFile=b(null);publishedAt=b(new Date);publishImmediately=b(!0);dragging=b(!1);imageError=b(null);attempted=b(!1);imageLoading=b(!1);categories=["Information","Vie municipale","\xC9v\xE9nement","Travaux","Services","Culture"];localCover=b("");selectionVersion=0;imageFailed=b(!1);previewImage=C(()=>this.localCover()||(Et.test(this.coverUrl().trim())?this.coverUrl().trim():""));valid=C(()=>this.title().trim().length>0&&this.category().trim().length>0&&this.summary().trim().length>0&&this.content().replace(/<[^>]*>/g,"").replace(/&nbsp;/g,"").trim().length>0&&(this.publishImmediately()||this.publishedAt()!==null&&Number.isFinite(this.publishedAt().getTime())));constructor(){ce(()=>{let i=this.initial();Me(()=>{this.title.set(i.title??""),this.category.set(i.category??"Information"),this.summary.set(i.summary??""),this.content.set(i.content??""),this.coverUrl.set(i.coverUrl??""),this.publishedAt.set(i.publishedAt??new Date),this.publishImmediately.set(i.publishImmediately??!0),this.removeFile(),this.attempted.set(!1)})}),ce(()=>{this.previewImage(),this.imageFailed.set(!1)})}selectFile(i){let e=i.target,t=e.files?.[0];t&&this.readFile(t),e.value=""}dragOver(i){i.preventDefault(),this.saving()||this.dragging.set(!0)}drop(i){if(i.preventDefault(),this.dragging.set(!1),this.saving())return;let e=i.dataTransfer?.files[0];e&&this.readFile(e)}readFile(i){if(this.saving())return;this.imageError.set(null);let e=++this.selectionVersion;if(this.imageLoading.set(!1),!["image/jpeg","image/png","image/webp"].includes(i.type)){this.imageError.set("Choisissez une image JPG, PNG ou WebP.");return}if(i.size>5*1024*1024){this.imageError.set("L\u2019image ne doit pas d\xE9passer 5 Mo.");return}let t=URL.createObjectURL(i),a=new Image;this.imageLoading.set(!0),a.onload=()=>{if(e!==this.selectionVersion){URL.revokeObjectURL(t);return}this.releaseCover(),this.localCover.set(t),this.coverFile.set(i),this.imageLoading.set(!1)},a.onerror=()=>{URL.revokeObjectURL(t),e===this.selectionVersion&&(this.imageLoading.set(!1),this.imageError.set("Cette image ne peut pas \xEAtre lue. Choisissez un autre fichier."))},a.src=t}removeFile(){this.selectionVersion++,this.releaseCover(),this.coverFile.set(null),this.imageLoading.set(!1),this.imageError.set(null)}releaseCover(){this.localCover()&&URL.revokeObjectURL(this.localCover()),this.localCover.set("")}ngOnDestroy(){this.selectionVersion++,this.releaseCover()}submit(){if(this.attempted.set(!0),!(!this.valid()||this.saving()||this.imageLoading())){if(!this.coverFile()&&this.coverUrl().trim()&&!Et.test(this.coverUrl().trim())){this.imageError.set("L\u2019adresse de l\u2019image doit commencer par https:// ou http://.");return}this.saved.emit({title:this.title().trim(),category:this.category().trim(),summary:this.summary().trim(),content:this.content(),coverUrl:this.coverFile()?"":this.coverUrl().trim(),coverFile:this.coverFile(),publishedAt:this.publishImmediately()?new Date:this.publishedAt(),publishImmediately:this.publishImmediately()})}}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=O({type:l,selectors:[["app-publication-editor"]],inputs:{initial:[1,"initial"],author:[1,"author"],saving:[1,"saving"],saveError:[1,"saveError"]},outputs:{saved:"saved",cancelled:"cancelled"},decls:112,vars:49,consts:[["header",""],["fileInput",""],[1,"publication-editor"],[1,"edit-panel",3,"ngSubmit"],[1,"panel-header"],[1,"eyebrow"],["icon","pi pi-times","ariaLabel","Fermer l\u2019\xE9diteur",3,"onClick","text","rounded","disabled"],[3,"disabled"],[1,"field-row"],[1,"field"],["for","publication-title"],["pInputText","","id","publication-title","name","title","maxlength","200","placeholder","Le titre de votre publication","required","",3,"ngModelChange","ngModel"],["for","publication-category"],["inputId","publication-category","name","category",3,"ngModelChange","options","editable","ngModel","disabled"],[1,"label-row"],["for","publication-summary"],["pTextarea","","id","publication-summary","name","summary","rows","3","maxlength","500","placeholder","L\u2019essentiel en quelques mots\u2026","required","",3,"ngModelChange","ngModel"],["id","publication-content-label"],["name","content",3,"ngModelChange","ngModel","readonly"],["for","publication-cover"],[1,"drop-zone",3,"dragover","dragleave","drop"],["aria-hidden","true",1,"pi","pi-cloud-upload"],["label","Parcourir","severity","secondary",3,"onClick","outlined","disabled"],["id","publication-cover","type","file","accept","image/jpeg,image/png,image/webp","hidden","",3,"change"],[1,"selected-image"],["role","status"],["for","publication-cover-url",1,"url-label"],["pInputText","","id","publication-cover-url","name","coverUrl","type","url","placeholder","https://exemple.fr/image.jpg",3,"ngModelChange","ngModel","disabled"],["role","alert",1,"error"],[1,"field-row","schedule"],["for","publication-date"],["inputId","publication-date","name","publishedAt","dateFormat","dd/mm/yy","hourFormat","24","appendTo","body",3,"ngModelChange","ngModel","showTime","showIcon","disabled"],[1,"immediate"],["inputId","publication-now","name","publishImmediately",3,"ngModelChange","binary","ngModel","disabled"],["for","publication-now"],[1,"editor-actions"],["aria-hidden","true",1,"pi","pi-lock"],["label","Annuler","severity","secondary",3,"onClick","text","disabled"],["label","Enregistrer","icon","pi pi-check","iconPos","right","type","submit",3,"loading","disabled"],["aria-label","Aper\xE7u de la publication",1,"preview-panel"],[1,"preview-heading"],["aria-hidden","true",1,"pi","pi-circle-fill"],[1,"preview-card"],["alt","Couverture de la publication",1,"cover-image",3,"src"],[1,"cover-empty"],[1,"preview-body"],[1,"category-badge"],[1,"metadata"],["aria-hidden","true",1,"pi","pi-user"],["aria-hidden","true",1,"pi","pi-calendar"],[1,"summary-text"],[1,"rich-content",3,"innerHTML"],[1,"empty-copy"],[1,"preview-note"],["aria-hidden","true",1,"pi","pi-eye"],[1,"ql-formats"],["type","button","aria-label","Gras",1,"ql-bold"],["type","button","aria-label","Italique",1,"ql-italic"],["type","button","aria-label","Souligner",1,"ql-underline"],["type","button","value","ordered","aria-label","Liste num\xE9rot\xE9e",1,"ql-list"],["type","button","value","bullet","aria-label","Liste \xE0 puces",1,"ql-list"],["type","button","aria-label","Ins\xE9rer un lien",1,"ql-link"],["type","button","aria-label","Effacer la mise en forme",1,"ql-clean"],["alt","Image s\xE9lectionn\xE9e",3,"src"],["icon","pi pi-trash","severity","secondary","ariaLabel","Retirer l\u2019image",3,"onClick","text","disabled"],["alt","Couverture de la publication",1,"cover-image",3,"error","src"],["aria-hidden","true",1,"pi","pi-image"]],template:function(e,t){if(e&1){let a=w();n(0,"div",2)(1,"form",3),f("ngSubmit",function(){return g(a),q(t.submit())}),n(2,"header",4)(3,"div")(4,"span",5),s(5,"PUBLICATIONS MUNICIPALES"),r(),n(6,"h2"),s(7,"Modifier la publication"),r()(),n(8,"p-button",6),f("onClick",function(){return g(a),q(t.cancelled.emit())}),r()(),n(9,"fieldset",7)(10,"div",8)(11,"div",9)(12,"label",10),s(13,"Titre "),n(14,"span"),s(15,"*"),r()(),n(16,"input",11),f("ngModelChange",function(p){return g(a),q(t.title.set(p))}),r()(),n(17,"div",9)(18,"label",12),s(19,"Cat\xE9gorie "),n(20,"span"),s(21,"*"),r()(),n(22,"p-select",13),f("ngModelChange",function(p){return g(a),q(t.category.set(p??""))}),r()()(),n(23,"div",9)(24,"div",14)(25,"label",15),s(26,"R\xE9sum\xE9 "),n(27,"span"),s(28,"*"),r()(),n(29,"small"),s(30),r()(),n(31,"textarea",16),f("ngModelChange",function(p){return g(a),q(t.summary.set(p))}),r()(),n(32,"div",9)(33,"label",17),s(34,"Contenu "),n(35,"span"),s(36,"*"),r()(),n(37,"p-editor",18),f("ngModelChange",function(p){return g(a),q(t.content.set(p??""))}),D(38,Gt,9,0,"ng-template",null,0,Le),r()(),n(40,"div",9)(41,"label",19),s(42,"Image de couverture"),r(),n(43,"div",20),f("dragover",function(p){return g(a),q(t.dragOver(p))})("dragleave",function(){return g(a),q(t.dragging.set(!1))})("drop",function(p){return g(a),q(t.drop(p))}),m(44,"i",21),n(45,"div")(46,"strong"),s(47,"Glissez-d\xE9posez votre image"),r(),n(48,"small"),s(49,"JPG, PNG ou WebP \xB7 5 Mo maximum"),r()(),n(50,"p-button",22),f("onClick",function(){g(a);let p=G(52);return q(p.click())}),r(),n(51,"input",23,1),f("change",function(p){return g(a),q(t.selectFile(p))}),r()(),v(53,Jt,8,5,"div",24),v(54,Wt,2,0,"small",25),n(55,"label",26),s(56,"Ou utiliser une URL"),r(),n(57,"input",27),f("ngModelChange",function(p){return g(a),q(t.coverUrl.set(p))}),r(),v(58,Yt,2,1,"p",28),r(),n(59,"div",29)(60,"div",9)(61,"label",30),s(62,"Date de publication"),r(),n(63,"p-datepicker",31),f("ngModelChange",function(p){return g(a),q(t.publishedAt.set(p))}),r()(),n(64,"div",32)(65,"p-checkbox",33),f("ngModelChange",function(p){return g(a),q(t.publishImmediately.set(p))}),r(),n(66,"label",34),s(67,"Publier imm\xE9diatement"),r()()()(),v(68,Kt,2,0,"p",28),v(69,Xt,2,1,"p",28),n(70,"footer",35)(71,"span"),m(72,"i",36),s(73," Vos modifications ne sont pas encore publi\xE9es"),r(),n(74,"p-button",37),f("onClick",function(){return g(a),q(t.cancelled.emit())}),r(),m(75,"p-button",38),r()(),n(76,"aside",39)(77,"div",40)(78,"h2"),s(79,"Aper\xE7u en direct"),r(),n(80,"span"),m(81,"i",41),s(82," Mis \xE0 jour en temps r\xE9el"),r()(),n(83,"article",42),v(84,Zt,1,1,"img",43)(85,en,4,1,"div",44),n(86,"div",45)(87,"span",46),s(88),r(),n(89,"h1"),s(90),r(),n(91,"p",47)(92,"span"),m(93,"i",48),s(94),r(),n(95,"span"),m(96,"i",49),s(97),T(98,"date"),r()(),n(99,"section")(100,"h3"),s(101,"R\xE9sum\xE9"),r(),n(102,"p",50),s(103),r()(),n(104,"section")(105,"h3"),s(106,"Contenu"),r(),m(107,"div",51),v(108,tn,2,0,"p",52),r(),n(109,"div",53),m(110,"i",54),s(111," Aper\xE7u avant enregistrement"),r()()()()()}if(e&2){let a;o(8),d("text",!0)("rounded",!0)("disabled",t.saving()),o(),d("disabled",t.saving()),o(7),d("ngModel",t.title()),o(6),d("options",t.categories)("editable",!0)("ngModel",t.category())("disabled",t.saving()),o(8),y("",t.summary().length,"/500"),o(),d("ngModel",t.summary()),o(6),B(S(48,$t)),d("ngModel",t.content())("readonly",t.saving()),o(6),k("dragging",t.dragging()),o(7),d("outlined",!0)("disabled",t.saving()),o(3),h((a=t.coverFile())?53:-1,a),o(),h(t.imageLoading()?54:-1),o(3),d("ngModel",t.coverUrl())("disabled",!!t.coverFile()||t.saving()),o(),h(t.imageError()?58:-1),o(5),d("ngModel",t.publishedAt())("showTime",!0)("showIcon",!0)("disabled",t.publishImmediately()||t.saving()),o(2),d("binary",!0)("ngModel",t.publishImmediately())("disabled",t.saving()),o(3),h(t.attempted()&&!t.valid()?68:-1),o(),h(t.saveError()?69:-1),o(5),d("text",!0)("disabled",t.saving()),o(),d("loading",t.saving())("disabled",t.imageLoading()),o(9),h(t.previewImage()&&!t.imageFailed()?84:85),o(4),_(t.category()||"Cat\xE9gorie"),o(2),_(t.title()||"Le titre de votre publication"),o(4),y(" ",t.author()),o(3),y(" ",t.publishImmediately()?"Publication imm\xE9diate":I(98,45,t.publishedAt(),"dd/MM/yyyy \xE0 HH:mm")),o(6),_(t.summary()||"Le r\xE9sum\xE9 de votre publication s\u2019affichera ici."),o(4),d("innerHTML",t.content(),U),o(),h(t.content()?-1:108)}},dependencies:[te,ee,tt,nt,X,ot,lt,it,Z,oe,ct,ht,vt,xt,_t,Pt,ae,st,at,ie,ne,re,le,W],styles:["[_nghost-%COMP%]{display:block;--pe-bg: var(--surface-ground, var(--p-content-hover-background));--pe-panel: var(--p-content-background);--pe-border: var(--p-content-border-color);--pe-text: var(--p-text-color);--pe-muted: var(--p-text-muted-color);--pe-field: var(--p-form-field-background);--pe-accent: var(--p-primary-color);--pe-accent-soft: color-mix(in srgb, var(--p-primary-color) 14%, transparent);--pe-accent-strong: color-mix(in srgb, var(--p-primary-color) 55%, var(--p-text-color));--pe-danger: var(--p-red-600);--pe-shadow: 0 12px 32px color-mix(in srgb, #000 10%, transparent);color:var(--pe-text)}.app-dark[_nghost-%COMP%], .app-dark   [_nghost-%COMP%]{--pe-danger: var(--p-red-300);--pe-shadow: 0 12px 32px color-mix(in srgb, #000 35%, transparent)}.publication-editor[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;padding:24px;background:var(--pe-bg);border-radius:16px}.edit-panel[_ngcontent-%COMP%], .preview-card[_ngcontent-%COMP%]{background:var(--pe-panel);border:1px solid var(--pe-border);border-radius:12px;overflow:hidden;box-shadow:var(--pe-shadow)}.edit-panel[_ngcontent-%COMP%]{padding:22px}.edit-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:6px 0 0;font-size:18px;font-weight:600;color:var(--pe-text)}.panel-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px}.eyebrow[_ngcontent-%COMP%]{font-size:11px;letter-spacing:.08em;color:var(--pe-accent-strong)}.editor-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:8px;padding-top:18px;border-top:1px solid var(--pe-border)}.editor-actions[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{flex:1 1 100%;margin-bottom:4px;font-size:11px;color:var(--pe-muted)}.error[_ngcontent-%COMP%]{margin:4px 0 12px;font-size:12px;color:var(--pe-danger)}@media(max-width:1000px){.publication-editor[_ngcontent-%COMP%]{gap:18px;padding:16px}}@media(max-width:760px){.publication-editor[_ngcontent-%COMP%]{grid-template-columns:1fr;padding:12px}.edit-panel[_ngcontent-%COMP%]{padding:18px}}.edit-panel[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]{min-width:0;margin:0;padding:0;border:0}.edit-panel[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:12px;font-weight:500;color:var(--pe-text)}.edit-panel[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--pe-accent)}.edit-panel[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:11px;color:var(--pe-muted)}.edit-panel[_ngcontent-%COMP%]   input[pInputText][_ngcontent-%COMP%], .edit-panel[_ngcontent-%COMP%]   textarea[pTextarea][_ngcontent-%COMP%]{width:100%;font-size:13px}.edit-panel[_ngcontent-%COMP%]   textarea[pTextarea][_ngcontent-%COMP%]{resize:vertical}.edit-panel[_ngcontent-%COMP%]   p-select[_ngcontent-%COMP%], .edit-panel[_ngcontent-%COMP%]   p-datepicker[_ngcontent-%COMP%]{width:100%}.edit-panel[_ngcontent-%COMP%]     .p-select, .edit-panel[_ngcontent-%COMP%]     .p-datepicker{width:100%}.field-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:1.2fr 1fr;gap:14px}.field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:0;margin-bottom:20px}.label-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.schedule[_ngcontent-%COMP%]{align-items:center}.immediate[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding-top:4px}.immediate[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:12px}@media(max-width:1000px){.field-row[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:0}.immediate[_ngcontent-%COMP%]{margin-bottom:20px}}.drop-zone[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px;padding:22px 14px;border:1px dashed var(--pe-border);border-radius:8px;background:var(--pe-field);transition:border-color .15s,background .15s}.drop-zone[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{font-size:28px;color:var(--pe-muted)}.drop-zone[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;margin-bottom:4px;font-size:12px;font-weight:500}.drop-zone[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{display:block}.drop-zone.dragging[_ngcontent-%COMP%]{border-color:var(--pe-accent);background:var(--pe-accent-soft)}.selected-image[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.selected-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:68px;height:46px;border-radius:6px;object-fit:cover}.selected-image[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{flex:1;min-width:0}.selected-image[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;overflow:hidden;font-size:12px;text-overflow:ellipsis;white-space:nowrap}.selected-image[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{display:block;margin-top:4px}.edit-panel[_ngcontent-%COMP%]   .url-label[_ngcontent-%COMP%]{margin-top:4px;font-size:11px;color:var(--pe-muted)}.preview-panel[_ngcontent-%COMP%]{min-width:0}.preview-heading[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:4px 0 16px}.preview-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--pe-text)}.preview-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:11px;color:var(--pe-muted)}.preview-heading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:4px;font-size:6px;color:var(--pe-accent)}.preview-card[_ngcontent-%COMP%]{position:sticky;top:20px}.preview-card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:14px 0 12px;font-size:26px;font-weight:650;line-height:1.25;letter-spacing:-.025em;color:var(--pe-text)}.preview-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:20px 0 10px;font-size:14px;color:var(--pe-text)}.cover-image[_ngcontent-%COMP%]{display:block;width:100%;aspect-ratio:2.3;object-fit:cover}.cover-empty[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-height:180px;background:var(--pe-field);font-size:12px;color:var(--pe-muted)}.cover-empty[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:26px}.preview-body[_ngcontent-%COMP%]{padding:24px;overflow-wrap:anywhere}.category-badge[_ngcontent-%COMP%]{padding:4px 8px;border-radius:4px;background:var(--pe-accent-soft);font-size:11px;color:var(--pe-accent-strong)}.metadata[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:12px;padding-bottom:18px;border-bottom:1px solid var(--pe-border);font-size:11px;color:var(--pe-muted)}.metadata[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:4px}.summary-text[_ngcontent-%COMP%], .rich-content[_ngcontent-%COMP%], .empty-copy[_ngcontent-%COMP%]{font-size:13px;line-height:1.75;color:var(--pe-text)}.summary-text[_ngcontent-%COMP%]{white-space:pre-wrap}.empty-copy[_ngcontent-%COMP%]{color:var(--pe-muted)}.rich-content[_ngcontent-%COMP%]     p{margin:0 0 12px}.rich-content[_ngcontent-%COMP%]     ul, .rich-content[_ngcontent-%COMP%]     ol{margin:0 0 12px;padding-left:1.4rem}.rich-content[_ngcontent-%COMP%]     img{max-width:100%}.rich-content[_ngcontent-%COMP%]     a{color:var(--pe-accent)}.preview-note[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin-top:24px;padding-top:16px;border-top:1px solid var(--pe-border);font-size:11px;color:var(--pe-muted)}@media(max-width:1000px){.preview-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:none}}@media(max-width:760px){.preview-card[_ngcontent-%COMP%]{position:static}.preview-heading[_ngcontent-%COMP%]{margin-top:12px}.preview-body[_ngcontent-%COMP%]{padding:18px}.preview-card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:23px}}"]})};var nn=()=>({width:"min(94vw, 50rem)"}),on=()=>({width:"min(96vw, 72rem)"}),ln=()=>({padding:"0"}),St=(l,i)=>i.id;function rn(l,i){if(l&1){let e=w();n(0,"button",15),f("click",function(){g(e);let a=u();return q(a.openCreate())}),r()}}function an(l,i){l&1&&(n(0,"p",5),m(1,"i",16),s(2," Vous g\xE9rez les publications de la mairie, y compris les brouillons."),r())}function sn(l,i){l&1&&(n(0,"p",7),s(1,"Actualisation des publications\u2026"),r())}function dn(l,i){if(l&1){let e=w();n(0,"p",8),s(1),n(2,"button",17),f("click",function(){g(e);let a=u();return q(a.load())}),s(3,"R\xE9essayer"),r()()}l&2&&(o(),y("",i," "))}function cn(l,i){if(l&1&&m(0,"img",20),l&2){let e=u().$implicit;d("src",e.image_url,E)("alt","")}}function pn(l,i){l&1&&(n(0,"span",21),m(1,"i",35),r())}function mn(l,i){l&1&&(n(0,"span",25),s(1,"Brouillon"),r())}function un(l,i){if(l&1){let e=w();n(0,"button",36),f("click",function(a){g(e);let c=u().$implicit,p=u();return q(p.likePublication(c,a))}),m(1,"i",37),s(2," J\u2019aime"),r()}if(l&2){let e=u().$implicit,t=u();k("publication-liked",t.likedPublicationIds().has(e.id)),H("aria-pressed",t.likedPublicationIds().has(e.id))("aria-label","Aimer la publication "+e.title),o(),k("pi-heart",!t.likedPublicationIds().has(e.id))("pi-heart-fill",t.likedPublicationIds().has(e.id))}}function bn(l,i){if(l&1){let e=w();n(0,"div",34)(1,"button",38),f("click",function(a){g(e);let c=u().$implicit,p=u();return q(p.openEdit(c,a))}),r(),n(2,"button",39),f("click",function(a){g(e);let c=u().$implicit,p=u();return q(p.confirmDelete(c,a))}),r()()}l&2&&(o(),d("text",!0),o(),d("text",!0))}function gn(l,i){if(l&1){let e=w();n(0,"article",18)(1,"button",19),f("click",function(){let a=g(e).$implicit,c=u();return q(c.openPublication(a))}),v(2,cn,1,2,"img",20)(3,pn,2,0,"span",21),n(4,"span",22)(5,"span",23)(6,"span",24),s(7),r(),v(8,mn,2,0,"span",25),r(),n(9,"span",26),s(10),T(11,"date"),r(),n(12,"span",27)(13,"span"),m(14,"i",28),s(15),r(),n(16,"span"),m(17,"i",29),s(18),r()(),n(19,"span",30),s(20),r()(),n(21,"span",31),m(22,"i",28),s(23," Voir"),r()(),n(24,"footer",32),v(25,un,3,8,"button",33),v(26,bn,3,2,"div",34),r()()}if(l&2){let e=i.$implicit,t=u();k("publication-draft",t.canManage()&&!e.is_published),o(),H("aria-label","Voir la publication "+e.title),o(),h(e.image_url?2:3),o(5),_(e.title),o(),h(t.canManage()&&!e.is_published?8:-1),o(2),y("Publication municipale \xB7 ",I(11,13,e.published_at,"d MMM y, HH:mm")),o(5),Be(" ",e.view_count??0," vue",(e.view_count??0)>1?"s":""),o(3),y(" ",e.like_count??0),o(2),_(e.summary),o(5),h(t.isCitizen()?25:-1),o(),h(t.canManage()?26:-1)}}function qn(l,i){l&1&&(n(0,"p"),s(1,"Aucune publication dans cette cat\xE9gorie."),r())}function fn(l,i){if(l&1&&m(0,"img",40),l&2){let e=u();d("src",e.image_url,E)("alt","")}}function vn(l,i){l&1&&(n(0,"div",41),m(1,"i",35),r())}function hn(l,i){l&1&&(n(0,"p",55),s(1,"Chargement des commentaires\u2026"),r())}function _n(l,i){if(l&1&&(n(0,"article",57)(1,"div",58)(2,"strong"),s(3),r(),n(4,"time",59),s(5),T(6,"date"),r()(),n(7,"p",60),s(8),r()()),l&2){let e=i.$implicit;o(3),_(e.author_name),o(2),_(I(6,3,e.created_at,"d MMM y, HH:mm")),o(3),_(e.content)}}function xn(l,i){l&1&&(n(0,"p",61),s(1,"Soyez le premier \xE0 commenter cette publication."),r())}function wn(l,i){if(l&1&&v(0,xn,2,0,"p",61),l&2){let e=u(3);h(e.commentsLoading()?-1:0)}}function yn(l,i){if(l&1){let e=w();n(0,"div",48)(1,"button",36),f("click",function(a){g(e);let c=u(),p=u();return q(p.likePublication(c,a))}),m(2,"i",37),s(3),r()(),n(4,"section",49)(5,"h3",50),s(6,"Commentaires"),r(),n(7,"form",51),f("ngSubmit",function(){g(e);let a=G(11);return u(2).addComment(a.value),q(a.value="")}),n(8,"label",52),s(9,"Ajouter un commentaire"),r(),m(10,"textarea",53,0),n(12,"div"),m(13,"button",54),r()(),v(14,hn,2,0,"p",55),n(15,"div",56),pe(16,_n,9,6,"article",57,St,!1,wn,1,1),r()()}if(l&2){let e=u(),t=u();o(),k("publication-liked",t.likedPublicationIds().has(e.id)),H("aria-pressed",t.likedPublicationIds().has(e.id)),o(),k("pi-heart",!t.likedPublicationIds().has(e.id))("pi-heart-fill",t.likedPublicationIds().has(e.id)),o(),y(" J\u2019aime (",e.like_count??0,")"),o(7),d("disabled",t.submittingComment()),o(3),d("loading",t.submittingComment()),o(),h(t.commentsLoading()?14:-1),o(2),me(t.comments())}}function kn(l,i){if(l&1&&(n(0,"article",12),v(1,fn,1,2,"img",40)(2,vn,2,0,"div",41),n(3,"div",42)(4,"p",43),s(5),r(),n(6,"h2",44),s(7),r(),n(8,"p",45),s(9),T(10,"date"),r(),m(11,"div",46)(12,"app-explain-simply",47),v(13,yn,19,12),r()()),l&2){let e=i,t=u();o(),h(e.image_url?1:2),o(4),_(e.category),o(2),_(e.title),o(2),Ne("Publication municipale \xB7 ",I(10,11,e.published_at,"d MMM y, HH:mm")," \xB7 ",e.view_count??0," vue",(e.view_count??0)>1?"s":""," \xB7 ",e.like_count??0," j\u2019aime"),o(2),d("innerHTML",e.content,U),o(),d("text",e.content)("subject",e.title),o(),h(t.isCitizen()?13:-1)}}function Cn(l,i){if(l&1){let e=w();n(0,"app-publication-editor",62),f("saved",function(a){g(e);let c=u();return q(c.save(a))})("cancelled",function(){g(e);let a=u();return q(a.editorVisible.set(!1))}),r()}if(l&2){let e=u();d("initial",e.editorInitial())("saving",e.saving())("saveError",e.saveError())}}var Ot=class l{live=x(pt);destroyRef=x(Ce);content=x(Ye);route=x(Qe);reads=x(Ke);auth=x(We);confirmation=x(be);messages=x(ge);expandedPublication=b(null);selectedPublication=b(null);comments=b([]);commentsLoading=b(!1);submittingComment=b(!1);likedPublicationIds=b(new Set);loading=b(!1);saving=b(!1);error=b(null);publications=b([]);selectedCategory=b(null);editorVisible=b(!1);editingId=b(null);editorInitial=b({});saveError=b(null);canManage=C(()=>this.auth.hasRole("admin","agent","manager"));isCitizen=C(()=>this.auth.hasRole("citizen"));categories=C(()=>[...new Set(this.publications().map(i=>i.category))].map(i=>({label:i,value:i})));visiblePublications=C(()=>this.publications().filter(i=>!this.selectedCategory()||i.category===this.selectedCategory()));ngOnInit(){this.route.queryParamMap.pipe(qe(this.destroyRef)).subscribe(i=>this.expandedPublication.set(i.get("publication"))),this.load(),this.live.watch(this.destroyRef,()=>this.load(),()=>!this.loading())}load(){if(this.loading())return;this.loading.set(!0),this.error.set(null),(this.canManage()?this.content.managedPublications():this.content.publications()).pipe(qe(this.destroyRef),V(()=>this.loading.set(!1))).subscribe({next:e=>this.publications.set(e),error:()=>this.error.set("Impossible de charger les publications. R\xE9essayez.")})}openPublication(i){this.expandedPublication.set(i.id),this.selectedPublication.set(i),this.reads.markRead(i.id),this.content.viewPublication(i.id).subscribe({next:e=>{this.replacePublication(e),this.selectedPublication.set(e)},error:()=>{}}),this.isCitizen()&&this.loadComments(i.id)}closePublication(){this.selectedPublication.set(null),this.comments.set([])}selectCategory(i){this.selectedCategory.set(i)}openCreate(){this.editingId.set(null),this.editorInitial.set({}),this.saveError.set(null),this.editorVisible.set(!0)}openEdit(i,e){e.stopPropagation(),this.editingId.set(i.id),this.editorInitial.set({title:i.title,category:i.category,summary:i.summary,content:i.content,coverUrl:i.image_url??"",publishedAt:new Date(i.published_at),publishImmediately:!1}),this.saveError.set(null),this.editorVisible.set(!0)}save(i){this.saving.set(!0),this.saveError.set(null);let e=this.editingId();(i.coverFile?this.content.uploadPublicationImage(i.coverFile).pipe(he(a=>a.url)):ve(i.coverUrl.trim()||null)).pipe(_e(a=>{let c={title:i.title,summary:i.summary,content:i.content,category:i.category,published_at:i.publishedAt.toISOString(),is_published:!0,image_url:a};return e?this.content.updatePublication(e,c):this.content.createPublication(c)}),V(()=>this.saving.set(!1))).subscribe({next:a=>{this.publications.update(c=>e?c.map(p=>p.id===a.id?a:p):[a,...c]),this.editorVisible.set(!1),this.messages.add({severity:"success",summary:e?"Publication modifi\xE9e":"Publication cr\xE9\xE9e",detail:"Les informations ont \xE9t\xE9 enregistr\xE9es."})},error:a=>{let c=a instanceof He&&typeof a.error?.detail=="string"?a.error.detail:null;this.saveError.set(c??"Enregistrement impossible. Veuillez r\xE9essayer.")}})}confirmDelete(i,e){e.stopPropagation(),this.confirmation.confirm({message:`Supprimer d\xE9finitivement \xAB ${i.title} \xBB ?`,header:"Supprimer la publication",acceptLabel:"Supprimer",rejectLabel:"Annuler",acceptButtonStyleClass:"p-button-danger",accept:()=>{this.content.deletePublication(i.id).subscribe({next:()=>{this.publications.update(t=>t.filter(a=>a.id!==i.id)),this.messages.add({severity:"success",summary:"Publication supprim\xE9e"})},error:()=>this.messages.add({severity:"error",summary:"Suppression impossible",detail:"Veuillez r\xE9essayer."})})}})}likePublication(i,e){e.stopPropagation(),this.content.likePublication(i.id).subscribe({next:t=>{this.publications.update(a=>a.map(c=>c.id===i.id?de(P({},c),{like_count:t.like_count}):c)),this.selectedPublication.update(a=>a?.id===i.id?de(P({},a),{like_count:t.like_count}):a),this.likedPublicationIds.update(a=>{let c=new Set(a);return t.liked?c.add(i.id):c.delete(i.id),c})},error:()=>this.messages.add({severity:"error",summary:"Action impossible",detail:"Veuillez r\xE9essayer."})})}addComment(i){let e=this.selectedPublication(),t=i.trim();!e||!t||this.submittingComment()||(this.submittingComment.set(!0),this.content.addPublicationComment(e.id,t).pipe(V(()=>this.submittingComment.set(!1))).subscribe({next:a=>this.comments.update(c=>[a,...c]),error:()=>this.messages.add({severity:"error",summary:"Commentaire non envoy\xE9",detail:"Veuillez r\xE9essayer."})}))}loadComments(i){this.commentsLoading.set(!0),this.content.publicationComments(i).pipe(V(()=>this.commentsLoading.set(!1))).subscribe({next:e=>this.comments.set(e),error:()=>this.messages.add({severity:"warn",summary:"Commentaires indisponibles",detail:"Ils pourront \xEAtre recharg\xE9s plus tard."})})}replacePublication(i){this.publications.update(e=>e.map(t=>t.id===i.id?i:t))}toLocalDateTime(i){let e=new Date(i);return e.setMinutes(e.getMinutes()-e.getTimezoneOffset()),e.toISOString().slice(0,16)}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=O({type:l,selectors:[["app-municipal-publications"]],features:[J([be,ge])],decls:22,vars:29,consts:[["comment",""],[1,"municipal-page"],[1,"publication-header"],[1,"intro"],["pButton","","type","button","icon","pi pi-plus","label","Nouvelle publication"],[1,"management-note"],["optionLabel","label","optionValue","value","placeholder","Toutes les cat\xE9gories","ariaLabel","Filtrer les publications par cat\xE9gorie",1,"publication-filter",3,"onChange","options","showClear"],["role","status"],["role","alert"],[1,"publication-list"],[1,"publication-card",3,"publication-draft"],[3,"visibleChange","visible","modal","draggable","resizable","showHeader","dismissableMask"],[1,"overflow-hidden","-m-4","bg-surface-0","dark:bg-surface-900"],[3,"visibleChange","visible","modal","draggable","resizable","showHeader","closeOnEscape","contentStyle"],[3,"initial","saving","saveError"],["pButton","","type","button","icon","pi pi-plus","label","Nouvelle publication",3,"click"],["aria-hidden","true",1,"pi","pi-shield"],["type","button",3,"click"],[1,"publication-card"],["type","button",1,"publication-summary",3,"click"],[1,"publication-image",3,"src","alt"],[1,"publication-image","publication-image-placeholder"],[1,"publication-details"],[1,"publication-title-row"],[1,"publication-title"],[1,"publication-status"],[1,"publication-meta"],[1,"publication-stats"],["aria-hidden","true",1,"pi","pi-eye"],["aria-hidden","true",1,"pi","pi-heart"],[1,"publication-excerpt"],[1,"publication-view"],[1,"publication-footer"],["type","button",1,"publication-like",3,"publication-liked"],["aria-label","Actions de gestion",1,"publication-actions"],["aria-hidden","true",1,"pi","pi-megaphone"],["type","button",1,"publication-like",3,"click"],["aria-hidden","true",1,"pi"],["pButton","","type","button","severity","secondary","size","small","icon","pi pi-pencil","label","Modifier",3,"click","text"],["pButton","","type","button","severity","danger","size","small","icon","pi pi-trash","label","Supprimer",3,"click","text"],[1,"block","h-56","w-full","object-cover","sm:h-72",3,"src","alt"],[1,"flex","h-40","items-center","justify-center","bg-primary-50","text-4xl","text-primary","dark:bg-primary-950"],[1,"p-5","sm:p-7"],[1,"m-0","text-sm","font-semibold","text-primary"],[1,"mb-2","mt-2","text-2xl","font-bold","text-surface-900","dark:text-surface-0"],[1,"mb-5","text-sm","text-surface-500"],[1,"m-0","whitespace-pre-line","leading-relaxed","text-surface-700","dark:text-surface-200","[&_p]:mb-3","[&_ul]:list-disc","[&_ul]:pl-6","[&_ol]:list-decimal","[&_ol]:pl-6","[&_a]:text-primary","[&_a]:underline",3,"innerHTML"],[1,"mt-4","block",3,"text","subject"],[1,"mt-6","border-t","border-surface-200","pt-4","dark:border-surface-700"],["aria-labelledby","comments-heading",1,"mt-5","border-t","border-surface-200","pt-5","dark:border-surface-700"],["id","comments-heading",1,"m-0","text-lg","font-semibold"],[1,"mt-3","flex","flex-col","gap-2",3,"ngSubmit"],["for","publication-comment",1,"sr-only"],["id","publication-comment","pTextarea","","rows","3","maxlength","1000","placeholder","Ajouter un commentaire",1,"w-full",3,"disabled"],["pButton","","type","submit","label","Publier le commentaire",3,"loading"],["role","status",1,"text-sm","text-surface-500"],[1,"mt-4","grid","gap-3"],[1,"rounded-lg","border","border-surface-200","p-3","dark:border-surface-700"],[1,"flex","flex-wrap","items-baseline","justify-between","gap-2"],[1,"text-xs","text-surface-500"],[1,"mb-0","mt-2","whitespace-pre-line","text-sm"],[1,"text-sm","text-surface-500"],[3,"saved","cancelled","initial","saving","saveError"]],template:function(e,t){if(e&1&&(n(0,"section",1),m(1,"p-toast")(2,"p-confirmDialog"),n(3,"header",2)(4,"div")(5,"h1"),s(6,"Publications"),r(),n(7,"p",3),s(8,"Annonces, changements de service et informations pratiques de votre ville."),r()(),v(9,rn,1,0,"button",4),r(),v(10,an,3,0,"p",5),n(11,"p-select",6),f("onChange",function(c){return t.selectCategory(c.value)}),r(),v(12,sn,2,0,"p",7),v(13,dn,4,1,"p",8),n(14,"div",9),pe(15,gn,27,16,"article",10,St,!1,qn,2,0,"p"),r()(),n(18,"p-dialog",11),f("visibleChange",function(c){return!c&&t.closePublication()}),v(19,kn,14,14,"article",12),r(),n(20,"p-dialog",13),f("visibleChange",function(c){return t.editorVisible.set(c)}),v(21,Cn,1,3,"app-publication-editor",14),r()),e&2){let a,c;o(9),h(t.canManage()?9:-1),o(),h(t.canManage()?10:-1),o(),d("options",t.categories())("showClear",!0),o(),h(t.loading()?12:-1),o(),h((a=t.error())?13:-1,a),o(2),me(t.visiblePublications()),o(3),B(S(26,nn)),d("visible",t.selectedPublication()!==null)("modal",!0)("draggable",!1)("resizable",!1)("showHeader",!1)("dismissableMask",!0),o(),h((c=t.selectedPublication())?19:-1,c),o(),B(S(27,on)),d("visible",t.editorVisible())("modal",!0)("draggable",!1)("resizable",!1)("showHeader",!1)("closeOnEscape",!t.saving())("contentStyle",S(28,ln)),o(),h(t.editorVisible()?21:-1)}},dependencies:[te,ee,X,Z,oe,dt,ft,qt,gt,bt,wt,se,ie,ne,re,le,ut,mt,W],styles:[".municipal-page[_ngcontent-%COMP%]{max-width:850px;margin:0 auto;padding:1rem}.eyebrow[_ngcontent-%COMP%]{color:var(--p-primary-color);font-weight:700;text-transform:uppercase;letter-spacing:.08em}.intro[_ngcontent-%COMP%]{color:var(--p-text-muted-color);margin-bottom:1.5rem}.publication-header[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:1.25rem}.publication-header[_ngcontent-%COMP%]   .intro[_ngcontent-%COMP%]{margin-bottom:0}.management-note[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.55rem;color:var(--p-text-muted-color);margin:0 0 1rem}.management-note[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--p-primary-color)}.publication-list[_ngcontent-%COMP%]{display:grid;gap:.7rem;margin-top:1rem}.content[_ngcontent-%COMP%]{color:var(--p-text-muted-color)}.publication-card[_ngcontent-%COMP%]{position:relative;border:1px solid var(--surface-border);border-radius:.6rem;background:var(--surface-card);overflow:hidden;transition:background-color .16s ease,border-color .16s ease,transform .16s ease}.publication-card[_ngcontent-%COMP%]:hover, .publication-card[_ngcontent-%COMP%]:focus-within{background:var(--surface-hover);border-color:var(--p-primary-color);transform:translateY(-1px)}.publication-summary[_ngcontent-%COMP%]{display:grid;grid-template-columns:2.75rem minmax(0,1fr) auto;align-items:center;gap:.8rem;text-align:left;width:100%;padding:.75rem;border:0;background:transparent;color:inherit;cursor:pointer;font:inherit}.publication-summary[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--p-primary-color);outline-offset:-3px}.publication-title[_ngcontent-%COMP%]{font-size:1rem;font-weight:700}.publication-title-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:.75rem}.publication-details[_ngcontent-%COMP%]{display:grid;min-width:0;gap:.25rem}.publication-image[_ngcontent-%COMP%]{width:2.75rem;height:2.75rem;border-radius:.35rem;object-fit:cover}.publication-image-placeholder[_ngcontent-%COMP%]{display:grid;place-items:center;background:color-mix(in srgb,var(--p-primary-color) 16%,var(--surface-card));color:var(--p-primary-color)}.publication-status[_ngcontent-%COMP%]{border-radius:999px;background:var(--p-orange-100);color:var(--p-orange-700);font-size:.8rem;font-weight:700;padding:.2rem .55rem;white-space:nowrap}.publication-draft[_ngcontent-%COMP%]{border-style:dashed}.publication-meta[_ngcontent-%COMP%]{font-size:.78rem;color:var(--p-text-muted-color)}.publication-stats[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;color:var(--p-text-muted-color);font-size:.78rem}.publication-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.25rem}.publication-excerpt[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.86rem}.publication-view[_ngcontent-%COMP%], .publication-like[_ngcontent-%COMP%]{border:1px solid var(--surface-border);border-radius:.35rem;padding:.35rem .6rem;background:transparent;color:var(--p-text-color);font:inherit;font-size:.78rem;white-space:nowrap}.publication-like[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.35rem;cursor:pointer}.publication-like[_ngcontent-%COMP%]:hover, .publication-like[_ngcontent-%COMP%]:focus-visible{color:var(--p-primary-color);border-color:var(--p-primary-color)}.publication-content[_ngcontent-%COMP%]{padding:0 1.5rem 1.5rem;white-space:pre-line;overflow-wrap:anywhere}.publication-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{border-top:1px solid var(--surface-border);padding-top:1rem}.publication-footer[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:.55rem .75rem;border-top:1px solid var(--surface-border)}.publication-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem}.publication-form[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.publication-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:grid;gap:.45rem;color:var(--p-text-color);font-weight:600}.publication-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not([type=checkbox]), .publication-form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{width:100%}.form-wide[_ngcontent-%COMP%]{grid-column:1/-1}.published-field[_ngcontent-%COMP%]{align-self:end;display:flex!important;align-items:center;min-height:2.5rem;gap:.5rem}.form-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:.75rem;margin-top:.5rem}@media(max-width:600px){.publication-header[_ngcontent-%COMP%]{flex-direction:column}.publication-form[_ngcontent-%COMP%]{grid-template-columns:1fr}.form-wide[_ngcontent-%COMP%]{grid-column:auto}.publication-actions[_ngcontent-%COMP%]{justify-content:flex-start}.publication-footer[_ngcontent-%COMP%]{align-items:flex-start;flex-wrap:wrap}.publication-summary[_ngcontent-%COMP%]{grid-template-columns:2.75rem minmax(0,1fr);padding-top:2.4rem}.publication-view[_ngcontent-%COMP%]{grid-column:2;justify-self:start}}"]})};export{Ot as MunicipalPublications};
