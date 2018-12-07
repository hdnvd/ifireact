// @flow

import * as React from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
function SweetTable(props){
        return <ReactTable
            getTableProps={() => ({ style: { display: 'block' } })}
            nextText={'صفحه بعد'}
            noDataText={'هیچ داده ای وجود ندارد'}
            pageText={'صفحه'}
            ofText={'از'}
            rowsText={'سطر'}
            pageJumpText={'برو به صفحه'}
            rowsSelectorText={'سطر در صفحه'}
            previousText={'ضفحه قبل'}
            {...props}
        />;

}
export default SweetTable;
