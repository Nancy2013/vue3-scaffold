import { defineComponent, reactive, watch, toRefs } from "vue";
import styles from "./index.module.less";


export default defineComponent({
    props: {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        }
    },

    setup(props) {
        
        const { name, color, width, height } = toRefs(props);

        let state = reactive({ 
            iconName: `#icon-${name.value}`,
            svgClass: name.value ? `svg-icon icon-${name.value}` : 'svg-icon'
         });

        watch(name, (next:any, prev:any)=>{
            Object.assign(state, {
                iconName: `#icon-${next}`,
                svgClass: name.value ? `svg-icon icon-${next}` : 'svg-icon'
            })
        })

        return () => (
            // @ts-ignore #
            <svg class={[styles['svg-icon'], state.svgClass.replace('svg-icon', '')]} style={{ color: color.value, height: height.value, width: width.value }}>
                
                <use xlinkHref={state.iconName} />
            </svg>
            // @ts-ignore #
        )
    }
})