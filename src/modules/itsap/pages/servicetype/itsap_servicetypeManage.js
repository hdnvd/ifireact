// @flow
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,FormInline, Input } from 'mdbreact';
class itsap_servicetypeManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
	title:'',
	priority:'',
	servicetypegroup_fid:'',
	servicetypegroup_fidOptions:[],
	is_needdevice:'',
        };
        fetch('http://ifi.test/api/itsap/servicetypes/'+this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
                 this.setState({ title:data.title,priority:data.priority,servicetypegroup_fid:data.servicetypegroup_fid,is_needdevice:data.is_needdevice,});
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
                        <p className='h5 text-center mb-4'>itsap_servicetypeManage</p>
                        
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
                            <MDBInput
                                label='priority'
                                group
                                type='text'
                                validate
                                value={this.state.priority}
                                onChange={(event)=>{this.setState({priority:event.target.value})}}
                            />
                        </div>
                    <div className='grey-text'>
                        <select className='browser-default custom-select' value={this.state.servicetypegroup_fid} onChange={(event)=>{this.setState({servicetypegroup_fid:event.target.value})}}>
                                <option>servicetypegroup_fid</option>
                                {this.state.servicetypegroup_fidOptions}
                            </select>
                            </div>
                        <div className='grey-text'>
                            <FormInline>
                                    <Input
                                        onClick={() => this.setState({is_needdevice : 0})}
                                        checked={this.state.is_needdevice === 0}
                                        label='is_needdevice دارد'
                                        type='radio'
                                        id='radiois_needdevice1'
                                    />
                                    <Input
                                        onClick={() => this.setState({is_needdevice : 1})}
                                        checked={this.state.is_needdevice === 1}
                                        label='is_needdevice ندارد'
                                        type='radio'
                                        id='radiois_needdevice2'
                                    />
                                </FormInline>
                        </div>    
                        <div className='text-center'>
                            <MDBBtn onClick={() => {
                                const data = new FormData();
                                
	data.append('title', this.state.title);
	data.append('priority', this.state.priority);
	data.append('servicetypegroup_fid', this.state.servicetypegroup_fid);
	data.append('is_needdevice', this.state.is_needdevice);
	data.append('_method', 'PUT');
                                fetch('http://ifi.test/api/itsap/servicetypes/'+this.props.match.params.id, {
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
                                            return this.props.history.push('/itsap/servicetypes');   

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

export default itsap_servicetypeManage;
