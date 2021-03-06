// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Vdom = require("./vdom.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");

function batch(cmds) {
  return /* Batch */Block.__(1, [cmds]);
}

function call(call$1) {
  return /* EnqueueCall */Block.__(2, [call$1]);
}

function fnMsg(fnMsg$1) {
  return /* EnqueueCall */Block.__(2, [(function (callbacks) {
                return Curry._1(callbacks.contents.enqueue, Curry._1(fnMsg$1, /* () */0));
              })]);
}

function msg(msg$1) {
  return /* EnqueueCall */Block.__(2, [(function (callbacks) {
                return Curry._1(callbacks.contents.enqueue, msg$1);
              })]);
}

function run(_callbacks, _param) {
  while(true) {
    var param = _param;
    var callbacks = _callbacks;
    if (typeof param === "number") {
      return /* () */0;
    } else {
      switch (param.tag | 0) {
        case /* Mapper */0 :
            var subCallbacks = Curry._1(param[0], callbacks);
            _param = param[1];
            _callbacks = subCallbacks;
            continue ;
        case /* Batch */1 :
            return List.fold_left((function(callbacks){
                      return function (param, cmd) {
                        return run(callbacks, cmd);
                      }
                      }(callbacks)), /* () */0, param[0]);
        case /* EnqueueCall */2 :
            return Curry._1(param[0], callbacks);
        
      }
    }
  };
}

function map(func, cmd) {
  var mapper = function (param) {
    return Vdom.wrapCallbacks(func, param);
  };
  return /* Mapper */Block.__(0, [
            mapper,
            cmd
          ]);
}

var none = /* NoCmd */0;

exports.none = none;
exports.batch = batch;
exports.call = call;
exports.fnMsg = fnMsg;
exports.msg = msg;
exports.run = run;
exports.map = map;
/* No side effect */
