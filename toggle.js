module.exports = function(RED) {
  "use strict";

  function ToggleNode(config) {
    RED.nodes.createNode(this, config);
    this.open = config.initial;

    var node = this;

    node.on("input", function(msg) {
      if (msg.topic === "toggle") {
        msg.payload ? toggleOn() : toggleOff();
      } else if (node.open) {
        node.send(msg);
      }
    });

    function toggleOn() {
      node.open = true;
      node.status({ fill: "green", shape: "dot", text: "on" });
    }

    function toggleOff() {
      node.open = false;
      node.status({ fill: "grey", shape: "dot", text: "off" });
    }

    node.open ? toggleOn() : toggleOff();
  }

  RED.nodes.registerType("toggle", ToggleNode);
}
