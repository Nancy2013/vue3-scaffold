import { defineComponent, reactive,ref, toRefs, onMounted,watch } from "vue";
import { Swiper, SwiperSlide,useSwiper } from 'swiper/vue';
import { Autoplay,Navigation } from 'swiper/modules'
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
export default defineComponent({
  props: {
    actived:{
      type:Number,
      default:0,
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props,{emit}) {
    const mySwiper=ref();
    const state = reactive({
        slides:[
            {
                index:0,
                name:'Slide0',
            },
            {
                index:1,
                name:'Slide1'
            },
            {
                index:2,
                name:'Slide2',
            },
            {
                index:3,
                name:'Slide3',
            },
            {
                index:4,
                name:'Slide4',
            },
            {
                index:5,
                name:'Slide5',
            },
        ],
        modules: [Autoplay,Navigation],
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    });
    onMounted(()=>{
        console.log('----onMounted----',mySwiper);
        
    });
    const onSwiper = (swiper:any) => {
        console.log(swiper);
        mySwiper.value=swiper
      };
      const onSlideChange = () => {
        console.log('slide change');
      }; 
    const slideChangeTransitionEnd=(swiper:any)=>{
        console.log('-----slideChangeTransitionEnd---',swiper);
        
    }
    const clickSwiper=(swiper:any)=>{
        const {clickedIndex}=swiper
        console.log('-----clickSwiper--clickedIndex-',clickedIndex);
    }
    const clickSlide=(item:any)=>{
        console.log('---clickSlide---',item);
    }
    
    const slideTo=(index:any)=>{
        mySwiper.value.slideTo(index);
    }
    
    watch(()=>props.actived,(newVal:any,oldVal:any)=>{
      const pos=state.slides.findIndex((item:any)=>item.index===newVal);
      console.log('----watch----',pos);
      
      if(pos>-1){
        mySwiper.value.slideTo(pos);
      }
    });

    return {
      ...toRefs(state),
      onSwiper,
      onSlideChange,
      slideChangeTransitionEnd,
      clickSwiper,
      clickSlide,
      slideTo,
    };
  },
});
