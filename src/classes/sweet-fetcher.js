// @flow
import 'react-table/react-table.css'
import Constants from "./Constants";
import Cookies from "universal-cookie";
import Common from "./Common";
import SweetAlert from "./SweetAlert";
import axios from 'axios';



class SweetFetcher {
    static METHOD_GET='get';
    static METHOD_POST='post';
    static METHOD_PUT='put';
    static METHOD_DELETE='delete';

    cookies = new Cookies();
    Fetch(URL,Method,PostingData,AfterFetchFunction,OnErrorFunction,ServiceName,ActionName,history){
        Method=Method.toString().trim().toLowerCase();
        let PostData=null;
        if(PostingData!=null)
        {
            if(Constants.ServerMode===Constants.SERVERMODE_LARAVEL)
            {
                if(Method==="put")
                {
                    PostingData.append('_method', 'put');
                    Method=SweetFetcher.METHOD_POST;
                }
                PostData=PostingData;
            }
            else if(Constants.ServerMode===Constants.SERVERMODE_ASP)
            {
                PostData=new URLSearchParams(PostingData);
            }
        }
        let Fetched=null;
        let Prefix='';
        if(Constants.ServerMode===Constants.SERVERMODE_LARAVEL)
            Prefix='Bearer ';

        let cookies = new Cookies();
        console.log(cookies.get('userdisplayname'));
        console.log(cookies.get('sessionkey'));
        let ax=axios.create({
            baseURL: Constants.SiteURL+"/api",
            headers: {
                Accept: 'application/json',
                Authorization: Prefix+this.cookies.get('sessionkey'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
            crossDomain:true,
        });
        if(Method===SweetFetcher.METHOD_GET)
        {
            Fetched=ax.get(URL);
        }
        else if(Method===SweetFetcher.METHOD_POST)
        {
            Fetched=ax.post(URL,PostData);
        }
        else if(Method===SweetFetcher.METHOD_PUT)
        {
            Fetched=ax.put(URL,PostData);
        }
        else if(Method===SweetFetcher.METHOD_DELETE)
        {
            Fetched=ax.delete(URL);
        }
        Fetched.then(response => {
                try {
                    console.log(response);
                }catch (e) {

                }

                    let data=response.data;
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
                        AfterFetchFunction(data);
                    }

            }).catch(function (error) {
                if(error.response!=null)
                {
                    if (error.response.status!==200 && error.response.status!==201  && error.response.status!==202 && error.response.status!==203) {

                        if(OnErrorFunction!=null)
                            OnErrorFunction(error);
                        let status=error.response.status;
                        console.log(error.response.status);
                        if(status.toString().trim()==="403")
                            history.push('/login');
                        if(status.toString().trim()==="401")
                            history.push('/login');
                        if(status.toString().trim()==="405")
                            SweetAlert.displayAccessDeniedAlert();
                        if(status.toString().trim()==="429")
                            SweetAlert.displaySimpleAlert("خطای محافظت امنیتی",'تعداد درخواست های شما بیش از حد مجاز است و به دلایل امنیتی دسترسی شما تا چند دقیقه بعد مسدود شد. لطفا چند دقیقه دیگر مراجعه نمایید');
                    }
                }

            console.log(error.response);
            console.log(error);
        });
    }
}

export default SweetFetcher;
