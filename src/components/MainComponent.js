import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import _ from 'lodash';

const moment = extendMoment(Moment);

const Months = moment.months();
const WeekDays = [
    { name: 'SUN', id: '0', key: 'sun' },
    { name: 'MON', id: '1', key: 'mon' },
    { name: 'TUE', id: '2', key: 'tue' },
    { name: 'WED', id: '3', key: 'wed' },
    { name: 'THU', id: '4', key: 'thur' },
    { name: 'FRI', id: '5', key: 'fri' },
    { name: 'SAT', id: '6', key: 'sat' },
]

const Day = ({ day, month, year }) => (
    <div className="">
        <div class="">
            <div className="m-0 p-1" title={`${day}-${month}-${year}`}>
                <div className="border border-primary rounded day">
                    {day}
                </div>
            </div>
        </div>
    </div>
);


const SplitFields = (dateStr) => {
    let str = dateStr.split('-');
    return {
        day: str[0],
        month: str[1],
        year: str[2]
    }
}

const Week = ({ week }) => {
    return (
        <div className="">
            {
                Boolean(week.length) &&
                week.map((dayObj, index) => {
                    const { day, month, year } = SplitFields(dayObj.dateStr);
                    return (
                        <Day
                            key={`${day}-${index}`}
                            day={day}
                            year={year}
                            month={month}
                        />
                    );
                })
            }
        </div>
    );
}

const getWeeks = ({ currentDate: date, currentMonth: month, currentYear: year }) => {
    let momentObj = moment(new Date(year, month, date));
    let monthStartDay = moment(new Date(year, month, 1)).day();
    // 0-sun 1 mon 2 tue
    let daysFilled = 0;
    let weeksList = [];
    if (monthStartDay !== 0) {
        for (let i = monthStartDay; i > 0; i--) {
            daysFilled++;
            let momentStart = moment(new Date(year, month, 1));
            let dateStr = momentStart.subtract(i, 'day').format('DD-MM-YYYY');
            weeksList.push({ dateStr, events: [] });
        }
    }
    for (let i = 0; (daysFilled + i) < 35; i++) {
        let momentStart = moment(new Date(year, month, 1));
        let dateStr = momentStart.add(i, 'day').format('DD-MM-YYYY');
        weeksList.push({ dateStr, events: [] });
    }
    const weeks = _.chunk(weeksList, 7);

    return weeks;
}

class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.moment = moment();
        this.state = {
            currentYear: this.moment.year(),
            currentMonth: this.moment.month(),
            currentDate: this.moment.date(),
            // currentFocus:
        }
    }


    leftKeyHandler = () => {
        const { currentMonth } = this.state;

        if (currentMonth === 0) {
            this.setState((prevState) => ({
                currentMonth: 11,
                currentYear: prevState.currentYear - 1
            }))
            return;
        }
        this.setState((prevState) => ({ currentMonth: prevState.currentMonth - 1 }));
    }

    rightKeyHandler = () => {
        const { currentMonth } = this.state;

        if (currentMonth === 11) {
            this.setState((prevState) => ({
                currentMonth: 0,
                currentYear: prevState.currentYear + 1
            }))
            return;
        }
        this.setState((prevState) => ({ currentMonth: prevState.currentMonth + 1 }));
    }

    arrowHandler = (e) => {
        if (e.keyCode === 37) { // keyleft
            this.leftKeyHandler();
            return;
        }
        if (e.keyCode === 39) { //key right
            this.rightKeyHandler();
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.arrowHandler);
    }

    render() {
        const { currentDate, currentMonth, currentYear } = this.state;

        const weeks = getWeeks({ currentDate, currentMonth, currentYear });

        let monthName = Months[currentMonth];
        return (
            <div>
                <div className="p-3">Current Year :{currentYear}</div>
                <div className="month-block-header">
                    <div  >
                        <span  >
                            <button type="button" className="btn btn-primary" onClick={this.leftKeyHandler}>{'<'}</button>
                        </span>
                        <div className="p-5">{monthName}</div>
                        <span  >
                            <button type="button" className="btn btn-primary" onClick={this.rightKeyHandler}>{'>'}</button>
                        </span>
                    </div>
                </div>
                <div className="">
                    <div className="week-days-header">
                        {
                            WeekDays.map((dayObject) => {
                                return (
                                    <div key={dayObject.key} className="week-day">
                                        <b>{dayObject.name}</b>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {Boolean(weeks.length) &&
                        weeks.map((week, index) => {
                            return (
                                <div className="week" key={`${monthName}-${index}`}>
                                    <Week week={week} year={currentYear} month={currentMonth} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default MainComponent;