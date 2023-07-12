import {Button,message,Alert,Modal} from 'ant-design-vue';

export default (app:any)=>{
    app.use(Button);
    app.use(message);
    app.use(Alert);
    app.use(Modal);
}