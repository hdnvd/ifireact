// @flow

import * as React from "react";
import ReactTable from 'react-table'
import {Grid,Row,Col,Button} from 'react-bootstrap'
import 'react-table/react-table.css'


class Translator {
    static getCaption(Name) {
        let translation="";
        if(Name==="RADIF")
            translation= 'ردیف';
        else if(Name==="HESAB")
            translation= 'حساب';
        else if(Name==="MARKAZ_HAZ")
            translation= 'مرکز هزینه';
        else if(Name==="BARAVORD")
            translation= 'براورد';
        else if(Name==="ASHKHAS")
            translation= 'اشخاص';
        else if(Name==="SHARH")
            translation= 'شرح';
        else if(Name==="CODE")
            translation= 'کد';
        else if(Name==="NAME")
            translation= 'نام';
        else if(Name==="CODEMELI")
            translation= 'کد ملی';
        else if(Name==="MELIAT")
            translation= 'ملیت';
        else if(Name==="HOZE")
            translation= 'حوزه';
        else if(Name==="TELNO")
            translation= 'شماره تلفن';
        else if(Name==="SEMAT")
            translation= 'سمت';
        else if(Name==="SHOBE")
            translation= 'شعبه';
        else if(Name==="SEX")
            translation= 'جنسیت';
        else if(Name==="BEDEHI")
            translation= 'بدهی';
        else if(Name==="SANAD")
            translation= 'سند';
        else if(Name==="BED")
            translation= 'بدهکار';
        else if(Name==="BES")
            translation= 'بستانکار';
        else if(Name==="GROUP")
            translation= 'گروه';
        else if(Name==="MAH")
            translation= 'ماه';
        else if(Name==="MOJRI")
            translation= 'مجری';
        else if(Name==="TYPPAR")
            translation= 'نوع پرداخت';
        else if(Name==="TYPEPAR")
            translation= 'نوع پرداخت';
        else if(Name==="BARID")
            translation= 'کد برآورد';
        else if(Name==="TART")
            translation= 'تاریخ شروع';
        else if(Name==="TARE")
            translation= 'تاریخ پایان';
        else if(Name==="SAKHT")
            translation= 'نوع ساخت';
        else if(Name==="BAKH")
            translation= 'بخش';
        else if(Name==="TBAR")
            translation= 'تعداد برنامه';
        else if(Name==="MBAR")
            translation= 'دقایق هر برنامه';
        else if(Name==="ZKOL")
            translation= 'دقایق کل';
        else if(Name==="MBAR")
            translation= 'دقایق هر برنامه';
        else if(Name==="FLAGHG")
            translation= 'بدون مشکل حقوقی';
        else if(Name==="HBANK")
            translation= 'شماره حساب بانکی';
        else if(Name==="CODEH")
            translation= 'کد حسابداری';
        else if(Name==="VAHED")
            translation= 'واحد';
        else if(Name==="NAMEM")
            translation= 'نام مرکز';
        // else return Name+" "+translation;
        return Name;
    }
}

export default Translator;
