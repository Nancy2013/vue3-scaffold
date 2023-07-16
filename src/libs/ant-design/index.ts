import {Button,Modal} from 'ant-design-vue';
const components = [
    Button,
    Modal,
];
export default (app:any)=>{
    components.forEach(component => {
        app.component(component.name, component);
    })
}