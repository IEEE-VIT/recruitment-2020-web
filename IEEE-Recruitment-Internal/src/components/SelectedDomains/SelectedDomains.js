import React from 'react';

import './SelectedDomains.css';

class SelectedDomains extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            domains:["ML", "WebDev", "AppDev", "Something"],
        }
    }

    render() {

        const {domains} = this.props;
        console.log(this.props);
        return(
            <div className="motherDome">
                <div className='selecteddomains'>
                    <button className='dome s1' onClick={()=>this.props.addDomains(`${domains[0]}`)}>{domains[0]}</button>
                    <button className='dome s2' onClick={()=>this.props.addDomains(`${domains[1]}`)}>{domains[1]}</button>
                    {
                    domains[2]
                    ?
                    <button className='dome s3' onClick={()=>this.props.addDomains(`${domains[2]}`)}>{domains[2]}</button>
                    :
                    <div></div>
                    }
                    {
                        domains[3]
                        ?<button className='dome s4' onClick={()=>this.props.addDomains(`${domains[3]}`)}>{domains[3]}</button>
                        :
                        <div></div>
                    }
                    <br />
                </div>
                <button className='resetdomains' onClick={()=>{this.props.resetDomains()}}>RESET</button>
            </div>
        )
    }
}

export default SelectedDomains;