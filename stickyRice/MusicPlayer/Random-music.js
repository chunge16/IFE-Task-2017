/**
 * Created by shi on 2017/5/3.
 */


window.onload = function () {

    function init() {

        const audios = document.getElementById('audios');

        let app = new Vue({
            el: '#fm',
            data: {
                loop: {
                    imgSrc: 'imgs/icon_order.png'
                },
                channelId: 0,
                song: {
                    seen: false,
                    picture: '',
                    url: '',
                    songName: '',
                    artist: ''
                },
                paused: {
                    animationPlayState: "running"
                },
                isPlaying: false
            },
            created: function () {
                this.getChannel();
                this.getMusic(this.channelId);
            },
            methods: {
                //播放和暂停
                play: function () {
                    if(audios.paused){
                        this.song.seen = false;
                        this.paused = {
                            animationPlayState: "running"
                        };
                        if(!this.isPlaying){
                            audios.play();
                            this.isPlaying = true;
                        }
                    }
                    else {
                        this.song.seen = true;
                        this.paused = {
                            animationPlayState: "paused"
                        }
                        if(this.isPlaying){
                            audios.pause();
                            this.isPlaying = false;
                        }

                    }
                },
                //随机下一首
                nextSong: function () {
                    if(this.song.seen){
                        this.song.seen = false;
                        this.getMusic(this.channelId);
                    }
                    else {
                        this.getMusic(this.channelId);
                    }
                },
                getChannel: function () {
                    axios.get('http://api.jirengu.com/fm/getChannels.php')
                        .then(function (response) {
                            console.log(response.data);
                            let channels = response.data.channels;
                            let num = Math.floor(Math.random()*channels.length);

                            this.channelId = channels[num].channel_id;
                            console.log(this.channelId);

                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                getMusic: function (channel) {
                    axios.get('http://api.jirengu.com/fm/getSong.php', {
                        params: {
                            "channel": channel
                        }
                    })
                        .then(function (response) {
                            console.log(response.data);
                            let song = response.data.song[0];
                            this.song = {
                                seen: false,
                                picture: song.picture,
                                url: song.url,
                                songName: song.title,
                                artist: song.artist
                            }
                            audios.src = song.url;
                            audios.play();
                            this.isPlaying = true;
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        })

                },
                //是否单曲循环
                songLoop: function () {
                    if(audios.loop){
                        this.loop = {
                            imgSrc: 'imgs/icon_order.png'
                        }
                        audios.loop = false;

                    }
                    else {
                        this.loop = {
                            imgSrc: 'imgs/icon_loop.png'
                        }
                        audios.loop = true;
                    }
                    console.log(audios.loop);
                },


            }
        });

        //播放结束下一首
        audios.addEventListener('ended',function () {
            if(!audios.loop){
                app.nextSong();
            }
        });





    }
    
    init();

    //vue v-bind 无法修改  audio  的属性


}
