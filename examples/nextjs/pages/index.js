import React, { Component } from 'react';
import withConfig from '../common/providers/withConfig';

import bulletTrain from 'bullet-train-client/isomorphic';
const environmentID = "uCDQzKWgejrutqSYYsKWen";
//Define default flags
class HomePage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            logs: []
        };
    }

    logout = () => {
        bulletTrain.logout();
    };

    login = () => {
        bulletTrain.identify("bullet_train_sample_user");
    };

    submitTrait = () => {
        bulletTrain.setTrait('example_trait', "Some value " + Math.floor(Math.random() * 10) + "");
    }

    increment = (value) => {
        bulletTrain.incrementTrait("button_clicks", value)
    };

    render() {
        const fontSize = parseInt(bulletTrain.getValue("font_size"));
        const trait = bulletTrain.getTrait("example_trait") + "";
        const buttonClicks = bulletTrain.getTrait("button_clicks");
        const { submitTrait } = this;
        const { isLoading, logs } = this.state;
        return (
            <div>
                <h2>{environmentID}</h2>
                <p style={{ fontSize }}>
                    {JSON.stringify(bulletTrain.flags)}
                </p>
                {bulletTrain.identity ? (
                    <div>
                        <div>
                            <div>
                                <div>
                                    Button Clicks: {buttonClicks ? buttonClicks : "0"}
                                </div>
                                <button onClick={() => this.increment(-1)}>
                                    Decrement trait
                                </button>
                                <button onClick={() => this.increment(1)}>
                                    Increment trait
                                </button>
                            </div>
                            <button onClick={submitTrait}>
                                Toggle user trait
                            </button>
                            <div>
                                example_trait: {trait}
                            </div>
                        </div>
                        <button onClick={this.logout}>
                            logout
                        </button>
                    </div>
                ) : <button onClick={this.login}>
                    Login as sample user
                </button>}
                <h3>
                    Events
                </h3>
                {logs.map(({ timestamp, data,  params, oldData }, i) => (
                    <div style={{padding:10, backgroundColor:i%2?"#eaeaea": "white", position:'relative'}} key={i}>
                        <div style={{position:'absolute', top:10, right:10}}>
                            {timestamp}
                        </div>
                        <div>
                            <div>
                                <strong>
                                    Traits
                                </strong>
                            </div>
                            {data}
                        </div>
                        <div>
                            <div>
                                <strong>
                                    Params
                                </strong>
                            </div>
                            {params}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default withConfig(HomePage);
