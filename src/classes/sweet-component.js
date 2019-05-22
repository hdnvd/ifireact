import * as React from 'react';
import SweetHttpRequest from "./sweet-http-request";
class SweetComponent extends React.Component {
    HttpGetParamsFromArray(filtered)
    {
        let Request=new SweetHttpRequest();
        Request.appendVariables(filtered,"id","value");
        return Request.getParamsString();
    }
}
export default SweetComponent;