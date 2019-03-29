import React, { Component } from 'react';
import axios from 'axios';
import MessageChat from './MessageChat';
import './Chat.scss';
import Loading from './Loading';
import url from '../../../../config';
import { Link } from 'react-router-dom';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      emptyBodyForbidden:[1,3,5], //This variable hardcodes the questions for which the user can’t post an empty body answer
      numberMandatory:[151, 152, 153], //This variable hardcodes the questions for which the user can only answer a number
      chat: [], //This list contains all the messages to be displayed
      isFinish: false, //Boolean that is True when the chat is finished (ie no more q to ask)
      newMessage: '', //This variable stores the current content of the input
      currentQuestion: { answers: [] }, //This variable stores the current question
      error: false, //This variable is True if there is an error (ie empty body or not a number when required)
    };
  }

  /*
    Scroll the chat to the bottom so the user sees the last messages.
  */

  updateScroll() {
    const element = document.getElementById('chatbox');
    element.scrollTop = element.scrollHeight;
  }
  /*
    Initializes the chat.
  */
  componentDidMount() {
    var promise = new Promise((resolve) => {
      axios.get(`${url}/api/questions/`).then((r) => {
        if (r.data.length === 0) { // If the questions are not imported yet.
          axios.post(`${url}/api/file/newfile`).then(()=>{})
        }
        resolve();
      })
    });
    promise.then(()=> {
      axios.post(`${url}/api/questions/${this.props.match.params.id}`).then((r3) => { // There is no more questions to ask.
        if (r3.data.question.body === '' || r3.data.question.body === undefined) {
          this.setState({
            chat: this.state.chat.concat([
              {
                message:
                                        "Je n'ai plus de questions à te poser pour le moment !",
                color: 1,
              },
            ]),
            isFinish: true, loading: false
          });

        } else {
          if(r3.data.question.idQ >1){ // The user come back.
              this.setState({
                chat: this.state.chat.concat([
                  {
                    message:
                          "Coucou, je suis contente de te revoir !🙂",
                    color: 1,
                  },
                ]),
              });
          }
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

    /*
      When a user is writing, update the state and scroll.
    */

    onChange = (e) => {
      const { state } = this;
      state[e.target.name] = e.target.value;
      this.setState(state);
      this.updateScroll();
    };

    /*
      Update stats of a user at the end of a chat.
    */

    updateUser = () => {
      axios.get(`${url}/api/users/getid/${this.props.match.params.id}`).then((res) => {
        axios.put(`${url}/api/users/endchat/${this.props.match.params.id}`, res);
      });
    }

    /*
      When a user send a personalized answer : it get his message and call 'onSubmit' method.
    */

    onSubmitButton = (e) => {
      let ans;
      ans = this.state.currentQuestion.answers[0];
      ans.body = this.state.newMessage;
      ans.detail = this.state.newMessage;
      this.onSubmit(ans, e);
    };

    /*
      Send the answer of the user to the back so the user is updated and the chatbot know the next question to ask.
    */
    sendAnswer = (answer) => {
      axios.post(`${url}/api/answers/${this.props.match.params.id}`, { // Post the answer
                answer,
                field: this.state.currentQuestion.field,
              })
              .then((res) => {
                axios.post(`${url}/api/questions/${this.props.match.params.id}`).then((res2) => { // Get the new question
                  if (res2.data.isFinish) { // If the chat is finish
                    this.setState({ isFinish: true, loading: false });
                    this.updateUser();
                    this.updateScroll();
                  } else {
                    this.updateScroll();
                    setTimeout(() => { // Wait 1 second before the chatbot answers
                      this.setState({ loading: false }); // Display a loader
                      this.setState({
                        user: res2.data.user,
                        chat: this.state.chat.concat([
                          { message: res2.data.question.body, color: 1 },
                        ]),
                        currentQuestion: res2.data.question,
                      }); // Update tehe chat
                      this.updateScroll();
                    }, 1000);
                  }
                });
              });
    }
    /*
      1. Check if the answer is legal.
      2. Choose the right bot reaction.
      3. Use sendAnswer method.
    */
    onSubmit = (answer, e) => {
      if (answer.body==='' && this.state.emptyBodyForbidden.includes(this.state.currentQuestion.idQ)){ // (1) : no empty body.
          if (!this.state.error){
            this.setState({
              chat: this.state.chat.concat({ message: "Merci de rentrer une réponse", color: 1 }),
              error: true
            }, () => { this.updateScroll() });
          }
      }else if (this.state.numberMandatory.includes(this.state.currentQuestion.idQ) && (isNaN(Number(answer.body)))) { // (1) : number required.
        this.setState({newMessage:'', chat: this.state.chat.concat({ message: "Merci de rentrer un nombre valide entre 0 et 100", color: 1 })}, () => { this.updateScroll() });
      }else {
        var promiseScroll = new Promise((resolve) => {
          this.updateScroll();
          resolve();
        })
        var promise = new Promise((resolve) => {
          this.setState({error:false,
            chat: this.state.chat.concat({ message: answer.body, color: 0 }),
            newMessage: '',
          });
          promiseScroll.then(()=> {
            let r; // The purpose of r is to store the reaction of the bot (for special cases only).
            if (this.state.currentQuestion.textArea && !([151, 152, 153].includes(this.state.currentQuestion.idQ))){
              if (answer.body===''){
                r = { message: "Ok, tu veux pas me répondre mais c'est pas grave !", color: 1 };
              }else{
                r = { message: "Merci pour ta réponse !😘", color: 1 };
              }
            }else{
              r = { message: answer.reaction, color: 1 };
            }
            this.setState({ loading: true });
            if ((answer.reaction !== '' && answer.reaction !== undefined) || (this.state.currentQuestion.textArea && r.message)){
              this.updateScroll();
              setTimeout(() => {
                this.setState({
                  chat: this.state.chat.concat(r),
                });
                this.updateScroll();
                resolve();
              }, 1000);
            } else {
              resolve();
            }
          })
        });
        promise.then(()=> { this.sendAnswer(answer)}); // Finally send the answer.
        }
      };

    /*
      When a user press 'Enter', submit his answer.
    */

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
                autoFocus
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
