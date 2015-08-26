let CountDown = require("countdown.jsx");

// 预约态
CountDown.addCounterNode({
    end : new Date($("#res_end_time").val() * 1e3), // 结束时间
    base : base, // 基准时间，用于调整为服务器时间，一般是服务器的时间戳
    first : function (){
        // 刚刚到这个状态时候运行一次
    },
    every : function (data){
        // 每一秒调用一次
    },
    finish : function (data){
        // 时间到调用一次
    }
});

CountDown.run();