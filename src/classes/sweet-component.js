import * as React from 'react';
class SweetComponent extends React.Component {

    HttpGetParamsFromArray(filtered)
    {
        let filterString='';
        for(let i=0;filtered!=null && i<filtered.length;i++)
        {
            if(filterString!='')
                filterString=filterString+"&";
            filterString+=filtered[i].id+'='+filtered[i].value;
        }
        console.log(filterString);
        return filterString;
    }
}
export default SweetComponent;