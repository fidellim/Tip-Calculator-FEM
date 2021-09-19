import {React, useState, useEffect} from 'react'
import Button from './Button'

const Calculator = () => { 
    const tips = [{value:5, isToggled:false}, {value:10, isToggled:false}, {value:15, isToggled:false}, {value:25, isToggled:false}, {value:50, isToggled:false}];
    const [bill, setBill] = useState('');
    const [people, setPeople] = useState('');
    const [custom, setCustom] = useState(''); 
    const [myTip, setMyTip] = useState(''); //either fixTip or custom
    const [tipPerPerson, setTipPerPerson] = useState('0.00');
    const [totalPerPerson, setTotalPerPerson] = useState('0.00');
    const [reset, setReset] = useState("noReset");
    const [fixTips, setFixTips] = useState(tips);

    const handleReset = () => {
        setBill('');
        setPeople('');
        setCustom('');
        setMyTip('');
        setTipPerPerson("0.00");
        setTotalPerPerson('0.00');
        setReset("noReset");

        unPressFixTips();
    }

    const unPressFixTips = () => {
        setFixTips(
            fixTips.map((fixTip) => {
                // check if user resets the tip calculator
                // unclick the button pressed
                fixTip.isToggled = false;
                return fixTip;
            })
        );
    }

    const handleBill = (e) => {
        setBill(e.target.value);
    }

    const handlePeople = (e) => {
        setPeople(e.target.value);
    }

    const handleCustom = (e) => {
        setCustom(e.target.value);
        setMyTip(e.target.value);
    }

    // selecting of buttons
    const handleFixTips = (value, index) => {
        
        setFixTips(
            fixTips.map((fixTip, i) => {
                // check if user resets the tip calculator
                if (!myTip){
                    fixTip.isToggled = false;
                }
                if (i === index) {
                    fixTip.isToggled = !fixTip.isToggled;
                    if (!fixTip.isToggled){
                        setMyTip('');
                    } else{
                        setMyTip(value);
                    }
                } else {
                    fixTip.isToggled = false;
                }
                return fixTip;
            })
        );
    };

    

    //  !custom || custom < 1
    useEffect(() => {
        const tipCalculation = () => {
            if (!bill || !people || bill < 1 || people < 1 || !myTip || myTip < 1){
                setTipPerPerson("0.00");
                setTotalPerPerson('0.00');
            } else {
                tipPerPersonFormula(bill, people, myTip);
                setReset("allowReset");
            }
        }

        const tipPerPersonFormula = (bill, people, tip) => {
            let _tip = (bill * (tip / 100))/people;
            let roundedTip = Math.round(_tip * 100) / 100;

            setTipPerPerson(roundedTip);
            totalPerPersonFormula(roundedTip, bill, people);
        }

        const totalPerPersonFormula = (tipPerPerson, bill, people) => {
            let total = (bill / people) + tipPerPerson;
            let roundedTotal = Math.round(total * 100) / 100;
            setTotalPerPerson(roundedTotal);
        }

        // check if all values are falsy (undefined, null)
        const areAllFalsy = () => {
            if (!bill && !people && !myTip){
                setReset("noReset");
            }
        }

        areAllFalsy();
        tipCalculation();
    }, [bill, people, myTip, custom])
    

    return (
        <div className="container">
            <div className="col">
                <form onSubmit={e => e.preventDefault()}>
                    <h1><label htmlFor="bill" className="title">Bill</label></h1>
                    <div className="billContainer">
                        <h2 className={bill < 1 && bill ? "errorBill" : "errorBill hide"}>
                            {parseInt(bill) === 0 ? "Can't be zero" : "Can't be negative"}
                        </h2>
                        <input type="number" id="bill" className={bill < 1 && bill ? "error" : null}placeholder="0" value={bill} onChange={handleBill}/>
                    </div>
                    <h1 className="title">Select Tip %</h1>
                    <div className="tips">
                        {fixTips.map((tip,index) => {
                            return (
                                <Button key={tip.value} type="tip" value={tip.value} isToggled={tip.isToggled} index={index} handle={handleFixTips}/>
                            )
                        })}

                        {/* update value everytime state changes */}
                        {/* unPress fix tips when custom tip is pressed */}
                        <input type="number" id="custom" className={custom < 1 && custom ? "error" : null}placeholder="Custom" value={custom} onChange={handleCustom} onClick={unPressFixTips}/>
                    </div>
                    <h1><label htmlFor="peopleCounter" className="title">Number of People</label></h1>
                    <div className="peopleCounterContainer">
                        <h2 className={people < 1 && people ? "errorPeople" : "errorPeople hide"}>
                            {parseInt(people) === 0 ? "Can't be zero" : "Can't be negative"}
                        </h2>
                        <input type="number" id="peopleCounter" className={people < 1 && people ? "error" : null} placeholder="0" value={people} onChange={handlePeople}/>
                    </div>
                </form>
            </div>
            <div className="col">
                <div className="tipResult">
                    <div className="tipAmount">
                        <h2>Tip Amount</h2>
                        <h2>/ person</h2>
                        <strong>${tipPerPerson}</strong>
                    </div>
                    <div className="tipPerson">
                        <h2>Total</h2>
                        <h2>/ person</h2>
                        <strong>${totalPerPerson}</strong>
                    </div>
                    <Button key='reset' type={reset} value="reset" handle={handleReset}/>
                </div>
            </div>
        </div>
    )
}

export default Calculator
