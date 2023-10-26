import $ from 'jquery';
import Header from './modules/header';
import { collection, getDocs} from "firebase/firestore";
import firebase from './modules/firebase';


class Auction {
    constructor() {
        this.header = new Header();
        this.db = firebase.getFirestore();
        this.firebase();
        this.hiddenBtn();
        this.urlParams = new URLSearchParams(window.location.search);
        this.id = this.urlParams.get("id");
        if(this.id === null){
            this.id = 'arts-3'
        }
    }
    async firebase() {
        const querySnapshot = await getDocs(collection(this.db, "arts"));
        querySnapshot.forEach((doc) => {
            if(doc.id === this.id){
                this.inputInfo(doc.data());
                this.timer(doc.data().liveData);
                this.liveData(doc.data().liveData);
            }
        });
    }
    timer(data){
        const countdownDate = new Date(data).getTime();
        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $('#days').html(days + 'd') ;
            $('#hours').html(hours + 'h');
            $('#minutes').html(minutes + 'm');
            $('#seconds').html(seconds + 's');

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById('timer').innerHTML = 'Время истекло!';
            }
        }, 1000);
    }
    liveData(data){
        const downData = new Date(data);
        const month = downData.toLocaleString('en-US', {month: 'short'});
        let minutes = ''
        let hours = ''
        if(downData.getMinutes() < 10){
            minutes = '0' + downData.getHours();
        }
        if(downData.getHours() < 10){
            hours = '0' + downData.getMinutes();
        }
        $('#live-mounth').html(month);
        $('#live-day').html(downData.getDate());
        $('#live-hours').html(minutes);
        $('#live-minutes').html(hours);
    }
    inputInfo(data){
        console.log(data)
        $('.auction__name-title').html(data.title);
        $('.auction__size').html(data.details[1]);
        $('.auction__start-price').html(data.startPrice);
        $('.auction__inform-column_next-inform').html(data.details[2]);
        $('.auction__price').html(data.price);
        $('#input-place').attr('placeholder', '$' + data.price );
        $('.auction__text-block-paragraph_one').html(data.text[0]);
        $('.auction__text-block-paragraph_two').html(data.text[1]);
        $(".auction__img source").attr("srcset", data.imageWebP);
        $(".auction__img img").attr("src", data.imagePng);
    }
    hiddenBtn(){
        $('.auction__text-block-btn').on("click", function() {
            $('.auction__text-block').toggleClass('auction__text-block_hidden')
        });
        const height = $('.auction__text-block-paragraphs').height()
        var newKeyframesRule = `
        @keyframes animationOne {
            0% {
                height: ${height}px;
            }
            10% {
                height: ${height + 12}px;
            }
            90% {
                height: 40px;
            }
            100% {
                height: 50px;
            }
        }
        @keyframes animationTwo {
            0% {
                height: 50px;
            }
            20% {
                height: 38px;
            }
            90% {
                height: ${height + 10}px;
            }
            100% {
                height: ${height}px;
            }
        }
        `;
        const styleSheet = $('<style>').text(newKeyframesRule);
        $('head').append(styleSheet);
    }
};
const auction = new Auction();



