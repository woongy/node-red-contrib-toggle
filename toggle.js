module.exports = function(RED) {
  "use strict";

  function ToggleNode(config) {
    RED.nodes.createNode(this, config);
    this.open = config.initial;
    this.duration = Number(config.duration);
    this.timeout = null;

    var node = this;

    node.on("input", function(msg) {
      if (msg.topic === "toggle") {
        msg.payload ? toggleOn() : toggleOff();
      } else if (node.open) {
        node.send(msg);
      }
    });

    node.on("close", function() {
      if (node.timeout) {
        clearTimeout(node.timeout);
        delete node.timeout;
      }
    })

    function toggleOn() {
      node.open = true;
      node.status({ fill: "green", shape: "dot", text: "on" });
      if (node.duration && !node.timeout) {
        node.timeout = setTimeout(toggleOff, node.duration * 1000);
      }
    }

    function toggleOff() {
      node.open = false;
      if (node.timeout) {
        clearTimeout(node.timeout);
        delete node.timeout;
      }
      node.status({ fill: "grey", shape: "dot", text: "off" });
    }

    node.open ? toggleOn() : toggleOff();
  }

  RED.nodes.registerType("toggle", ToggleNode);
}
