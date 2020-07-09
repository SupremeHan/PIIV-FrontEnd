import React from 'react';
import './SeatPicker.css';

class SeatPicker extends React.Component {

    constructor() {
        super();
          this.state = {
          seat: [
            '1','2','3',
            '4','5','6',
            '7','8','9',
            '10','11','12',
            '13','14','15'
          ],
          seatAvailable: [
            '1','2','3',
            '4','5','6',
            '7','8','9',
            '10','11','12',
            '13','14','15'
          ],
          seatReserved: []
        }
      }
      
      onClickData(seat) {
        if(this.state.seatReserved.indexOf(seat) > -1 ) {
          this.setState({
            seatAvailable: this.state.seatAvailable.concat(seat),
            seatReserved: this.state.seatReserved.filter(res => res != seat)
          })
        } else {
          this.setState({
            seatReserved: this.state.seatReserved.concat(seat),
            seatAvailable: this.state.seatAvailable.filter(res => res != seat)
          })
        }
      }
      
      render() {
        return (
          <div>
           
            <DrawGrid 
              seat = { this.state.seat }
              available = { this.state.seatAvailable }
              reserved = { this.state.seatReserved }
              onClickData = { this.onClickData.bind(this) }
              />
          </div>
        )
      }
    }
    
    class DrawGrid extends React.Component {
      render() {
        return (
           <div className="container seatpick">
            <h2></h2>
            <table className="grid">
              <tbody>
                  <tr>
                    { this.props.seat.map( row =>
                      <td 
                        className={this.props.reserved.indexOf(row) > -1? 'reserved': 'available'}
                        key={row} onClick = {e => this.onClickSeat(row)}>{row} </td>) }
                  </tr>
              </tbody>
            </table>
            
            <AvailableList available = { this.props.available } />
            <ReservedList reserved = { this.props.reserved } />
           </div>
        )
      }
      
      onClickSeat(seat) {
        this.props.onClickData(seat);
      }
    }
    
    class AvailableList extends React.Component {
      render() {
        const seatCount = this.props.available.length;
        return(
          <div className="left">
            <h4>Slobodna mesta: ({seatCount == 0? 'No seats available' : seatCount})</h4>
            <div className="row seat">
              {this.props.available.map( res => <p key={res} >{res}</p> )}
            </div>
          </div>
        )
      }
    }
    
    class ReservedList extends React.Component {
      render() {
        return(
          <div className="right">
            <h4>Rezervisana mesta: ({this.props.reserved.length})</h4>
            <div className="row seat1">
              { this.props.reserved.map(res => <p key={res} >{res}</p>) }
            </div>
          </div>
        )
      }
    } 

export default SeatPicker;