module.exports = function(RED) {
  "use strict";

  function ToggleNode(config) {
    RED.nodes.createNode(this, config);
    this.open = false;

    var node = this;

    node.on("input", function(msg) {
      if (msg.topic === "toggle") {
        switch (msg.payload) {
          case true:
            node.open = true;
            node.status({ fill: "green", shape: "dot", text: "on" });
            break;
          case false:
            node.open = false;
            node.status({ fill: "grey", shape: "dot", text: "off" });
            break;
        }
      } else if (node.open) {
        node.send(msg);
      }
    });

    node.status({ fill: "grey", shape: "dot", text: "off" });
  }

  RED.nodes.registerType("toggle", ToggleNode);
}
