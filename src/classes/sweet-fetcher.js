// @flow
import 'react-table/react-table.css'
import Constants from "./Constants";
import Cookies from "universal-cookie";
import Common from "./Common";
import SweetAlert from "./SweetAlert";


class SweetFetcher {
    cookies = new Cookies();

    SiteURL=Constants.SiteURL;
    Fetch(URL,Method,PostData,AfterFetchFunction,ServiceName,ActionName,history){
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

            // if(Method==="put")
            // {
            //     // PostData.append('_method', 'put');
            //     // FetchInfo.method="post";
            // }
            // console.log(URL);
            // console.log(Method);
            FetchInfo.body=PostData;

        }
        // console.log(FetchInfo.body);
        fetch(this.SiteURL+URL,FetchInfo)
            .then(response => {
                console.log(response);
                // console.log(this.cookies.get('sessionkey'));

                if (!response.ok) {

                    let status=response.status;
                    if(status.toString().trim()==="403")
                        history.push('/login')

                    if(status.toString().trim()==="405")
                    {
                        SweetAlert.displayAccessDeniedAlert();
                    }

                }
                else
                {
                    // console.log(this.cookies.get('sessionkey'));
                    // console.log(response);
                    return response.json();
                }

            })
            .then(data => {

                if(data!=null)
                {
                    console.log(data);
                    if(Array.isArray(data.Data))
                    {
                        for(let i=0;i<data.Data.length;i++)
                        {
                            data.Data[i]=Common.convertObjectPropertiesToLowerCase(data.Data[i]);
                        }
                    }
                    else if(data.Data!=null)
                    {
                        data.Data=Common.convertObjectPropertiesToLowerCase(data.Data);
                    }
                    // console.log(data);
                    AfterFetchFunction(data);
                }

            });
    }
}

export default SweetFetcher;
