// @flow
import 'react-table/react-table.css'
import Constants from "./Constants";
import Cookies from "universal-cookie";


class IfiFetcher {
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
                AfterFetchFunction(data);
            });
    }
}

export default IfiFetcher;
