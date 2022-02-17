import 'bootstrap'
import './styles/styles.scss'
import videojs from 'video.js'
import tram from './medias/tram.mp4'

videojs(document.querySelector('#tramVideo'), {
    controls: true
}).ready(function(){
    let vPlayer = this
    vPlayer.src(tram)
})
