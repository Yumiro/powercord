module.exports = {
  command: 'add',
  description: 'Create a tag',
  func: (args, settings) => {
    if (args.length < 2) {
      return {
        send: false,
        result: {
          type: 'rich',
          title: 'Missing required arguments',
          footer: { text: 'Refer to /help tag' }
        }
      };
    }

    const name = args.shift();
    if (settings.get(name)) {
      return {
        send: false,
        result: {
          type: 'rich',
          title: `Tag "${name}" already exists (use /tag update)`
        }
      };
    }

    settings.set(name, args.join(' '));

    return {
      send: false,
      result: {
        type: 'rich',
        title: 'Successfully created tag',
        color: 0x00FF00,
        fields: [ {
          name: 'Name',
          value: name,
          inline: false
        }, {
          name: 'Value',
          value: args.join(' '),
          inline: false
        } ]
      }
    };
  },
  autocomplete: (args) => {
    if (args[1] === void 0) {
      return {
        commands: [ { command: 'Enter a tag name...' } ]
      };
    }

    return {
      commands: [ {
        command: `Enter the content of "${args[0]}"...`,
        wildcard: true
      } ]
    };
  }
};
