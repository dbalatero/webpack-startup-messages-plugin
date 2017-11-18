var colors = require('colors/safe');

function WebpackStartupMessagesPlugin(options) {
  this.messages = options.messages || [];
  this.notified = false;

  return this;
}

WebpackStartupMessagesPlugin.prototype.apply = function(compiler) {
  var notify = function(_, callback) {
    if (!this.notified) {
      this.messages.forEach(function(message) {
        var text = message.text;

        if (message.colors) {
          colorStyles = colors;

          message.colors.forEach(function(colorStyle) {
            colorStyles = colorStyles[colorStyle];
          });

          text = colorStyles(text);
        }

        console.log(text);
      });

      this.notified = true
    }

    callback()
  }.bind(this)

  compiler.plugin('run', notify)
  compiler.plugin('watch-run', notify)
}

module.exports = WebpackStartupMessagesPlugin;
