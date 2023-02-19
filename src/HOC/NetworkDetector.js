import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi} from '@fortawesome/free-solid-svg-icons';
import './networkDetector.scss'
library.add(faWifi);
export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
	  navigator.onLine? document.body.classList.remove("offline"):document.body.classList.add("offline")
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
              })
            .then(() => {
              clearInterval(webPing)
            }).catch(() => {
				this.setState({ isDisconnected: true });
 return clearInterval(webPing)				
				})
          }, 2000);
        return;
      }
	
      return this.setState({ isDisconnected: true });
		
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <div>
          { isDisconnected && (<div className="internet-error">
				
              <p> <FontAwesomeIcon icon={faWifi} /><br/> Internet connection lost<br/><br/>
			  <button className="btn btn-primary" onClick={()=>window.location.reload()}>Retry</button>
			  
			  </p>
            </div>)
          }
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  return NetworkDetector;
}