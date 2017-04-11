import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

import RegisterInsuranceCompanyForm from '../components/RegisterInsuranceCompanyForm.jsx';

class RegisterInsuranceCompany extends Component {
    createInsuranceCompany(event){
        event.preventDefault();

        const
            email = $('#email').val(),
            password = $('#password').val().trim(),
            confirm_password = $('#confirm-password').val().trim()
            companyName = $("#name").val(),
            phone = $("#phone").val()
            ;

        if (confirm_password !== password) {
            alert("Passwords do not match, please try again");

            $('#password').val("");
            $('#confirm-password').val("");
        } else {
            Accounts.createUser(
                {
                    email: email,
                    password: password,
                    profile : {
                        companyName: companyName,
                        phone: phone,
                        type: "insurance-company"
                    }
                },

                (error) => {
                    if (error) {
                        console.error("there was an error: ", error);
                    } else {
                        console.log('Insurance Company Registered Succesfully');
                    };
                }
            );
        }
    }
 
    render() {
        return (
            <div className="row">
                    <h1 className="form_title">Register an Insurance Company</h1>
                    <RegisterInsuranceCompanyForm submitBtnLabel="Register" submitAction={this.createInsuranceCompany}/>
            </div>
        );
    }
}

export default RegisterInsuranceCompany = createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, RegisterInsuranceCompany);