import React, { Component } from "react";

export class ChatState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typingUsers: [],
    };
  }

  handleTypingStart = (username) => {
    this.setState((prevState) => {
      if (!prevState.typingUsers.includes(username)) {
        return { typingUsers: [...prevState.typingUsers, username] };
      }
      return null;
    });
  };

  handleTypingStop = (username) => {
    this.setState((prevState) => ({
      typingUsers: prevState.typingUsers.filter((user) => user !== username),
    }));
  };

  addMessage = (message) => {
    this.setState((prevState) => ({
      messages: [
        ...prevState.messages,
        {
          id: Date.now(),
          text: message.text,
          author: message.author,
          timestamp: new Date(),
        },
      ],
    }));
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      if (Math.random() > 0.5) {
        this.handleTypingStart("Husam");

        setTimeout(() => {
          this.handleTypingStop("Husam");
          this.addMessage({
            text: `Hi Malek ${Math.floor(Math.random() * 1000)}`,
            author: "Husam",
          });
        }, 2000);
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return this.props.children({
      messages: this.state.messages,
      typingUsers: this.state.typingUsers,
      handleTypingStart: this.handleTypingStart,
      handleTypingStop: this.handleTypingStop,
      addMessage: this.addMessage,
    });
  }
}
