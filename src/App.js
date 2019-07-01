import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import ImageLoader from "./ImageLoader";

class App extends React.Component {
  state = {
    showLoader: false
  };
  _crop() {
    // image in dataUrl
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <button className="btn btn-sm btn-primary px-4" onClick={() => this.setState({ showLoader: true })}>
          点击
        </button>
        {this.state.showLoader && <ImageLoader onClose={() => this.setState({ showLoader: false })} />}
      </div>
    );
  }
}

export default App;
