import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import keys from "../../config/keys";


class About extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.closeModal();
  }



  render() {

    return (
      <>
        <div className="close-modal" onClick={this.handleClose}>
          <i className="fas fa-times"></i>
        </div>
        <div className="about-heading">
          <h3 className="about-title">About the Team</h3>
        </div>

        <section className="about-container">
          <ul className="about-list">
            <li key="1" className="about-teammember">
              <span>Mannan Kasliwal</span>
              <div className="about-links">
                <a
                  href="https://www.linkedin.com/in/mannank/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>{" "}
                /{" "}
                <a
                  href="https://github.com/MannanK"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>{" "}
                /{" "}
                <a
                  href="https://mannank.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
              </div>
            </li>

            <li key="2" className="about-teammember">
              <span>Michael Shen</span>
              <div className="about-links">
                <a
                  href="https://www.linkedin.com/in/mike-shen/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>{" "}
                /{" "}
                <a
                  href="https://github.com/imshentastic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>{" "}
                /{" "}
                <a
                  href="https://michaelshen.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
              </div>
            </li>

            <li key="3" className="about-teammember">
              <span>Brandon Chung</span>
              <div className="about-links">
                <a
                  href="https://www.linkedin.com/in/bchung014/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>{" "}
                /{" "}
                <a
                  href="https://github.com/bchung014"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>{" "}
                /{" "}
                <a
                  href="https://bchung014.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
              </div>
            </li>

            <li key="4" className="about-teammember">
              <span>Sean Woodruff</span>
              <div className="about-links">
                <a
                  href="https://www.linkedin.com/in/seanswoodruff/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>{" "}
                /{" "}
                <a
                  href="https://github.com/sswoodruff89"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>{" "}
                /{" "}
                <a
                  href="https://sswoodruff89.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
              </div>
            </li>
          </ul>
          <div className="about-project">
            The app was made using the MERN stack and is meant to be used as a
            mobile web app first. The API we are currently querying for movie
            information is TMDb. In the current version of the app,
            recommendations are provided based on your most recently watched
            interest, and media is limited to movies. In the future, UpNext will
            take into account all of your interests and provide aggregate
            recommendations, with media types being expanded to movies, shows,
            games, and music.
          </div>
          <div className="project-link">
            <a
              href="https://github.com/MannanK/UpNext"
              target="_blank"
              rel="noopener noreferrer"
            >
              --UpNext Repo Link--
            </a>
          </div>
        </section>
      </>
    );
  }
}



export default connect(null, null)(About);
