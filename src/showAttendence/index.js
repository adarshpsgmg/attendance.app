import React from 'react'
import * as css from './style.css'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import * as style from './../../node_modules/react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

class ShowAttendence extends React.Component {
    constructor(props, state) {
        super();
        this.state = {
            startDate: moment(),
            endDate: moment(),
            name: "",
            loaderStyle: { display: "none" }
        }
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.printReport = this.printReport.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
    }

    handleChange(ref) {
        let startDate = ref.startDate
        let endDate = ref.endDate

        if (startDate.isAfter(endDate)) {
            let temp = startDate
            startDate = endDate
            endDate = temp
        }

        this.setState({
            startDate: startDate,
            endDate: endDate
        });
    }

    nameHandler(e) {
        this.setState({ name: e.target.value })
    }

    handleChangeStart(startDate) {
        this.handleChange({ startDate: startDate, endDate: this.state.endDate })
    }

    handleChangeEnd(endDate) {
        this.handleChange({ endDate: endDate, startDate: this.state.startDate })
    }

    printReport() {
        var s = moment(this.state.startDate).format('MM/DD/YYYY');
        var e = moment(this.state.endDate).format('MM/DD/YYYY');
        window.open(`http://localhost:34836/get-all?startDate=${s}&endDate=${e}` +
            `&name=${this.state.name}`, '_blank');
    }

    printReportDetailed() {
        var s = moment(this.state.startDate).format('MM/DD/YYYY');
        var e = moment(this.state.endDate).format('MM/DD/YYYY');
        window.open(`http://localhost:34836/get-all-detailed?startDate=${s}&endDate=${e}` +
            `&name=${this.state.name}`, '_blank');
    }

    render() {
        return (
            <div>
                {/*<div className="header">
                    <img className="logo" src='https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAO1AAAAJGJkNzUxYTU4LTAyOWMtNGM5ZC05MzdlLWZhZTAzOGE2NzU0MA.png' />
                </div>*/}
                <div className="header" style={{ "marginTop": "12%" }}>
                    <img className="logo" src='http://www.hermesvirtualtour.com/img/loadingVideo.gif' />
                </div>
                {
                    (this.state.loaderStyle.display === "none") &&
                    <div className="wrapper" >
                        <div className="row1">
                            <h1>Attendance Report</h1>
                            <div className="date-range-picker">
                                <div className="coln-1">
                                    <h2>From</h2>
                                    <DatePicker dateFormat="MMM DD YYYY"
                                        selected={this.state.startDate}
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onChange={this.handleChangeStart} />
                                </div>
                                <div className="coln-2">
                                    <h2>Employee Name</h2>
                                    <input type="text" onChange={this.nameHandler} />
                                </div>
                                <div className="coln-1">
                                    <h2>To</h2>
                                    <DatePicker dateFormat="MMM DD YYYY"
                                        selected={this.state.endDate}
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onChange={this.handleChangeEnd} />
                                </div>
                            </div>
                        </div>
                        <div className="row2">
                            <div className="button-wrap">
                                <button onClick={this.printReport}>Presence</button>
                            </div>
                            <div className="button-wrap">
                                <button onClick={this.printReportDetailed}>In-Out</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default ShowAttendence