import React, { Component } from 'react';
import axios from 'axios';

class FeedbackPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            email: '',
            notes: '',
            showButton: true, // Initially show the button
            access_token: '', // Initialize access_token in the state
        };
    }

    componentDidMount() {
        // Load client_id from local storage and set it in the state
        const access = JSON.parse(localStorage.getItem('access_token'));

        const client_id = JSON.parse(localStorage.getItem('client_id'));
        if (client_id) {
            this.setState({ client: client_id, access_token: access }); // Set access_token in the state
        }
    }

    togglePopup = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
            showButton: false, // Hide the button when opening the popup
        }));
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, notes, access_token } = this.state; // Get access_token from state

        // Prepare the data for the POST request
        const data = {
            email,
            notes,
        };

        try {
            // Make the POST API request with headers
            const response = await axios.post('/Feedback/add/', data, {
                headers: {
                    'Authorization': `Bearer ${access_token}`, // Use this.state.access_token
                    'Content-Type': 'application/json', // Set the content type to application/json
                },
            });

            if (response.data.message) {
                // Handle success, e.g., display a success message
                console.log('Feedback submitted successfully');
                // Close the popup after submission
                this.togglePopup();
            }
        } catch (error) {
            // Handle error, e.g., display an error message
            console.error('Error submitting feedback:', error);
        }
    };

    render() {
        const { isOpen, email, notes, showButton } = this.state;

        return (
            <div>
                {showButton && (
                    <button onClick={this.togglePopup} className="btn btn-primary position-fixed bottom-0 end-0 m-3">
                        Give Feedback
                    </button>
                )}
                {isOpen && (
                    <div className={`feedback-popup position-fixed end-0 bottom-0 p-3`}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Feedback Form</h5>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="notes" className="form-label">Notes</label>
                                        <textarea
                                            className="form-control"
                                            id="notes"
                                            name="notes"
                                            value={notes}
                                            onChange={this.handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button onClick={this.togglePopup} className="btn btn-secondary ms-2">Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default FeedbackPopup;
