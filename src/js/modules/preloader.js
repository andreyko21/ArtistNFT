import $ from 'jquery';

export default class Preloader{
    constructor(container){
        this.container = container;
        this.stopPreload(this.container);
    }
    stopPreload(container){
        setTimeout(function(){
            $(document).ready(function() {
                $(`.${container}`).addClass(`${container}_preloader-off`);
            });
        }, 300);
    }
}
