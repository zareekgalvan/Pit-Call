import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Requests } from '../../api/requests.js';

class ExpandedRequest extends Component {

    closeModal(){
        Session.set('showModal', false);
        Session.set('requestId', "");
    }

    componentDidUpdate(){
        if (this.props.request[0] != null) {
            var latitude = this.props.request[0]['latitude']
            latitude = latitude.substring(9, latitude.length - 1)

            var longitude = this.props.request[0]['longitude']
            longitude = longitude.substring(9, longitude.length - 1)

            this.context.map.setView([latitude, longitude], 5);

            //this.context.map.removeLayer(this.context.marker)
            this.context.marker = L.marker([latitude, longitude])
            this.context.map.addLayer(this.context.marker)

            this.context.map.invalidateSize()
        }
    }

    componentDidMount(){
        this.context.map = L.map('map').setView([0,0], 10);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	        maxZoom: 19,
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo( this.context.map );

        this.context.map.invalidateSize()
    }

    render() {
        //only show information if it is loaded
        if (this.props.request[0] != null) {
            console.log(this.props.request[0])
            return (
                <div id="requestModal" className="custom-modal" display="none" style={{overflow: scroll}}>
                    <div class="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span className="close" onClick={this.closeModal.bind(this)}>&times;</span>
                            </div>
                                <div className="col-md-6">
                                    <h1>Customer Name:</h1>
                                    <p>{this.props.request[0]['name']}</p>
                                    <h1>Phone:</h1>
                                    <p>{this.props.request[0]['phone']}</p>
                                    <h1>Email:</h1>
                                    <p>{this.props.request[0]['email']}</p>
                                </div>
                                <div className="col-md-6">
                                    <h1>Policy Number:</h1>
                                    <p>{this.props.request[0]['policyNumber']}</p>
                                    <h1>Car Brand:</h1>
                                    <p>{this.props.request[0]['carBrand']}</p>
                                    <h1>Car Model:</h1>
                                    <p>{this.props.request[0]['carModel']}</p>
                                    <h1>Notes:</h1>
                                    <p>{this.props.request[0]['notes']}</p>
                                </div>
                                <div id="map" className="map">hola</div>

                            <div className="modal-header">
                            </div>
                            <div className="modal-footer">
                                <span className="close" onClick={this.closeModal.bind(this)}>&times;</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div id="requestModal" className="modal" display="none" style={{overflow: scroll}}>
                    <div class="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span className="close" onClick={this.closeModal.bind(this)}>&times;</span>
                            </div>
                                <div className="col-md-6">
                                    <h1>Customer Name:</h1>
                                    <h1>Phone:</h1>
                                    <h1>Email:</h1>
                                </div>
                                <div className="col-md-6">
                                    <h1>Policy Number:</h1>
                                    <h1>Car Brand:</h1>
                                    <h1>Car Model:</h1>
                                    <h1>Notes:</h1>
                                </div>
                                <div id="map" className="map">hola</div>
                            <div className="modal-header">
                            </div>
                            <div className="modal-footer">
                                <span className="close" onClick={this.closeModal.bind(this)}>&times;</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

ExpandedRequest.propTypes = {
    request: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('requests');

  // show modal if showModal is true
  if (Session.get('showModal')) {
    $('#requestModal').show()
  } else {
    $('#requestModal').hide()
  }

  return {
    request: Requests.find({"_id" : Session.get('requestId')}).fetch()
  };
}, ExpandedRequest)

ExpandedRequest.contextTypes = {
  map: PropTypes.object,
  currentMarker: PropTypes.object
};