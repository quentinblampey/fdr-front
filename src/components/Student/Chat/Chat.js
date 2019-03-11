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
      emptyBodyForbidden:[1,3,5],
      loading: false,
      chat: [],
      isFinish: false,
      newMessage: '',
      currentQuestion: { answers: [] },
      error: false,
    };
  }

  updateScroll() {
    const element = document.getElementById('chatbox');
    element.scrollTop = element.scrollHeight;
  }

  componentDidMount() {
    var promise = new Promise((resolve) => {
      axios.get(`${url}/api/questions/`).then((r) => {
        if (r.data.length === 0) {
          axios.post(`${url}/api/file/newfile`).then(()=>{})
        }
        resolve();
      })
    });
    promise.then(()=> {
      axios.post(`${url}/api/questions/${this.props.match.params.id}`).then((r3) => {
        if (r3.data.question.body === '' || r3.data.question.body === undefined) {
          this.setState({
            chat: this.state.chat.concat([
              {
                message:
                                        "Je n'ai plus de questions à te poser pour le moment !",
                color: 1,
              },
            ]),
            isFinish: true,
          });
        } else {
          this.setState({
            chat: this.state.chat.concat([
              { message: r3.data.question.body, color: 1 },
            ]),
            currentQuestion: r3.data.question,
          });
        }
        this.updateScroll();
      });
    });
  }

    onChange = (e) => {
      const { state } = this;
      state[e.target.name] = e.target.value;
      this.setState(state);
      this.updateScroll();
    };

    updateUser = () => {
      axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
        axios.put(`${url}/api/users/endchat/${this.props.match.params.id}`, res);
      });
    }

    onSubmitButton = (e) => {
      let ans;
      ans = this.state.currentQuestion.answers[0];
      ans.body = this.state.newMessage;
      ans.detail = this.state.newMessage;
      this.onSubmit(ans, e);
    };

    sendAnswer = (answer) => {
      axios.post(`${url}/api/answers/${this.props.match.params.id}`, {
                answer,
                field: this.state.currentQuestion.field,
              })
              .then((res) => {
                axios.post(`${url}/api/questions/${this.props.match.params.id}`).then((res2) => {
                  if (res2.data.isFinish) {
                    this.setState({ isFinish: true });
                    this.updateUser();
                    this.updateScroll();
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

    onSubmit = (answer, e) => {
      if ( this.state.emptyBodyForbidden.includes(this.state.currentQuestion.idQ) && (answer.body==='')){
        if (!this.state.error){
          this.setState({
            chat: this.state.chat.concat({ message: "Merci de rentrer une réponse", color: 1 }),
            error: true
          }, () => { this.updateScroll() });
        }
      }
      else {
        var promiseScroll = new Promise((resolve) => {
          this.updateScroll();
          resolve();
        })
        var promise = new Promise((resolve) => {
          this.setState({error:false});
          this.setState({
            chat: this.state.chat.concat({ message: answer.body, color: 0 }),
            newMessage: '',
          });
          promiseScroll.then(()=> {
            if (answer.reaction !== '' && answer.reaction !== undefined) {
              this.setState({ loading: true });
              this.updateScroll();
              setTimeout(() => {
                this.setState({ loading: false });
                this.setState({
                  chat: this.state.chat.concat({ message: answer.reaction, color: 1 }),
                });
                this.updateScroll();
                resolve();
              }, 1000);
            } else {
              resolve();
            }
          })
        });
        promise.then(()=> { this.sendAnswer(answer)});
        }
      };

    handleKeyPress(target) {
      if (target.charCode === 13) {
        let ans;
        ans = this.state.currentQuestion.answers[0];
        ans.body = this.state.newMessage;
        ans.detail = this.state.newMessage;
        this.onSubmit(ans);
      }
    }

    render() {
      let userAnswer;

      if (this.state.loading) {
        userAnswer = <div />;
      } else if (this.state.isFinish) {
        userAnswer = (
          <div className="response-bar">
            <Link to={`/begin/${this.props.match.params.id}`}>
              <button className="choice"> Revenir à la page d'accueil </button>
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
              {this.state.currentQuestion.answers.map((a, i) => (
                <button
                  onClick={this.onSubmit.bind(this, a)}
                  className="choice"
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
                onKeyPress={this.handleKeyPress.bind(this)}
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
          <div className="fixed-top">
            <Link to={`/begin/${this.props.match.params.id}`}>
              <button className="arrow"> Retour
              </button>
            </Link>
          </div>
          <div className="chatbox" id="chatbox">
            {this.state.chat.map((m, i) => (
              <MessageChat key={i} message={m.message} color={1 - m.color} />
            ))}
            <div className="loading">
              <Loading loading={this.state.loading} />
            </div>
          </div>
          <div className="fixed-bottom">{userAnswer}</div>
        </div>
      );
    }
}

export default Chat;
