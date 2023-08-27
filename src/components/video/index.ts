import { defineComponent, reactive, toRefs,ref, onMounted, watch,shallowRef } from "vue";
export default defineComponent({
  props: {
    videoSrc:{
      type:String,
      default:'',
    },
  },
  components: {},
  setup(props:any, { emit }) {
    let myVideoPlayer =  shallowRef(null) as any;
    const state = reactive({
      playerOptions: {
        live: true,
        playbackRates: [0.5, 1.0, 1.25, 1.5, 2.0], // 播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        controls: true, //控制条
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        language: "zh-CN",
        // aspectRatio: "16:16", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          currentTimeDisplay: true, // 当前时间
          volumeControl: false, // 声音控制键
          playToggle: true, // 暂停和播放键
          progressControl: true, // 进度条
          fullscreenToggle: false, //全屏按钮
        },
        // sources: [{ type: 'application/x-mpegURL', src: props.videoSrc }], https://vjs.zencdn.net/v/oceans.mp4
        sources: [{  type: "video/mp4", src: props.videoSrc }],
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
    });

    watch(()=>props.videoSrc,(newVal,oldVal)=>{
      console.log('-----watch------',newVal);
      myVideoPlayer.value.pause()
      myVideoPlayer.value.reset();
      myVideoPlayer.value.src(newVal);
      myVideoPlayer.value.load()
      myVideoPlayer.value.play()
    });

    onMounted(() => {});
    
    /**
     * video组件加载
     * @param param0 video实例
     */
    const mountedVideo=({ player} : any)=>{
      myVideoPlayer.value=player;
    }

    return {
      ...toRefs(state),
      mountedVideo,
    };
  },
});