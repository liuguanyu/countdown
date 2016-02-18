class CounterNode {
    constructor (opts = {}){
        this.base = opts.base ? opts.base : (new Date()); // 当前时间
        this.basenow = (new Date()); // 取base时对应的客户端时间
        this.statusList = [];

        this.begin = opts.begin ? opts.begin : this.basenow;
        this.end = opts.end ? opts.end : new Date(Math.floor((this.begin + 6e4)/ 1e3) * 1e3);

        // 以下精确到秒
        this.begin = new Date(Math.floor(this.begin / 1e3) * 1e3);
        this.end = new Date(Math.floor(this.end / 1e3) * 1e3);

        this.first = opts.first ? opts.first : (function(){});    //刚刚触发倒计时
        this.every = opts.every ? opts.every : (function(){});    //倒计时中
        this.finish = opts.finish ? opts.finish : (function(){}); //完成倒计时
    };

    check (now){
        now = new Date(+now - (+this.basenow) + (+this.base)); //换算为服务器时间

        if (!this.firstTriggered && now >= this.begin && now < this.end){
            this.first();
            this.firstTriggered = true;
        }

        if (now >= this.begin && now < this.end){
            this.every({
                delta1 : now - this.begin, // 开始了多久
                delta2 : this.end - now + 1e3  // 距离结束还有多久
            });

            return "downcounting";
        }

        if (now >= this.end){
            this.finish({
                delta1 : now - this.end + 1e3 // 结束了多久
            });

            return "finish";
        }

        return "before";
    };
}

let counterNodes = [];

let doCounterCallback = function (){
    let now = new Date();

    counterNodes = counterNodes.filter(function (el){
        return (el.check(now) !== 'finish');
    });
};

module.exports = {
    addCounterNode : function (cfg){
        var cn = new CounterNode(cfg);
        counterNodes.push(cn);

        return cn; // 返回一个定时器的实例
    },

    run : function (){
        doCounterCallback();

        setInterval(function (){
            doCounterCallback();
        }, 500);
    }
}