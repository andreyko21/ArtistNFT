import Header from './modules/profileHeader';
import $ from 'jquery';

const header = new Header();

class Chat {
  constructor() {
    this.usersListBlock = $('.chat-list__list-users');
    this.currentChat = $('.current-chat');
    this.currentChatBackButton = $('.current-chat__back-button');
    this.page = $('.page');
    this.BindEvents();
  }
  BindEvents() {
    this.usersListBlock.on('click', '.chat-list__user', () =>
      this.OpenMessage()
    );
    this.currentChatBackButton.click(() => this.CloseMessage());
  }
  OpenMessage() {
    this.currentChat.fadeIn(300, () => {
      this.currentChat.css('display', 'flex');
    });
    this.currentChat.addClass('current-chat_open');
    this.page.css('overflow-y', 'hidden');
  }
  CloseMessage() {
    this.currentChat.fadeOut(300, () => {
      this.currentChat.css('display', 'none');
    });
    this.currentChat.removeClass('current-chat_open');
    this.page.css('overflow-y', 'auto');
  }
}

const chat = new Chat();
