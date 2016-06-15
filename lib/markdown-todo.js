'use babel';

import MarkdownTodoView from './markdown-todo-view';
import { CompositeDisposable } from 'atom';

export default {

  markdownTodoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.markdownTodoView = new MarkdownTodoView(state.markdownTodoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.markdownTodoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'markdown-todo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.markdownTodoView.destroy();
  },

  serialize() {
    return {
      markdownTodoViewState: this.markdownTodoView.serialize()
    };
  },

  toggle() {
    console.log('MarkdownTodo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  toggleTodo() {

  }

};
