import React, { Component } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import "./Modal.css";

/**
 * Modal
 * @showSearchBar bool
 * @onSearch (keywords)
 * @position right || left || center
 * @getHeight str
 * @getWidth str
 * @onClose close function
 * @title title
 * @zIndex adjust zIndex
 * @className (headerContainerClassName, headerTitleClassName)
 */
class Modal extends Component {
  targetElement = null;
  componentDidMount() {
    // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
    // this.targetElement = document.querySelector("#onlyScroll");
    // disableBodyScroll(this.targetElement);
  }
  componentWillUnmount() {
    // 5. Useful if we have called disableBodyScroll for multiple target elements,
    // and we just want a kill-switch to undo all that.
    // OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
    // clicks a link which takes him/her to a different page within the app.
    clearAllBodyScrollLocks();
  }

  handleClose = e => {
    if (e) e.preventDefault();
    if (this.props.onClose) this.props.onClose();
  };

  handleSearch = keywords => this.setState({ keywords });

  render() {
    let curr = "center";
    if (this.props.position === "right") {
      curr = "modal-right";
    } else if (this.props.position === "left") {
      curr = "modal-left";
    }
    const widthHeight = {
      maxWidth: this.props.getWidth,
      maxHeight: this.props.getHeight,
      minWidth: "320px",
      minHeight: this.props.getHeight
    };

    return (
      <main className="modal-over-lay" onClick={this.handleExit} style={{ zIndex: `${this.props.zIndex || 9}` }}>
        <section className={`${curr} ${this.props.className} rounded`} id="onlyScroll" style={widthHeight}>
          <div
            className={`sticky-top w-100 md-2 p-3 border-bottom shadow-sm ${
              this.props.headerContainerClassName ? this.props.headerContainerClassName : "bg-white"
            }`}
          >
            <header className={`d-flex justify-content-between align-items-center`}>
              <h5 className={this.props.headerTitleClassName}>{this.props.title}</h5>
              <button onClick={() => this.handleClose()}>close</button>
              {/* <ImageButton
                // image={`${process.env.PUBLIC_URL}/img/forget-password@2x.png`}
                icon={<i className="fas fa-times" />}
                onClick={() => this.handleClose()}
                outerClassName="text-dark"
              /> */}
            </header>
            {/* {this.props.showSearchBar && (
              <section className="mt-2 border">
                <SearchButton onSubmit={this.handleSearch} name="search" placeholder="search for ..." />
              </section>
            )} */}
          </div>
          <div>{this.props.children}</div>
        </section>
      </main>
    );
  }
}

export default Modal;
