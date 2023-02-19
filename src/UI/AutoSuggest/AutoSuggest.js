import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./autoSuggest.scss"

class AutoSuggest extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []

    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: ""
        };
    }

    // Event fired when the input value is changed
    onChange = (e) => {
        if(this.props.onChange){
            this.props.onChange(e.currentTarget.value)
        }
       const { suggestions } = this.props;
       const userInput = e.currentTarget.value;

      //  Filter our suggestions that don't contain the user's input
       const filteredSuggestions = suggestions.filter(suggestion=>{
        return suggestion[this.props.fieldName].toLowerCase().indexOf(userInput.toLowerCase()) > -1
       }



       );

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        },()=>{
            this.props.chosenValue(this.state.userInput)
        });

    };

    // Event fired when the user clicks on a suggestion
    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e
        }, ()=>{
            this.props.chosenValue(this.state.userInput)
        });

    };

    // Event fired when the user presses a key down
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyUp,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li
                                    className={className}
                                    key={suggestion.id}
                                    onClick={()=>onClick(suggestion)}
                                >{suggestion[this.props.fieldName]}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        {this.props.loading? "Loading..":<em>No suggestions, Type more or Try with different keyword!</em>}
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <div className="auto-suggest">
                <input
                    type="text"
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    value={userInput[this.props.fieldName]}
                    className={this.props.hasError ? "form-control is-invalid":"form-control"}
                    placeholder={this.props.placeHolder}
                />
                {suggestionsListComponent}
                </div>
            </Fragment>
        );
    }
}

export default AutoSuggest;