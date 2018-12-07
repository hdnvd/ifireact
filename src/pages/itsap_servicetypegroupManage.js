// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
class itsap_servicetypegroupManage extends React.Component {
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
                            <MDBBtn onClick={() => {
                                const data = new FormData();
                                
	data.append('title', this.state.title);
	data.append('servicetypegroup_fid', this.state.servicetypegroup_fid);
	data.append('_method', 'PUT');
                                fetch('http://ifi.test/api/itsap/servicetypegroups/'+this.props.match.params.id, {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                    },
                                    mode: 'cors',
                                    crossDomain:true,
                                    body: data
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        if (res.hasOwnProperty('errors')) {
                                            alert('خطا','خطایی در ثبت اطلاعات بوجود آمد');
                                        }
                                        else {
                                            return this.props.history.push('/itsap/servicetypegroups');   

                                            //alert('پیام',res.message);
                                        }
                                        // console.log(res);
                                    }).catch(function (error) {
                                    alert('خطا','خطایی در ثبت اطلاعات بوجود آمد');
                                    throw error;
                                });
                            }
                            }>ذخیره</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default itsap_servicetypegroupManage;
