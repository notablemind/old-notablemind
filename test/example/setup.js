
var Note = require('note')
  , Manager = require('note-manager')
  , Tree = require('tree')

React.renderComponent(Note({}), document.getElementById('simple'))
React.renderComponent(Note({themeClass: 'simple-theme'}), document.getElementById('themed'))

function rid() {
  var chars = 'abcdef0123456789'
    , id = ''
  for (var i=0; i<5; i++) {
    id += chars[parseInt(Math.random()*chars.length)]
  }
  return id
}

function rTree(idx, depth, fixed) {
  if (depth <= 0) return
  var n = fixed || parseInt(Math.random() * 3) + 2
    , children = []
  for (var i=0; i<n; i++) {
    children.push({
      id: rid(), // idx + ':' + i,
      data: {
        type: 'normal',
        text: 'Name of ' + idx + ':' + i,
        open: true,
        tags: ['one']
      },
      children: rTree(idx + ':' + i, depth-1, fixed)
    })
  }
  return children
}

React.renderComponent(Tree({
  manager: new Manager({
    id: 0,
    data: {
      text: 'TestHead',
      tags: [],
      type: 'title'
    },
    children: rTree(0, 3)
  }), // big test is rTree(0, 3, 6)
  head: Note,
  headProps: {
    themeClass: 'simple-theme',
    keymap: {
      moveLeft: 'alt left',
      moveRight: 'alt right',
      moveDown: 'alt down',
      moveUp: 'alt up',

      newNode: 'return',
      newAfter: 'shift return',
      goDown: 'down',
      goUp: 'up',
    }
  },
  id: 0,
}), document.getElementById('tree'))

