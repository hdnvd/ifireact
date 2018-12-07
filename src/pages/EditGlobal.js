// @flow

import * as React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
class EditGlobal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        fetch(''+this.props.match.params.id)
            // .then(response => response.json())
            .then(data => {
                // this.setState({ data:data })
            });
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form>
                        <p className="h5 text-center mb-4">EditGlobal</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Type your password"
                                group
                                type="text"
                                validate
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn>ذخیره</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default EditGlobal;
