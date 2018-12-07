// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
class itsap_servicetypegroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	title:'',
	servicetypegroup_fid:'',
	servicetypegroup_fidOptions:[],
        };
        fetch('http://ifi.test/api/itsap/servicetypegroups/'+this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
                 this.setState({ title:data.title,servicetypegroup_fid:data.servicetypegroup_fid,});
fetch('http://ifi.test/api/itsap/servicetypegroups')
            .then(response => response.json())
            .then(data => {
                let Options=data.map(item=><option value={item.id}>{item.title}</option>);
                this.setState({servicetypegroup_fidOptions:Options})
            });
            });
    }
    render(){
        return <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <form>
                        <p className='h5 text-center mb-4'>itsap_servicetypegroupManage</p>
                        
                        <div className='grey-text'>
                            <MDBInput
                                label='عنوان'
                                group
                                type='text'
                                validate
                                value={this.state.title}
                                onChange={(event)=>{this.setState({title:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.servicetypegroup_fid} onChange={(event)=>{this.setState({servicetypegroup_fid:event.target.value})}}>
                                <option>servicetypegroup_fid</option>
                                {this.state.servicetypegroup_fidOptions}
                            </select>
                            </div>    
                        <div className='text-center'>
                            <MDBBtn onClick={() => {this.props.history.push('/itsap/servicetypegroups');}}>یازگشت به صفحه اصلی</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default itsap_servicetypegroupManage;
