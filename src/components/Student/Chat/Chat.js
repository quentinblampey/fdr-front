import React, { Component } from 'react';
import axios from 'axios';
import MessageChat from './MessageChat';
import './Chat.scss';
import Loading from './Loading';
import url from '../../../config';
import { Link } from 'react-router-dom';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      chat: [],
      chats: [],
      isFinish: false,
      user: '',
      newMessage: '',
      currentQuestion: { answers: [] },
    };
  }

  updateScroll() {
    const element = document.getElementById('chatbox');
    element.scrollTop = element.scrollHeight;
  }

  componentDidMount() {
    axios.post(`${url}/api/questions/${this.props.match.params.id}`).then((r) => {
      this.setState({
        user: r.data.user,
        chat: this.state.chat.concat([{ message: r.data.question.body, color: 1 }]),
        currentQuestion: r.data.question,
      });
    });
    setTimeout(this.updateScroll, 10);
  }

    onChange = (e) => {
      const { state } = this;
      state[e.target.name] = e.target.value;
      this.setState(state);
    };

    updateUser = () => {
      axios.put(`${url}/api/users/endchat/${this.state.user._id}`, this.state.user)
    }

    onSubmitButton = (e) => {
      let ans;
      ans = this.state.currentQuestion.answers[0];
      ans.body = this.state.newMessage;
      ans.detail = this.state.newMessage;
      this.onSubmit(ans, e);
    };

    onSubmit = (answer, e) => {
      this.setState({
        chat: this.state.chat.concat({ message: answer.body, color: 0 }),
        newMessage: '',
      });
      this.updateScroll();
      if (answer.reaction !== '') {
        this.setState({ loading: true });
        this.updateScroll();
        setTimeout(() => {
          this.setState({ loading: false });
          this.setState({
            chat: this.state.chat.concat({ message: answer.reaction, color: 1 }),
          });
          this.updateScroll();
          axios
            .post(`${url}/api/answers/${this.state.user._id}`, {
              answer,
              field: this.state.currentQuestion.field,
            })
            .then((res) => {
              axios.post(`${url}/api/questions/${this.state.user._id}`).then((res2) => {
                if (res2.data.isFinish) {
                  this.setState({ isFinish: true });
                  this.updateUser();
                } else {
                  this.setState({ loading: true });
                  this.updateScroll();
                  setTimeout(() => {
                    this.setState({ loading: false });
                    this.setState({
                      user: res2.data.user,
                      chat: this.state.chat.concat([
                        { message: res2.data.question.body, color: 1 },
                      ]),
                      currentQuestion: res2.data.question,
                    });
                    this.updateScroll();
                  }, 1000);
                }
              });
            });
        }, 1000);
      } else {
        axios
          .post(`${url}/api/answers/${this.state.user._id}`, {
            answer,
            field: this.state.currentQuestion.field,
          })
          .then((res) => {
            axios.post(`${url}/api/questions/${this.state.user._id}`).then((res2) => {
              if (res2.data.isFinish) {
                this.setState({ isFinish: true });
                this.updateUser();
              } else {
                this.setState({ loading: true });
                this.updateScroll();
                setTimeout(() => {
                  this.setState({ loading: false });
                  this.setState({
                    user: res2.data.user,
                    chat: this.state.chat.concat([
                      { message: res2.data.question.body, color: 1 },
                    ]),
                    currentQuestion: res2.data.question,
                  });
                  this.updateScroll();
                }, 1000);
              }
            });
          });
      }
    };

    render() {
      let userAnswer;

      if (this.state.loading) {
        userAnswer = <div />;
      } else if (this.state.isFinish) {
        userAnswer = (
          <div>
            <Link to={`/begin/${this.props.match.params.id}`}>
              <button className="btn btn-primary my-2"> Revenir à la page d'acceuil </button>
            </Link>
          </div>
        );
      } else if (
        (typeof this.state.currentQuestion.answers !== 'undefined')
            & !this.state.currentQuestion.textArea
      ) {
        userAnswer = (
          <div className="response-bar">
            <div id="choice-buttons">
              {this.state.currentQuestion.answers.map((a,i) => (
                <button
                  onClick={this.onSubmit.bind(this, a)}
                  className="btn btn-outline-primary"
                  key={i}
                >
                  {a.body}
                </button>
              ))}
            </div>
          </div>
        );
      } else {
        userAnswer = (
          <div className="response-bar">
            <div className="send-bar">
              <input
                type="text"
                className="form-control"
                name="newMessage"
                value={this.state.newMessage}
                onChange={this.onChange}
                placeholder="..."
              />
              <div className="send-box">
                <button
                  type="submit"
                  onClick={this.onSubmitButton.bind(this)}
                  className="btn btn-default send"
                >
                                +
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="text-center">
          <div className="chatbox" id="chatbox">
            {this.state.chat.map((m, i) => (
              <MessageChat key={i} message={m.message} color={1 - m.color} />
            ))}
            <div className="loading">
              <Loading loading={this.state.loading} />
            </div>
          </div>
          {userAnswer}
        </div>
      );
    }
}

export default Chat;
