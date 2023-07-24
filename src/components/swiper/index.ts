import { defineComponent, reactive,ref, toRefs, onMounted } from "vue";
import { Swiper, SwiperSlide,useSwiper } from 'swiper/vue';
import { Autoplay,Navigation } from 'swiper/modules'
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
export default defineComponent({
  props: {},
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
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
    const snapGridLengthChange== () => {
        mySwiper.snapGrid = mySwiper.slice(0);
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
    const slideTo=()=>{
        mySwiper.value.slideTo(2);
    }
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
