// @flow

import * as React from "react";
import {MDBBtn} from 'mdbreact';
import ReactLoading from 'react-loading';
class SweetButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            message:this.props.value,
        };
        };

        render()
        {
            return <MDBBtn
                {...this.props}
                onClick={() => {
                    this.setState({message:<ReactLoading type={"bubbles"} color={"#ffffff"} height={30} width={30} />});
                    this.props.onButtonPress(()=>{this.setState({message:this.props.value});});
                }}
            >{this.state.message}</MDBBtn>;
        }


}
export default SweetButton;
