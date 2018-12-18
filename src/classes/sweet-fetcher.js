// @flow
import 'react-table/react-table.css'
import Constants from "./Constants";
import Cookies from "universal-cookie";


class SweetFetcher {
    cookies = new Cookies();
    SiteURL=Constants.SiteURL;
    Fetch(URL,Method,PostData,AfterFetchFunction,history){
        Method=Method.toString().trim().toLowerCase();
        let FetchInfo={
            method: Method,
            headers: {
                Accept: 'application/json',
                Authorization: this.cookies.get('sessionkey'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
            crossDomain:true,
        };

        if(PostData!=null)
        {

            if(Method==="put")
            {
                PostData.append('_method', 'PUT');
                FetchInfo.method="post";
            }
            FetchInfo.body=PostData;

        }
        console.log(FetchInfo.body);
        fetch(this.SiteURL+URL,FetchInfo)
            .then(response => {
                if (!response.ok) {

                    let status=response.status;
                    if(status.toString().trim()==="403")
                        history.push('/login')

                }
                return response.json()})
            .then(data => {
                // console.log(data);
                if(Array.isArray(data.Data))
                {
                    for(let i=0;i<data.Data.length;i++)
                    {
                        data.Data[i]=this.getPropertiesToLower(data.Data[i]);
                    }
                }
                else if(data.Data!=null)
                {
                    data.Data=this.getPropertiesToLower(data.Data);
                }
                // console.log(data);
                AfterFetchFunction(data);
            });
    }
    getPropertiesToLower(obj)
    {
        let key, keys = Object.keys(obj);
        let n = keys.length;
        let newobj={}
        while (n--) {
            key = keys[n];
            newobj[key.toLowerCase()] = obj[key];
        }
        return newobj;
    }
}

export default SweetFetcher;
