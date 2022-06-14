import React, {useState, useEffect} from "react";
import Die from "./Die/Die";
import "./App.css";

export default function App() {
    const [dice, setDice] = useState(allDice);
    const [tenzies, setTenzies] = useState(false);
    const [rounds, setRounds] = useState(0);
    const [time, setTime] = useState(0);
    const [record, setRecord] = useState(1000);
    const [storageRecord, setStorageRecord] = useState({});
    
    useEffect(() => {        
        const allHeld = dice.every(die => die.isHeld);
        const userSelectedValue = dice[0].value;
        const matchAll = dice.every(die => die.value === userSelectedValue);

        if(allHeld && matchAll) {
            setTenzies(true);
        }

        // save record if lowest time to complete
        // reset game parameters
        if(tenzies) {            
            if(time < record) {
                setRecord(time);
                setStorageRecord(localStorage.setItem("TenziesRecord", JSON.stringify({recordTime: time, recordRounds: rounds})));             
            }
            setTenzies(false);
            setDice(allDice);
            setRounds(0);
            setTime(0);   

        }
    }, [dice]);

    // generate dice
    function createDie() {
        return {
            id: Math.random(),
            value: Math.ceil((Math.random() * 6)),
            isHeld: false
        }
    }

    function allDice() {
        const diceArray = [];
        for(let i = 0; i < 10; i++){
            diceArray.push(createDie());
        }
        return diceArray;
    }

    // select(ed) dice
    function selectDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die;
        }));
    }

    // count rounds
    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die : createDie();
        }));
        setRounds(rounds + 1);      
    }

    function timer() {
        setTimeout(() => {
            setTime(time + 1);
        }, 1000);
    }

    if(rounds > 0 && !tenzies){
        timer();
    }
    
    const gameDice = dice.map(die => {
        return <Die 
                    key={die.id} 
                    value={die.value} 
                    isHeld={die.isHeld} 
                    isClicked={() => selectDice(die.id)} 
                />
    });

    return(
        <main className="b-app">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="e-container">
                
                {tenzies && <h2 className="e-heading">WINNER WINNER CHICKEN DINNER!</h2>}
                <section className="e-dice-container">
                    {gameDice}
                </section>
                <button className="e-button" onClick={rollDice}>
                    {
                        tenzies ? "New Game" : "Roll Dice"
                    }
                </button>
                
                <div className="e-stats-counter">
                    <span>Time: {time}s</span>
                    <span className="e-round-counter">Rounds played: {rounds}</span>                    
                </div>
                {
                    tenzies &&
                    <div className="e-stats">                        
                        <div className="e-player">
                            <h3 className="e-section-title">How did you do?</h3>
                            Time needed: {time}s
                            <br />
                            Rounds needed: {rounds}
                        </div>
                        <div className="e-record">
                            {
                                storageRecord.recordTime && <>
                                     <h3 className="e-section-title">Current record</h3>
                                    Time needed: {storageRecord.recordTime}s   
                                    <br />
                                    Rounds needed: {storageRecord.recordRounds}  
                                </>
                            }
                                                   
                        </div>                        
                    </div>   
                }                                                   
            </div>
        </main>
    );
}